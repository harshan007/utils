if(!String.prototype.startsWith){
	String.prototype.startsWith = function (str) {
		return !this.indexOf(str);
	}
}

//event for communicating with the content script to retrieve xpath results or rendering
var getWonderBoxEvent = document.createEvent('Event');
getWonderBoxEvent.initEvent('getWonderBoxEvent', true, true);

//event for communicating with the content script to perform transformations
var getTransformEvent = document.createEvent('Event');
getTransformEvent.initEvent('getTransformEvent', true, true);


/**
 * Rendered page function for communicating with the content script
 */
function processWonderBox() {
	var wb = document.getElementById('wonderbox');
	if (wb) {
		wb.dispatchEvent(getWonderBoxEvent);
	}
}

/**
 * Rendered page function for communicating with the content script
 */
function processTransform() {
	var xr = document.getElementById('xslResults');
	if (xr) {
		xr.dispatchEvent(getTransformEvent);
	}
}


/**
 * Utility function for finding the first ele element parent with a classname class
 * @param ele
 * @param classname
 * @return - the parent element or null
 */
function findParentByClassName(ele, classname) {
	var par = ele.parentElement;
	while (par != null) {
		if (hasClass(par,classname)) {
			break;
		}
		par = par.parentElement;
	}
	return par;
}

/**
 * Utility function for creating a node
 * @param namespace
 * @param tag
 * @param attName
 * @param attValue
 * @param text
 * @return - created node
 */
function createNodeStructure(namespace, tag, attName, attValue, text) {
	var n = document.createElementNS(namespace, tag);
	if (attName != null && attValue != null) {
		n.setAttribute(attName, attValue);
	}
	if (text != null) {
		n.appendChild(document.createTextNode(text));
	}
	return n;
}


/**
 * Utility function to determine if the ele element has a classname class
 * @param ele
 * @param classname
 * @return - true if ele has classname
 */
function hasClass(ele, classname) {
	if ((' '+ele.className+' ').indexOf(' '+classname+' ') > -1) {
		return true;
	} else {
		return false;
	}
}

/**
 * Determines the xpath from the root node to the clicked node and sets it in the wonder box
 * @param ele
 */
function setXpath(ele) {
	var wb = document.getElementById('wonderbox');
	if (wb) {
		var path='';
		if (ele.className == 'an') {
			path = '/@'+ele.textContent;
		}
		if (ele.className == 'av') {
			var prevSib = ele.previousSibling;
			while (prevSib.className != 'an') {
				prevSib = prevSib.previousSibling;
			}
			path = '/@'+prevSib.textContent;
		} 
		if (ele.className == 'cmt') {
			path = '/comment()';
		}
		if (ele.className == 'pi') {
			path = '/processing-instruction()';
		}
		var par = findParentByClassName(ele, 'e');
		while (par != null) {
			path = '/'+ par.firstElementChild.firstElementChild.textContent + path;
			par = findParentByClassName(par, 'e');
		}
		wb.value=path;
	}
}

/**
 * Change the fill color of the passed in element
 * @param id
 * @param color
 */
function styleFill(id, color) {
	document.getElementById(id).style.fill=color;
}

/**
 * Simulates the slider turning off and on
 */
function toggleSlider() {
	var s=document.getElementById('slider');
	s.getAttribute('y') == 2 ? s.setAttribute('y',16) : s.setAttribute('y',2);
}

/**
 * Collapses/Expands the node
 * @param ele
 */
function toggleNodes(ele){
	var divE = (hasClass(ele,'e') ? ele : findParentByClassName(ele,'e'));
	//don't toggle self-closing elements
	if (!hasClass(divE.firstElementChild,'nsc')) {
		var divC = divE.getElementsByClassName('c')[0];
	
		if (divE.className.indexOf('hidden') > -1){
			var spanClosed = divE.getElementsByClassName('closed')[0];
			divE.removeChild(spanClosed);
			divC.style.display='';
			divE.className = divE.className.replace(' hidden','');
		}else{
			divC.style.display='none';
			divE.className += ' hidden';
			var closed = createNodeStructure('http://www.w3.org/1999/xhtml','span','class','closed','...');
			divC.parentNode.insertBefore(closed,divC);
	    }
	}
}

/**
 * Toggle highlighting
 * @param ele
 */
function hoverNodes(ele){
	if (ele != null) {
		var par = findParentByClassName(ele, 'e');
		while (par != null) {
			if (hasClass(par.firstElementChild,'h')) {
				//remove highlight
				par.firstElementChild.className = par.firstElementChild.className.replace(' h','');
				if (!hasClass(par.lastElementChild,'nsc')) {
					par.lastElementChild.className = par.lastElementChild.className.replace(' h','');
				}
			} else {
				//set highlight
				par.firstElementChild.className += ' h';
				if (!hasClass(par.lastElementChild,'nsc')) {
					par.lastElementChild.className += ' h';
				}
			}
			par = findParentByClassName(par, 'e');
		}
	}
}

/**
 * Toggles the ele element's opacity and visibility style
 * @param ele
 */
function toggleOpacity(ele) {
	if (ele.style.opacity=='0') {
		ele.style.opacity='1';
		ele.style.visibility='visible'
	} else {
		ele.style.opacity='0'
		ele.style.visibility='hidden';
	}
}

/**
 * Toggles the ele element's display style
 * @param ele
 */
function toggleDisplay(ele) {
	if (ele.style.display=='block' || ele.style.display.trim()=='') {
		ele.style.display='none';
	} else {
		ele.style.display='block'
	}
}

/**
 * Function for driving onmousedown events
 * @param ev - event object
 */
function mouseDownEvent(ev) {
	var ele = ev.target;
	if (ele.id == 'trannyRect' || ele.id == 'trannyPlay') {
		styleFill('trannyPlay','lime');
	}
}

/**
 * Function for driving onmouseup events
 * @param ev - event object
 */
function mouseUpEvent(ev) {
	var ele = ev.target;
	if (ele.id == 'trannyRect' || ele.id == 'trannyPlay') {
		styleFill('trannyPlay','green');
	}
}

/**
 * Function for driving onclick events
 * @param ev - event object
 */
function clickHandler(ev) {
	var ele = ev.target;
	if ((ele.nodeName.toUpperCase() == 'SPAN' && (hasClass(ele,'nm') || hasClass(ele,'an') || hasClass(ele,'av'))) 
			|| (ele.nodeName.toUpperCase() == 'PRE' && hasClass(ele,'cmt'))
			|| (ele.nodeName.toUpperCase() == 'DIV' && hasClass(ele,'pi'))) {
		setXpath(ele);
	} else if (ele.nodeName.toUpperCase() == 'RECT' && (ele.id == 'bannerRect' || ele.id == 'slider')) {
		toggleSlider();
		toggleOpacity(document.getElementById('banner'));
	} else if (ele.id == 'results') {
		processWonderBox();
		return false;
	} else if (ele.id == 'transform') {
		toggleOpacity(document.getElementById('tranny'));
		return false;
	} else if (ele.id == 'trannyRect' || ele.id == 'trannyPlay') {
		processTransform();
		return false;
	}		
}

/**
 * Function for driving ondblclick events
 * @param ev - event object
 */
function dblClickHandler(ev) {
	var ele = ev.target;
	if (ele.nodeName.toUpperCase() == 'SPAN' && (hasClass(ele,'nm') || hasClass(ele,'an') || hasClass(ele,'av'))) {
		if (findParentByClassName(ele,'nsc') == null) {
			toggleNodes(ele);
		}
	}
}

//global variable that holds the previous hovered on element
var previousEle=null;

/**
 * Function for driving onmouseover events
 * @param ev - event object
 */
function hoverHandler(ev) {
	var ele = ev.target;
	if (ele.nodeName.toUpperCase() == 'SPAN' && (hasClass(ele,'nm') || hasClass(ele,'t') || hasClass(ele,'an') || hasClass(ele,'av') || hasClass(ele,'s') || hasClass(ele,'n') || hasClass(ele,'nx') || hasClass(ele,'cd'))) {
		//remove previous highlights
		hoverNodes(previousEle);
		//set current highlights
		hoverNodes(ele);
		previousEle = ele;
	} else if (ele.nodeName.toUpperCase() == 'DIV' && hasClass(ele,'e') && ele.parentNode.id == 'tree') {
		//hack to fix display issue where root node stays highlighted
		hoverNodes(previousEle);
		previousEle = null;
	}
}

document.body.onmouseover=hoverHandler;
document.body.onclick=clickHandler;
document.body.ondblclick=dblClickHandler;
document.body.onmousedown=mouseDownEvent;
document.body.onmouseup=mouseUpEvent;
