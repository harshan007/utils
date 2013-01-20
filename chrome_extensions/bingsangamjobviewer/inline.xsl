<xsl:stylesheet version="1.0"
 xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
 xmlns:libxslt="http://xmlsoft.org/XSLT/namespace"
 exclude-result-prefixes="libxslt">
    <xsl:output method="html" encoding="utf-8" indent="no" doctype-system="about:legacy-compat"/>
    
    <xsl:param name="utilsPath"/>
    <xsl:param name="optionsPath"/>
    <xsl:param name="viewSourcePath"/> 
    <xsl:param name="eleColor" select="'purple'"/>
    <xsl:param name="eleStyle" select="''"/>
    <xsl:param name="attColor" select="'olive'"/>
    <xsl:param name="attStyle" select="''"/>
    <xsl:param name="attValColor" select="'blue'"/>
    <xsl:param name="attValStyle" select="''"/>
    <xsl:param name="textColor" select="'black'"/>
    <xsl:param name="textStyle" select="''"/>
    <xsl:param name="cdataColor" select="'teal'"/>
    <xsl:param name="cdataStyle" select="''"/>
    <xsl:param name="cmtColor" select="'green'"/>
    <xsl:param name="cmtStyle" select="''"/>
    <xsl:param name="piColor" select="'gold'"/>
    <xsl:param name="piStyle" select="''"/>
    <xsl:param name="nsColor" select="'gray'"/>
    <xsl:param name="nsStyle" select="''"/>
    <xsl:param name="symbolColor" select="'black'"/>
    <xsl:param name="symbolStyle" select="''"/>
    <xsl:param name="collapseColor" select="'lime'"/>
    <xsl:param name="hoverColor" select="'skyblue'"/>
    <xsl:param name="backgroundColor" select="'white'"/>
    <xsl:param name="bannerTopColor" select="'dodgerblue'"/>
    <xsl:param name="bannerBottomColor" select="'slategrey'"/>
    <xsl:param name="wbWidth" select="'50%'"/>
    <xsl:param name="wbTextColor" select="'black'"/>
    <xsl:param name="wbBackgroundColor" select="'white'"/>
    <xsl:param name="actionLinkColor" select="'white'"/>
    <xsl:param name="fontFamily" select="'monospace'"/>
    <xsl:param name="fontSize" select="'13px'"/>
    <xsl:param name="indentSize" select="'20px'"/>
    <xsl:param name="lineWrap" select="'1em'"/>
    <xsl:param name="displayBanner" select="'no'"/>
    <xsl:param name="toggleSpeed" select="'1'"/>
    <xsl:param name="displayXml" select="'no'"/>
    <xsl:param name="xmlStandalone"/>
    <xsl:param name="xmlEncoding"/>
    <xsl:param name="xmlVersion"/>
    <xsl:param name="debugMode" select="'no'"/>
    <xsl:param name="wbTextOverride"/>
    <xsl:variable name="quot">&quot;</xsl:variable>
    <xsl:variable name="colon">:</xsl:variable>
    <xsl:variable name="empty"></xsl:variable>
    <xsl:variable name="apos">&apos;</xsl:variable>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <title><xsl:value-of select="$viewSourcePath"/></title>
                <style>
                    html,body{margin:30px <xsl:value-of select="$lineWrap"/> 1em 0em;
                    	padding:0px;background-color:<xsl:value-of select="$backgroundColor"/>;
                    	font-family:<xsl:value-of select="$fontFamily"/>;}
                    pre{margin:0px;}
                    textarea{border-radius: 5px;}
					#tree{
						color:<xsl:value-of select="$symbolColor"/>;
						font-size:<xsl:value-of select="$fontSize"/>;
						padding-left:1em;word-wrap:break-word;
					}
					.e{margin:2px 0px 5px;}
					.e                    
                    .e{margin-left:<xsl:value-of select="$indentSize"/>;}
					.c,div.inline
					*,div.inline{display:inline}
					div.inline
					*,div.inline{margin:0;border-left:none}
					.nm{
					<xsl:choose>
						<xsl:when test="normalize-space($eleStyle) != ''">
							<xsl:value-of select="$eleStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$eleColor"/>;font-weight:bold;
						</xsl:otherwise>
					</xsl:choose>
					}
					.an{
					<xsl:choose>
						<xsl:when test="normalize-space($attStyle) != ''">
							<xsl:value-of select="$attStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$attColor"/>;
						</xsl:otherwise>
					</xsl:choose>
					}
					.av{
					<xsl:choose>
						<xsl:when test="normalize-space($attValStyle) != ''">
							<xsl:value-of select="$attValStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$attValColor"/>;
						</xsl:otherwise>
					</xsl:choose>
					}
					.nx{
					<xsl:choose>
						<xsl:when test="normalize-space($nsStyle) != ''">
							<xsl:value-of select="$nsStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$nsColor"/>;
						</xsl:otherwise>
					</xsl:choose>
					}
					.cmt{margin-left:<xsl:value-of select="$indentSize"/>;cursor:pointer;
					<xsl:choose>
						<xsl:when test="normalize-space($cmtStyle) != ''">
							<xsl:value-of select="$cmtStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$cmtColor"/>;font-style:italic;
						</xsl:otherwise>
					</xsl:choose>					
					}
					.t{white-space:pre;
					<xsl:choose>
						<xsl:when test="normalize-space($textStyle) != ''">
							<xsl:value-of select="$textStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$textColor"/>;font-weight:bold;
						</xsl:otherwise>
					</xsl:choose>					
					}
					.cd{white-space:pre;
					<xsl:choose>
						<xsl:when test="normalize-space($cdataStyle) != ''">
							<xsl:value-of select="$cdataStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$cdataColor"/>;font-weight:bold;
						</xsl:otherwise>
					</xsl:choose>					
					}
					.pi{cursor:pointer;
					<xsl:choose>
						<xsl:when test="normalize-space($piStyle) != ''">
							<xsl:value-of select="$piStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$piColor"/>;
						</xsl:otherwise>
					</xsl:choose>					
					}
					.s{
					<xsl:choose>
						<xsl:when test="normalize-space($symbolStyle) != ''">
							<xsl:value-of select="$symbolStyle"/>
						</xsl:when>
						<xsl:otherwise>
							color:<xsl:value-of select="$symbolColor"/>;
						</xsl:otherwise>
					</xsl:choose>					
					}
					.ne,.ns,.nsc,.an,.av{cursor:pointer;}
					.closed{background:<xsl:value-of select="$collapseColor"/>;border-radius: 5px;}
					.h{background-color:<xsl:value-of select="$hoverColor"/>;border-radius: 5px;}
					#banner{display:block;position:fixed;border-bottom:3px solid #000;border-right:3px solid #000; 
                    	top:0;left:0;width:100%;height:55px;font-size:80%;font-weight:normal;
                    	line-height:25px;text-align:left;padding-left:1em;
                    	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(<xsl:value-of select="$bannerTopColor"/>), to(<xsl:value-of select="$bannerBottomColor"/>));
                    	-webkit-transition:opacity <xsl:value-of select="$toggleSpeed"/>s, visibility <xsl:value-of select="$toggleSpeed"/>s;}
					#wonderbox{width:<xsl:value-of select="$wbWidth"/>;float:left;color:<xsl:value-of select="$wbTextColor"/>;background-color:<xsl:value-of select="$wbBackgroundColor"/>;}
					#tranny{resize:both;overflow:auto;background-color:rgba(215,215,196,0.5);border-radius: 5px;border:1px solid silver;box-shadow: 10px 10px 5px #888888;margin-top:10px;margin-left:50%;margin-right:5%;opacity:0;visibility:hidden; -webkit-transition:opacity <xsl:value-of select="$toggleSpeed"/>s, visibility <xsl:value-of select="$toggleSpeed"/>s;}
					.trannyTA{width:94%;margin-left:3%;}
					.trannyButton{margin-left:3%;width:32px;}
					a.action{vertical-align:top;margin-left:1em;text-decoration:none;color:<xsl:value-of select="$actionLinkColor"/>;}
					a.action:visited{color:<xsl:value-of select="$actionLinkColor"/>;}
					a.action:hover{text-shadow: -1px -1px <xsl:value-of select="$actionLinkColor"/>;}
					#toggle{position:fixed;top:12px;right:6px;cursor:pointer;height:32px;width:16px;}
                </style>

		        <script type="text/javascript" src="{$utilsPath}"></script>

            </head>
            <body>
            	<xsl:if test="$displayBanner = 'yes'">
	                <div id="banner">
    	                <textarea id="wonderbox" rows="3" cols="50" placeholder="Click entity for XPath. Double-click to collapse/expand. Enter XPath or XML string then click XPath/Render for results or to XML Tree-ify, respectively.">
    	                	<xsl:if test="normalize-space($wbTextOverride) != ''">
    	                		<xsl:value-of select="$wbTextOverride"/>
    	                	</xsl:if>
    	                </textarea>
    	                <div id="tools">
    	                	<div>
   	                			<xsl:if test="normalize-space($wbTextOverride) = ''">
   	                				<!-- this is needed as xml viewed from webintents doesn't give us the URL in the address bar -->
       	       						<a class="action" id="view" href="view-source:{$viewSourcePath}" target="_blank">Source</a>
       	       					</xsl:if>
            	   				<a class="action" id="options" href="{$optionsPath}" target="_blank">Options</a>
    	                	</div>
   	                		<div>
								<a class="action" id="results" href="#">XPath/Render</a>
								<a class="action" id="transform" href="#">XSL</a>
							</div>
						</div>
						<div id="tranny" style="opacity:0;visibility:hidden;">
							<textarea style="margin-top:3%;" class="trannyTA" id="xml" rows="2" cols="50" placeholder="XML String or HTTP URL"></textarea>
							<textarea class="trannyTA" id="xsl" rows="2" cols="50" placeholder="XSL String or HTTP URL"></textarea>
							<xsl:variable name="paramExample">{"param1":"value1","param2":2}</xsl:variable>
							<textarea class="trannyTA" id="params" rows="2" cols="50" placeholder="XSL Parameters (JSON format) e.g.{$paramExample}"></textarea>
							<textarea class="trannyTA" id="xslResults" rows="5" cols="50" placeholder="Results"></textarea>
							<div class="trannyButton" title="Click to execute transformation">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
									<defs>
										<linearGradient id="tranny_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
											<stop offset="0%" style="stop-color:white;stop-opacity:1"/>
											<stop offset="100%" style="stop-color:lightgray;stop-opacity:1"/>
										</linearGradient>							
									</defs>
									<rect id="trannyRect" x="0" y="0" width="32" height="32" rx="5" ry="5" style="fill:url(#tranny_gradient);stroke:black;"/>
									<polygon id="trannyPlay" fill="green" points="8,8,8,24,24,16"/>									
								</svg>
							</div>
						</div>
                	</div>
                	<div id="toggle" title="Click to toggle banner">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="32">
							<defs>
								<linearGradient id="slider_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" style="stop-color:white;stop-opacity:1"/>
									<stop offset="100%" style="stop-color:lightgray;stop-opacity:1"/>
								</linearGradient>
								<linearGradient id="banner_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" style="stop-color:{$bannerTopColor};stop-opacity:1"/>
									<stop offset="100%" style="stop-color:{$bannerBottomColor};stop-opacity:1"/>
								</linearGradient>
							</defs>
							<rect id="bannerRect" x="0" y="0" width="16" height="32" rx="2" ry="2" fill="white"/>
							<rect id="bannerRect" x="1" y="1" width="14" height="30" rx="2" ry="2" fill="darkgray"/>
							<rect id="bannerRect" x="2" y="2" width="12" height="14" rx="2" ry="2" style="fill:url(#banner_gradient)"/>
							<rect id="slider" x="2" y="2" width="12" height="14" rx="2" ry="2" style="fill:url(#slider_gradient)"/>
						</svg>
					</div>
                </xsl:if>
                <div id="tree">
                	<xsl:if test="$debugMode = 'yes'">
				        <div class="cmt">
            				<xsl:text>&lt;!--</xsl:text>
            				<br/>
							DEBUG MODE*****************************************************************<br/>
							<xsl:value-of select="concat('XSLT Version: ',system-property('xsl:version'))" /><br/>
							<xsl:value-of select="concat('XSLT Processor Vendor: ',system-property('xsl:vendor'))" /><br/>
							<xsl:value-of select="concat('Vendor URL: ',system-property('xsl:vendor-url'))" /><br/>
							<br/>
							Parameters:<br/>
							utilsPath=<xsl:value-of select="$utilsPath"/><br/>
							optionsPath=<xsl:value-of select="$optionsPath"/><br/>
							viewSourcePath=<xsl:value-of select="$viewSourcePath"/><br/> 
							eleColor=<xsl:value-of select="$eleColor"/><br/>
							attColor=<xsl:value-of select="$attColor"/><br/>
							attValColor=<xsl:value-of select="$attValColor"/><br/>
							textColor=<xsl:value-of select="$textColor"/><br/>
							cdataColor=<xsl:value-of select="$cdataColor"/><br/>
							cmtColor=<xsl:value-of select="$cmtColor"/><br/>
							piColor=<xsl:value-of select="$piColor"/><br/>
							nsColor=<xsl:value-of select="$nsColor"/><br/>
							collapseColor=<xsl:value-of select="$collapseColor"/><br/>
							symbolColor=<xsl:value-of select="$symbolColor"/><br/>
							hoverColor=<xsl:value-of select="$hoverColor"/><br/>
							backgroundColor=<xsl:value-of select="$backgroundColor"/><br/>
							bannerTopColor=<xsl:value-of select="$bannerTopColor"/><br/>
							bannerBottomColor=<xsl:value-of select="$bannerBottomColor"/><br/>
							wbTextColor=<xsl:value-of select="$wbTextColor"/><br/>
							wbBackgroundColor=<xsl:value-of select="$wbBackgroundColor"/><br/>
							actionLinkColor=<xsl:value-of select="$actionLinkColor"/><br/>
							fontFamily=<xsl:value-of select="$fontFamily"/><br/>
							fontSize=<xsl:value-of select="$fontSize"/><br/>
							indentSize=<xsl:value-of select="$indentSize"/><br/>
							lineWrap (i.e. margin-right)=<xsl:value-of select="$lineWrap"/><br/>
							displayBanner=<xsl:value-of select="$displayBanner"/><br/>
							toggleSpeed=<xsl:value-of select="$toggleSpeed"/><br/>
							displayXml=<xsl:value-of select="$displayXml"/><br/>
							debugMode=<xsl:value-of select="$debugMode"/><br/>
							<br/>
							Other:<br/>
							function-available('libxslt:node-set')=<xsl:value-of select="function-available('libxslt:node-set')"/><br/>
							DEBUG MODE*****************************************************************<br/>
			            	<xsl:text>--&gt;</xsl:text>
        				</div>
                	</xsl:if>
                	<xsl:if test="$displayXml = 'yes'">
                		<div id="xml">
                			<xsl:text>&lt;?xml version="</xsl:text>
                			<xsl:choose>
		                		<xsl:when test="normalize-space($xmlVersion) != ''">
		                			<xsl:value-of select="$xmlVersion"/>
		                		</xsl:when>
		                		<xsl:otherwise>
		                			<xsl:text>1.0</xsl:text>
		                		</xsl:otherwise>
	                		</xsl:choose>
                			<xsl:text>"</xsl:text> 
	                		<xsl:if test="normalize-space($xmlEncoding) != ''">
	                			<xsl:text> encoding="</xsl:text>
	                			<xsl:value-of select="$xmlEncoding"/>
	                			<xsl:text>"</xsl:text> 
	                		</xsl:if>
	                		<xsl:if test="normalize-space($xmlStandalone) = 'true'">
	                			<xsl:text> standalone="yes"</xsl:text>
	                		</xsl:if>
                			<xsl:text>?&gt;</xsl:text>
                		</div> 
                	</xsl:if>
					
					<!-- XSLT rendering is deprecated as of version 1.9.0 - alan 20101028 
					<xsl:if test="$renderMethod = 'xslt'">
                    	<xsl:apply-templates select="processing-instruction()"/>
                    	<xsl:apply-templates select="node()[not(self::processing-instruction())]"/>
                    </xsl:if>
                     -->
                    
                </div>
            </body>
        </html>
    </xsl:template>
    
	<xsl:variable name="rootNodeNamespaces">
		<xsl:for-each select="/*/namespace::*[. != 'http://www.w3.org/XML/1998/namespace']">
			<xsl:text> xmlns</xsl:text>
			<xsl:if test="normalize-space(name(.)) != $empty">
				<xsl:value-of select="concat($colon,name(.))"/>
			</xsl:if>
			<xsl:text>=</xsl:text>
			<xsl:value-of select="concat($quot,.,$quot)"/>
		</xsl:for-each>
	</xsl:variable>


    
    <xsl:template match="*">
        <div class="e">
       		<xsl:if test="$displayTooltip = 'yes'"> 
       			<xsl:attribute name="title"><xsl:call-template name="xpath"/></xsl:attribute>
       		</xsl:if>
            <xsl:variable name="tag">
                <span class="nm">
                    <xsl:value-of select="name(.)"/>
                </span>
            </xsl:variable>
            <span>
                <xsl:attribute name="class">
                	<!-- node -->
                    <xsl:text>n s n</xsl:text>
                    <xsl:choose>
                        <xsl:when test="node()">
                        	<!-- start -->
                            <xsl:text>s</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                        	<!-- self close -->
                            <xsl:text>sc</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
                <xsl:text>&lt;</xsl:text>
                <xsl:copy-of select="$tag"/>
            </span>
            
            <xsl:apply-templates select="@*"/>

       		<xsl:choose>
				<xsl:when test=". = /*">
					<!-- render all namespaces declared on the root element -->
		            <span class="nx">
		                <xsl:value-of select="$rootNodeNamespaces"/>
		            </span>
				</xsl:when>
	         	<xsl:otherwise>
	         		<xsl:variable name="currentNamespace">
		                <xsl:call-template name="constructNamespace">
		                	<xsl:with-param name="node" select="."/>
		                </xsl:call-template>
	         		</xsl:variable>
	         		<xsl:variable name="parentNamespace">
		                <xsl:call-template name="constructNamespace">
		                	<xsl:with-param name="node" select=".."/>
		                </xsl:call-template>
	         		</xsl:variable>
			        <xsl:if test="$currentNamespace != $parentNamespace and not(contains($rootNodeNamespaces,$currentNamespace))">
						<span class="nx">
						    <xsl:value-of select="$currentNamespace"/>
						</span>
					</xsl:if>
				</xsl:otherwise>
       		</xsl:choose>
            
            <span class="s">
            	<xsl:if test="not(node())">
					<xsl:text>/</xsl:text>
            	</xsl:if>
            	<xsl:text>&gt;</xsl:text>
            </span>
            
            <xsl:if test="node()">
                <div class="c">
                    <xsl:apply-templates/>
                </div>
                <!-- node and node-end -->
                <span class="n ne">
                    <xsl:text>&lt;</xsl:text>
                    <xsl:text>/</xsl:text>
                    <xsl:copy-of select="$tag"/>
                    <xsl:text>&gt;</xsl:text>
                </span>
            </xsl:if>
        </div>
    </xsl:template>
    <xsl:template match="@*">
        <xsl:text> </xsl:text>
        <span class="an">
            <xsl:value-of select="name(.)"/>
        </span>
        <xsl:text>=</xsl:text>
        <span class="av">
            <xsl:value-of select="concat($quot, ., $quot)"/>
        </span>
        <!-- if we have a namespace AND our namespace isn't the same as parent AND the current element is not root so we avoid duplicate declarations -->
        <xsl:if test="namespace-uri(.) and namespace-uri(.) != namespace-uri(..) and parent::* != /*">
       		<xsl:variable name="currentNamespace">
				<xsl:call-template name="constructNamespace">
					<xsl:with-param name="node" select="."/>
				</xsl:call-template>
			</xsl:variable>
			<xsl:if test="not(contains($rootNodeNamespaces,$currentNamespace))">
	            <span class="nx">
		        	<xsl:call-template name="constructNamespace">
	    	    		<xsl:with-param name="node" select="."/>
	        		</xsl:call-template>
	            </span>
            </xsl:if>
        </xsl:if>
    </xsl:template>
    <xsl:template match="text()">
        <xsl:if test="normalize-space(.)">
    		<span class="t">
				<xsl:value-of select="."/>
    		</span>
        </xsl:if>
    </xsl:template>
    <xsl:template match="comment()">
        <pre class="cmt"><xsl:text>&lt;!--</xsl:text><xsl:value-of select="."/><xsl:text>--&gt;</xsl:text></pre>
    </xsl:template>
    <xsl:template match="processing-instruction()">
        <div class="pi">
            <xsl:text>&lt;?</xsl:text>
            <xsl:value-of select="name(.)"/>
            <xsl:text> </xsl:text>
            <xsl:value-of select="."/>
            <xsl:text>?&gt;</xsl:text>
        </div>
    </xsl:template>
    <xsl:template name="xpath">
        <xsl:for-each select="ancestor-or-self::*">
            <xsl:text>/</xsl:text>
            <xsl:value-of select="name()"/>
        </xsl:for-each>
    </xsl:template>
	<xsl:template name="findUniqueNamespaces">
		<xsl:param name="namespaceList"/>
		<xsl:param name="uniqueList"/>
		<xsl:choose>
			<xsl:when test="contains($namespaceList,'!|!')">
				<xsl:variable name="namespaceDeclaration" select="substring-before($namespaceList,'!|!')"/>
				<xsl:variable name="list">
					<xsl:if test="contains($uniqueList,$namespaceDeclaration) = false()">
						<xsl:text> </xsl:text>
						<xsl:value-of select="$namespaceDeclaration"/>
					</xsl:if>
				</xsl:variable>
				<xsl:call-template name="findUniqueNamespaces">
					<xsl:with-param name="namespaceList" select="substring-after($namespaceList,'!|!')"/>
					<xsl:with-param name="uniqueList" select="concat($uniqueList,$list)"/>
				</xsl:call-template>
			</xsl:when>		
			<xsl:otherwise>
				<xsl:value-of select="$uniqueList"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="constructNamespace">
		<xsl:param name="node"/>
   	    <xsl:variable name="prefix">
			<xsl:if test="contains(name($node), $colon)">
           		<xsl:value-of select="substring-before(name($node), $colon)"/>
			</xsl:if>
        </xsl:variable>
		<xsl:text> xmlns</xsl:text>
		<xsl:if test="normalize-space($prefix) != $empty">
			<xsl:value-of select="concat($colon,$prefix)"/>
		</xsl:if>
		<xsl:text>=</xsl:text>
		<xsl:value-of select="concat($quot,namespace-uri($node),$quot)"/>
	</xsl:template>
</xsl:stylesheet>