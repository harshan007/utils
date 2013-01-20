var xsl = null;

function loadXsl(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    xsl = xhr.responseText;
	  }
	}
	xhr.send();
}

function getFileText(url, sendResponse) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		  var fileContents;
		  if (xhr.status == 200) {  
			fileContents = xhr.responseText;
		  } else if (xhr.status == 404) {
			    fileContents = 'Error: '+xhr.status+' - URL Not found';
		  } else if (xhr.status == 403) {
			    fileContents = 'Error: '+xhr.status+' - Forbidden';
		  } else {
			    fileContents = 'Error: '+xhr.status+' - HTTP status code';
		  }
		  sendResponse( {
			fileText: fileContents 
		  });
	  }
	}
	xhr.send();
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		preLoad();
		switch (request.name) {
			case 'getXSL':
				if (xsl == null) {
					loadXsl(request.filePath);
				}
				sendResponse( {
					fileText: xsl
				});
				break;
			case 'getFileText':
				getFileText(request.filePath, sendResponse);
				break;
			case 'getPreferences':
				sendResponse( {
					showParserError : localStorage['show_parsererror'],
					eleColor : localStorage['element_color'],
					eleStyle : localStorage['element_style'],
					attColor : localStorage['attribute_color'],
					attStyle : localStorage['attribute_style'],
					attValColor : localStorage['attribute_value_color'],
					attValStyle : localStorage['attribute_value_style'],
					textColor : localStorage['text_color'],
					textStyle : localStorage['text_style'],
					cdataColor : localStorage['cdata_color'],
					cdataStyle : localStorage['cdata_style'],
					cmtColor : localStorage['comment_color'],
					cmtStyle : localStorage['comment_style'],
					piColor : localStorage['pi_color'],
					piStyle : localStorage['pi_style'],
					nsColor : localStorage['namespace_color'],
					nsStyle : localStorage['namespace_style'],
					symbolColor : localStorage['symbol_color'],
					symbolStyle : localStorage['symbol_style'],
					collapsedColor : localStorage['collapsed_color'],
					hoverColor : localStorage['hover_color'],
					backgroundColor : localStorage['background_color'],
					bannerTopColor : localStorage['banner_top_color'],
					bannerBottomColor : localStorage['banner_bottom_color'],
					wbWidth : localStorage['wb_width'],
					wbTextColor : localStorage['wb_text_color'],
					wbBackgroundColor : localStorage['wb_background_color'],
					actionLinkColor : localStorage['action_link_color'],
					fontFamily : localStorage['font_family'],
					fontSize : localStorage['font_size'],
					indentSize : localStorage['indent_size'],
					lineWrap : localStorage['line_wrap'],
					displayBanner : localStorage['display_banner'],
					toggleSpeed : localStorage['toggle_speed'],
					displayXml : localStorage['display_xml'],
					debugMode : localStorage['debug_mode'],
					linkUrls : localStorage['link_urls'],
				});
				break;
			case 'showPageAction':
		        //chrome.pageAction.show(sender.tab.id);
		        // Return nothing to let the connection be cleaned up.
		        sendResponse({});						
				break;
		}
	}
);

function preLoad() {
	loadXsl('inline.xsl');
}