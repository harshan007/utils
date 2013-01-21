/*
 * XML Tree
 * by Moonty July 2009 - moonty@gmail.com
 * A Chrome extension to display xml in a user-friendly format.
 *
 * Thanks to Arjan van Bentem for the idea - http://superuser.com/questions/972/displaying-xml-in-chrome-browser
 * XML tree by TarquinWJ - see http://www.howtocreate.co.uk/operaStuff/userJavaScript.html
 * Pretty XML tree by Jakub Roztocil - see http://blog.webkitchen.cz/pretty-xml-tree
 *  
 */

var excludedTypes = ['html','wml','wml:wml','svg'];
var parseerrorNode = 'parsererror';
var viewsourcePrefix = 'view-source:';
var isWrappedText = false;
var wrappedText = null;
var parsingError = null;
var xhtmlNS = 'http://www.w3.org/1999/xhtml';
var xslNS = 'http://www.w3.org/1999/XSL/Transform';
var linkUrls = true; // hyper-linking urls by default (hanagara)
var urlRegex = /(https?:\/\/|ftp:\/\/|file:\/\/\/|www\.)/i
var isCDATALastNodeRendered = false;	
var wbTextOverride = '';

var origDoc = null;
var nsResolver = null;
var nsDoc = document.implementation.createDocument(null, "namespaces", null);

if(!String.prototype.startsWith){
	String.prototype.startsWith = function (str) {
		return !this.indexOf(str);
	}
}

var tree = {

    create: function () {

        chrome.extension.sendMessage({ name: 'getPreferences' },
     		function (prefResponse) {
     		    if (parsingError != null) {
     		        if (prefResponse.showParserError == 'yes') {
     		            alert('XML Tree extension is reporting a parsing error:\n\n' + parsingError);
     		        }
     		    } else {

     		        //linkUrls = (prefResponse.linkUrls == 'yes');

     		        //chrome.extension.sendRequest({name: 'showPageAction'},function(response){});	

     		        //send a request in JSON format to background.html to retrieve text of the passed filePath
     		        chrome.extension.sendMessage({ name: 'getXSL', filePath: 'inline.xsl' },
						function (response) {
						    var xsl = response.fileText;

						    var processor = new XSLTProcessor();
						    processor.importStylesheet(tree.getDOMFromString(xsl));
						    processor.setParameter(null, 'utilsPath', chrome.extension.getURL('utils.js'));
						    processor.setParameter(null, 'optionsPath', chrome.extension.getURL('options.html'));
						    processor.setParameter(null, 'viewSourcePath', document.location.href);
						    processor.setParameter(null, 'eleColor', prefResponse.eleColor);
						    processor.setParameter(null, 'eleStyle', prefResponse.eleStyle);
						    processor.setParameter(null, 'attColor', prefResponse.attColor);
						    processor.setParameter(null, 'attStyle', prefResponse.attStyle);
						    processor.setParameter(null, 'attValColor', prefResponse.attValColor);
						    processor.setParameter(null, 'attValStyle', prefResponse.attValStyle);
						    processor.setParameter(null, 'textColor', prefResponse.textColor);
						    processor.setParameter(null, 'textStyle', prefResponse.textStyle);
						    processor.setParameter(null, 'cdataColor', prefResponse.cdataColor);
						    processor.setParameter(null, 'cdataStyle', prefResponse.cdataStyle);
						    processor.setParameter(null, 'cmtColor', prefResponse.cmtColor);
						    processor.setParameter(null, 'cmtStyle', prefResponse.cmtStyle);
						    processor.setParameter(null, 'piColor', prefResponse.piColor);
						    processor.setParameter(null, 'piStyle', prefResponse.piStyle);
						    processor.setParameter(null, 'nsColor', prefResponse.nsColor);
						    processor.setParameter(null, 'nsStyle', prefResponse.nsStyle);
						    processor.setParameter(null, 'symbolColor', prefResponse.symbolColor);
						    processor.setParameter(null, 'symbolStyle', prefResponse.symbolStyle);
						    processor.setParameter(null, 'collapseColor', prefResponse.collapseColor);
						    processor.setParameter(null, 'hoverColor', prefResponse.hoverColor);
						    processor.setParameter(null, 'backgroundColor', prefResponse.backgroundColor);
						    processor.setParameter(null, 'bannerTopColor', prefResponse.bannerTopColor);
						    processor.setParameter(null, 'bannerBottomColor', prefResponse.bannerBottomColor);
						    processor.setParameter(null, 'wbWidth', prefResponse.wbWidth);
						    processor.setParameter(null, 'wbTextColor', prefResponse.wbTextColor);
						    processor.setParameter(null, 'wbBackgroundColor', prefResponse.wbBackgroundColor);
						    processor.setParameter(null, 'actionLinkColor', prefResponse.actionLinkColor);
						    processor.setParameter(null, 'fontFamily', prefResponse.fontFamily);
						    processor.setParameter(null, 'fontSize', prefResponse.fontSize);
						    processor.setParameter(null, 'indentSize', prefResponse.indentSize);
						    processor.setParameter(null, 'lineWrap', prefResponse.lineWrap);
						    processor.setParameter(null, 'displayBanner', prefResponse.displayBanner);
						    processor.setParameter(null, 'toggleSpeed', prefResponse.toggleSpeed);
						    processor.setParameter(null, 'displayXml', prefResponse.displayXml);
						    processor.setParameter(null, 'xmlStandalone', document.xmlStandalone);
						    processor.setParameter(null, 'xmlEncoding', document.xmlEncoding);
						    processor.setParameter(null, 'xmlVersion', document.xmlVersion);
						    processor.setParameter(null, 'debugMode', prefResponse.debugMode);
						    processor.setParameter(null, 'wbTextOverride', wbTextOverride);

						    var outDoc;
						    if (isWrappedText) {
						        outDoc = processor.transformToDocument(tree.getDOMFromString(wrappedText)).documentElement;
						    } else {
						        outDoc = processor.transformToDocument(document).documentElement;
						    }

						    var divs = outDoc.getElementsByTagName('div');
						    for (var i = 0; divs.length; i++) {
						        if (divs[i].id == 'tree') {
						            //render HTML markup of XML and insert
						            tree.render((isWrappedText ? tree.getDOMFromString(wrappedText) : document), divs[i]);
						            break;
						        }
						    }

						    //setup for xpath evaluation
						    tree.setOrigDoc((isWrappedText ? tree.getDOMFromString(wrappedText) : document));
						    //only handles namespaces defined in root element
						    //nsResolver = origDoc.createNSResolver(origDoc);

						    //replace orignal document with render one
						    var newNode = document.importNode(outDoc, true);
						    document.replaceChild(newNode, document.documentElement);

						    //create content script listener
						    tree.setWonderBoxEvent();
						    tree.setTransformEvent();

						}
					);

     		    } //end if
     		}
		);

    },

    getDOMFromString: function (xmlString) {
        return new DOMParser().parseFromString(xmlString, 'text/xml');
    },

    getStringFromDOM: function (dom) {
        return new XMLSerializer().serializeToString(dom);
    },

    inarray: function (oNeedle, oHaystack) {
        for (var i = 0; i < oHaystack.length; i++) {
            if (oHaystack[i] == oNeedle) { return true; }
        }
        return false;
    },

    createNodeStructure: function (namespace, tag, attName, attValue, text) {
        var n = document.createElementNS(namespace, tag);
        if (attName != null && attValue != null) {
            n.setAttribute(attName, attValue);
        }
        if (text != null) {
            n.appendChild(document.createTextNode(text));
        }
        return n;
    },

    render: function (node, parent) {

        if (isCDATALastNodeRendered && node.nodeType != Node.CDATA_SECTION_NODE) {
            isCDATALastNodeRendered = false;
        }

        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                var e = tree.createNodeStructure(xhtmlNS, 'div', 'class', 'e', null);
                var nns = tree.createNodeStructure(xhtmlNS, 'span', 'class', 'n s n' + (node.hasChildNodes() ? 's' : 'sc'), '<');
                var nm = tree.createNodeStructure(xhtmlNS, 'span', 'class', 'nm', node.nodeName);

                nns.appendChild(nm);
                e.appendChild(nns);

                if (node.attributes != null) {
                    var namespaces = "";
                    for (var i = 0; i < node.attributes.length; i++) {
                        var att = node.attributes.item(i);
                        if (att.nodeName.startsWith('xmlns:') || att.nodeName == 'xmlns') {
                            namespaces += ' ' + att.nodeName + '=\"' + att.nodeValue + '\"';

                            //add all prefixed namespaces to a temp document used for resolving namespaces
                            if (att.nodeName != 'xmlns') {
                                var prefix = att.nodeName.match(/[^:]+$/g);
                                var exists = false;
                                //uncomment the following line to only allow unique prefix/uri combos in nsDoc
                                //exists = nsDoc.evaluate('count(/namespaces/ns[@prefix="'+prefix+'" and @uri="'+att.nodeValue+'"])',nsDoc,null,XPathResult.ANY_TYPE, null).numberValue;
                                if (!exists) {
                                    var ns = nsDoc.createElement('ns');
                                    ns.setAttribute('prefix', prefix);
                                    ns.setAttribute('uri', att.nodeValue);
                                    nsDoc.documentElement.appendChild(ns);
                                }
                            } else {
                                /*
                                * We could add these to the nsDoc without a @prefix and maybe add a @name and/or @parent attribute.
                                * When the user attempts to get an xpath result using a xpath with non-prefix elements and it fails
                                * to return results the normal way with the evaluate(), we could attempt to use regular DOM navigation 
                                * techniques. The could be problematic with complex xpaths that use predicates and axis.
                                */
                            }

                        } else {
                            // start (hanagara)
                            /* Add clickable hyper-links for JobInfo, FeedEntry, FeedRun */
                            //debugger;
                            tree.addClickableHyperlinksForJobInfoUrls(node, att);
                            tree.addClickableHyperlinksForFeedEntryUrls(node, att);
                            tree.addClickableHyperlinksForFeedRunUrls(node, att);
                            // end (hanagara) 
                            e.appendChild(document.createTextNode(' '));
                            var an = tree.createNodeStructure(xhtmlNS, 'span', 'class', 'an', att.nodeName);
                            e.appendChild(an);
                            e.appendChild(tree.createNodeStructure(xhtmlNS, 'span', 'class', 'av', '=\"'));
                            // start (hanagara)
                            var av = null;
                            if (att.nodeName.toLowerCase() == 'status') {
                                var color = 'background-color:#CCFFFF;'; // unknown; default
                                if (att.nodeValue.toLowerCase() == 'success') {
                                    color = 'background-color:#00FF66;';
                                }
                                else if (att.nodeValue.toLowerCase() == 'failed') {
                                    color = 'background-color:#FF3333;';
                                }
                                else if (att.nodeValue.toLowerCase() == 'running') {
                                    color = 'background-color:#FFFF66;';
                                }
                                av = tree.linkify(tree.createNodeStructure(xhtmlNS, 'span', 'style', color, tree.escapeText(att.nodeValue)));
                            } // end (hanagara)
                            else {
                                av = tree.linkify(tree.createNodeStructure(xhtmlNS, 'span', 'class', 'av', tree.escapeText(att.nodeValue)));
                            }
                            e.appendChild(av);
                            e.appendChild(tree.createNodeStructure(xhtmlNS, 'span', 'class', 'av', '\"'));
                        }
                    }
                    if (namespaces != "") {
                        var nx = tree.createNodeStructure(xhtmlNS, 'span', 'class', 'nx', namespaces);
                        e.appendChild(nx);
                    }
                }

                var nc = tree.createNodeStructure(xhtmlNS, 'span', 'class', 's', (node.hasChildNodes() ? '>' : '/>'));
                e.appendChild(nc);

                var c = tree.createNodeStructure(xhtmlNS, 'div', 'class', 'c', null);

                for (var i = 0; i < node.childNodes.length; i++) {
                    tree.render(node.childNodes.item(i), c);
                }
                e.appendChild(c);

                if (node.hasChildNodes()) {
                    var nne = tree.createNodeStructure(xhtmlNS, 'span', 'class', 'n ne', '</');
                    var nm = tree.createNodeStructure(xhtmlNS, 'span', 'class', 'nm', node.nodeName);
                    nne.appendChild(nm);
                    nne.appendChild(document.createTextNode(">"));
                    e.appendChild(nne);
                }
                parent.appendChild(e);
                break;
            case Node.ATTRIBUTE_NODE:
                //handled in ELEMENT processing
                break;
            case Node.TEXT_NODE:
                if (node.nodeValue.match(/\n|\r\n|\f|\r/g) == null || node.nodeValue.trim() != '') {
                    var text = node.nodeValue.replace(/\n|\r\n|\f|\r/g, '');
                    var t = tree.linkify(tree.createNodeStructure(xhtmlNS, 'span', 'class', 't', tree.escapeText(text)));
                    parent.appendChild(t);
                }
                break;
            case Node.CDATA_SECTION_NODE:
                //chrome can split a single large CDATA section into multiple nodes causing annoying, yet still accurate, rendering:
                //<element><![CDATA[...]]><![CDATA[...]]></element> 
                //so to keep it to a single node we only construct the first one encountered and use the wholeText instead of 
                //nodeValue to get the results desired.
                if (!isCDATALastNodeRendered) {
                    parent.appendChild(tree.createNodeStructure(xhtmlNS, 'span', 'class', 'cd', '<![CDATA['));
                    var cd = tree.linkify(tree.createNodeStructure(xhtmlNS, 'span', 'class', 'cd', node.wholeText));
                    parent.appendChild(cd);
                    parent.appendChild(tree.createNodeStructure(xhtmlNS, 'span', 'class', 'cd', ']]>'));
                    isCDATALastNodeRendered = true;
                }
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                var pi = tree.createNodeStructure(xhtmlNS, 'div', 'class', 'pi', '<?' + node.nodeName + ' ' + node.nodeValue + '?>');
                parent.appendChild(pi);
                break;
            case Node.COMMENT_NODE:
                var cmt = tree.createNodeStructure(xhtmlNS, 'pre', 'class', 'cmt', '<!--' + node.nodeValue + '-->');
                parent.appendChild(cmt);
                break;
            case Node.DOCUMENT_TYPE_NODE:
                var pi = tree.createNodeStructure(xhtmlNS, 'div', 'class', 'pi', '<!DOCTYPE ' + node.name + ' SYSTEM "' + node.systemId + '">');
                parent.appendChild(pi);
                break;
            case Node.DOCUMENT_NODE:
                for (var i = 0; i < node.childNodes.length; i++) {
                    tree.render(node.childNodes.item(i), parent);
                }
                break;
        }
    },

    addClickableHyperlinksForJobInfoUrls: function (node, att) {
        var jobInfoInd = document.URL.indexOf('/JobInfo/');
        if (jobInfoInd != -1) { // for ../../JobInfo/.. urls
            var urlPrefix = document.URL.substring(0, jobInfoInd);
            if (att.nodeName == 'SegmentID' && att.ownerElement.nodeName == 'SimpleJobSegment' && att.nodeValue.indexOf('Blocking') == -1 && att.nodeValue.indexOf('NonBlocking') == -1) { // Blocking/NonBlocking jobs have JobInfo urls
                var oldVal = att.nodeValue;
                var newVal = urlPrefix + '/JobInfo/' + oldVal;
                att.nodeValue = newVal;
            }
            if (att.nodeName == 'FeedEntryName' && (att.ownerElement.nodeName == 'JobFeedRun' || att.ownerElement.nodeName == 'Feed')) {
                var oldVal = att.nodeValue;
                var newVal = urlPrefix + '/FeedEntry/' + oldVal;
                att.nodeValue = newVal;
            }
            if (att.nodeName == 'FeedRunID' && (att.ownerElement.nodeName == 'JobFeedRun' || att.ownerElement.nodeName == 'Feed')) {
                var oldVal = att.nodeValue;
                var newVal = urlPrefix + '/FeedRun/' + oldVal;
                att.nodeValue = newVal;
            }
            if (att.nodeName == 'ScopeID' && att.ownerElement.nodeName == 'SimpleJobSegment') {
                var oldVal = att.nodeValue;
                var virtualCluster = node.getAttribute('VirtualCluster');
                if (virtualCluster != null && virtualCluster != '') {
                    var newVal = virtualCluster + '/_Jobs/' + oldVal;
                    att.nodeValue = newVal;
                }
            }
        }
    },

    addClickableHyperlinksForFeedEntryUrls: function (node, att) {
        var feedEntryInd = document.URL.indexOf('/FeedEntry/');
        if (feedEntryInd != -1) { // for ../../FeedEntry/.. urls
            var urlPrefix = document.URL.substring(0, feedEntryInd);
            if (att.nodeName == 'id' && att.ownerElement.nodeName == 'FeedRun') {
                var oldVal = att.nodeValue;
                var newVal = urlPrefix + '/FeedRun/' + oldVal;
                att.nodeValue = newVal;
            }
        }
    },

    addClickableHyperlinksForFeedRunUrls: function (node, att) {
        var feedRunInd = document.URL.indexOf('/FeedRun/');
        if (feedRunInd != -1) { // for ../../FeedRun/.. urls
            var urlPrefix = document.URL.substring(0, feedRunInd);
            if (att.nodeName == 'vcRelativePath' && att.ownerElement.nodeName == 'FeedRun') {
                var oldVal = att.nodeValue;
                var vcName = node.getAttribute('vcName');
                if (vcName != null && vcName != '') {
                    var newVal = vcName + oldVal + '?property=info';
                    att.nodeValue = newVal;
                }
            }
        }
    },

    customNSResolver: function (prefix) {
        return nsDoc.evaluate('/namespaces/ns[@prefix="' + prefix + '"][1]/@uri', nsDoc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
    },

    getXPathResults: function (xpath) {
        return origDoc.evaluate(xpath, origDoc, tree.customNSResolver, XPathResult.ANY_TYPE, null);
        //only handles namespaces defined in root element
        //return origDoc.evaluate(xpath, origDoc, nsResolver, XPathResult.ANY_TYPE, null);
    },

    setOrigDoc: function (doc) {
        origDoc = doc.implementation.createDocument(null, "dummy", null);
        var newNode = origDoc.importNode(doc.documentElement, true);
        origDoc.replaceChild(newNode, origDoc.documentElement);
    },

    setWonderBoxEvent: function () {
        var wb = document.getElementById('wonderbox');
        if (wb) {
            wb.addEventListener('getWonderBoxEvent', function () {
                var eventData = wb.value.trim();
                if (eventData.startsWith('<')) {
                    isWrappedText = true;
                    wrappedText = eventData;
                    tree.create();
                } else {
                    var xpathResults = tree.setXPathResults(eventData);
                    wb.value = xpathResults;
                    wb.style.backgroundColor = 'lime';
                    setTimeout(function () {
                        wb.style.backgroundColor = null;
                    }, 100);
                }
            });
        }
    },

    setTransformEvent: function () {
        var results = document.getElementById('xslResults');
        if (results) {
            results.addEventListener('getTransformEvent', function () {
                var xml = document.getElementById('xml').value;
                var xsl = document.getElementById('xsl').value;
                var params = document.getElementById('params').value;
                tree.transformer(xml, xsl, params, 'xslResults');
            });
        }
    },

    transformer: function (xml, xsl, params, outputId) {
        var txXml;
        var txXsl;
        if (!xml.trim().startsWith('<') && !xsl.trim().startsWith('<')) {
            chrome.extension.sendMessage({ name: 'getFileText', filePath: xml },
				function (responseXml) {
				    txXml = responseXml.fileText;
				    if (txXml.startsWith('Error:')) {
				        alert(xml + '\n' + txXml);
				    } else {
				        chrome.extension.sendMessage({ name: 'getFileText', filePath: xsl },
							function (responseXsl) {
							    txXsl = responseXsl.fileText;
							    if (txXsl.startsWith('Error:')) {
							        alert(xsl + '\n' + txXsl);
							    } else {
							        document.getElementById(outputId).value = executeTransformation(txXml, txXsl, params);
							    }
							}
						);
				    }
				}
			);
        } else if (xml.trim().startsWith('<') && !xsl.trim().startsWith('<')) {
            txXml = xml;
            chrome.extension.sendMessage({ name: 'getFileText', filePath: xsl },
				function (responseXsl) {
				    txXsl = responseXsl.fileText;
				    if (txXsl.startsWith('Error:')) {
				        alert(xsl + '\n' + txXsl);
				    } else {
				        document.getElementById(outputId).value = executeTransformation(txXml, txXsl, params);
				    }
				}
			);
        } else if (!xml.trim().startsWith('<') && xsl.trim().startsWith('<')) {
            txXsl = xsl;
            chrome.extension.sendMessage({ name: 'getFileText', filePath: xml },
				function (responseXml) {
				    txXml = responseXml.fileText;
				    if (txXml.startsWith('Error:')) {
				        alert(xml + '\n' + txXml);
				    } else {
				        document.getElementById(outputId).value = executeTransformation(txXml, txXsl, params);
				    }
				}
			);
        } else if (xml.trim().startsWith('<') && xsl.trim().startsWith('<')) {
            document.getElementById(outputId).value = executeTransformation(xml, xsl, params);
        }
    },


    escapeText: function (text) {
        text = text.replace(/&/g, '&amp;');
        text = text.replace(/</g, '&lt;');
        return text;
    },

    linkify: function (node) {
        if (linkUrls && node.textContent && node.textContent.match(urlRegex)) {
            var text = node.textContent;
            var ind = 0;
            var l = null;
            while (text.length > 0 && ind != -1) {
                ind = text.search(urlRegex);
                var nonUrlText = text.substring(0, ind);
                if (ind == -1) {
                    nonUrlText = text;
                    l = tree.createNodeStructure(xhtmlNS, node.tagName, 'class', node.className, nonUrlText);
                    node.appendChild(l);
                } else {
                    l = tree.createNodeStructure(xhtmlNS, node.tagName, 'class', node.className, nonUrlText);
                    node.appendChild(l);
                    text = text.substring(ind);
                    ind = text.search(/\s|"|'/);
                    var urlText = text.substring(0, ind);
                    if (ind == -1) {
                        urlText = text;
                    }
                    var hrefValue = urlText;
                    if (!urlText.toLowerCase().startsWith('http') && !urlText.toLowerCase().startsWith('ftp') && !urlText.toLowerCase().startsWith('file')) {
                        hrefValue = 'http://' + urlText;
                    }
                    // start (hanagara)
                    /* Make hyper-link's anchor value short - with just last segment of URL */
                    var shortUrlText = urlText;
                    if (tree.endsWith(shortUrlText, '/')) { // remove trailing '/' if any
                        shortUrlText = shortUrlText.substring(0, shortUrlText.length - 1);
                    }
                    shortUrlText = shortUrlText.substring(shortUrlText.lastIndexOf('/') + 1);
                    if (shortUrlText == '') { // fallback!    
                        shortUrlText = urlText;
                    }
                    // end (hanagara)
                    l = tree.createNodeStructure(xhtmlNS, 'a', 'href', hrefValue, shortUrlText);
                    l.className = node.className;
                    l.setAttribute('style', 'text-decoration:underline;');
                    l.setAttribute('target', '_blank');
                    node.appendChild(l);
                    text = text.substring(urlText.length);
                }
            }
            node.removeChild(node.firstChild);
        }
        return node;
    },

    // @author hanagara 
    // taken from http://stackoverflow.com/questions/280634/endswith-in-javascript
    endsWith: function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },

    setXPathResults: function (xpath) {
        var xpathResults = xpath + '\n';
        try {
            var resultSet = tree.getXPathResults(xpath);
            switch (resultSet.resultType) {
                case XPathResult.NUMBER_TYPE:
                    xpathResults += '\n' + resultSet.numberValue;
                    break;
                case XPathResult.STRING_TYPE:
                    xpathResults += '\n' + resultSet.stringValue;
                    break;
                case XPathResult.BOOLEAN_TYPE:
                    xpathResults += '\n' + resultSet.booleanValue;
                    break;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                    var result = resultSet.iterateNext();
                    while (result) {
                        xpathResults += '\n' + result.textContent;
                        result = resultSet.iterateNext();
                    }
                    break;
                case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
                    break; //not used
                case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
                    break; //not used
                case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
                    break; //not used
                case XPathResult.ANY_UNORDERED_NODE_TYPE:
                    break; //not used
                case XPathResult.FIRST_ORDERED_NODE_TYPE:
                    break; //not used
            }
        } catch (e) {
            xpathResults += e;
        }
        return xpathResults;
    }

}

function executeTransformation(strXml, strXsl, strJSONParams) {	
	var processor = new XSLTProcessor();
	var docXsl = tree.getDOMFromString(strXsl);
	
	//xsl:import and xsl:include and document() do not work. See bugs:
	//https://bugs.webkit.org/show_bug.cgi?id=60276 and 
	//http://code.google.com/p/chromium/issues/detail?id=8441
	if (docXsl.getElementsByTagNameNS(xslNS, 'import').item(0) != null || docXsl.getElementsByTagNameNS(xslNS, 'include').item(0) != null) {
		return 'XSL import, include and document() function do not work due to a bug in WebKit';
	}

	processor.importStylesheet(docXsl);

	try {
		if (strJSONParams.trim() != '') {
			var objParams = JSON.parse(strJSONParams);
			for (key in objParams) {
				processor.setParameter(null, key, objParams[key]);
			}
		}
	} catch (e) {
		alert('JSON.parse error. No parameters will be passed to stylesheet.\n\nError name: '+e.name+'\nError message: '+e.message);
	}

	var docResults = processor.transformToDocument(tree.getDOMFromString(strXml));
	var strResults;
	var xslOutput = docXsl.getElementsByTagNameNS(xslNS, 'output').item(0);
	if (xslOutput != null && xslOutput.getAttribute('method') == 'text') {
		//libxslt or webkit will output text results wrapped in html
		strResults = docResults.getElementsByTagName('pre').item(0).innerText;
	} else {
		strResults = tree.getStringFromDOM(docResults);
	}
	return strResults;
}


/**
 * CSS, javascript, and other text files will be wrapped in markup when displayed in the browser.
 * Some XML files, like atom feeds, fall into this category so we check the DOM's structure.
 * It changes quite frequently on how chrome represents it, so this method is pretty fluid.
 */
function isPlainTextWrappedInHtml() {
	var webKitSourceXml = document.getElementById('webkit-xml-viewer-source-xml'); 
	if (webKitSourceXml) {
		//replace orignal document with the one in the webkit-xml...xml element.
		var newNode = document.importNode(webKitSourceXml.firstElementChild,true);
		document.replaceChild(newNode,document.documentElement);
		return true;
	}
	if (document.documentElement.tagName == 'HTML') {
		var body = document.getElementsByTagName('BODY')[0];
		if (body) {	
			if (body.firstChild && body.firstChild.tagName && body.firstChild.tagName == 'PRE' && body.firstChild.firstChild && body.firstChild.firstChild.nodeName == '#text') {
				wrappedText=body.firstChild.firstChild.data;
				isWrappedText = true;
				return true;
			}
			if (body.getElementsByClassName('pretty-print').length == 1) {
				wrappedText=body.getElementsByClassName('pretty-print')[0].innerText;
				isWrappedText = true;
				return true;
			}
		}		
	}
	return false;
}

if (window.webkitIntent) {
	var reader = new FileReader();
	var intentData;
	if (window.webkitIntent.getExtra) {
		//old
		intentData = window.webkitIntent.data;
		wbTextOverride = window.webkitIntent.getExtra("url");
	} else {
		//new
		intentData = window.webkitIntent.data[0].blob;
		wbTextOverride = window.webkitIntent.data[0].url;
	}
	reader.onload = function(e) {
		isWrappedText = true;
		wrappedText = e.target.result;
		tree.create();
	};
	reader.readAsText(intentData);
}

if (!document.documentElement || tree.inarray(document.documentElement.tagName.toLowerCase(), excludedTypes) && !isPlainTextWrappedInHtml()) {
	//do nothing and let the browser do its default rendering
} else {
	var doc;
	if (isWrappedText) {
		//could be any kind of plain text file. if it is not well-formed, a parsing error will occur in the next statement
		doc = tree.getDOMFromString(wrappedText);
	} else {
		doc = document;
	}
	//ensure the wrapped text resembles well-formed XML and in not HTML/some excludedType
	if (doc != null && !tree.inarray(doc.documentElement.tagName.toLowerCase(), excludedTypes)) {
		if (doc.getElementsByTagName(parseerrorNode).length == 0) {
			tree.create();
		} else {
			if (wrappedText.startsWith('<')) {
				parsingError = doc.getElementsByTagName(parseerrorNode)[0].innerText;
				tree.create();
			}
		}
	}
}

