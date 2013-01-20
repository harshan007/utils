// Saves options to localStorage.
function save_options() {
  localStorage['element_color'] = document.getElementById('element_color').value;
  localStorage['element_style'] = document.getElementById('element_style').value;
  localStorage['attribute_color'] = document.getElementById('attribute_color').value;
  localStorage['attribute_style'] = document.getElementById('attribute_style').value;
  localStorage['attribute_value_color'] = document.getElementById('attribute_value_color').value;
  localStorage['attribute_value_style'] = document.getElementById('attribute_value_style').value;
  localStorage['text_color'] = document.getElementById('text_color').value;
  localStorage['text_style'] = document.getElementById('text_style').value;
  localStorage['cdata_color'] = document.getElementById('cdata_color').value;
  localStorage['cdata_style'] = document.getElementById('cdata_style').value;
  localStorage['comment_color'] = document.getElementById('comment_color').value;
  localStorage['comment_style'] = document.getElementById('comment_style').value;
  localStorage['pi_color'] = document.getElementById('pi_color').value;
  localStorage['pi_style'] = document.getElementById('pi_style').value;
  localStorage['namespace_color'] = document.getElementById('namespace_color').value;
  localStorage['namespace_style'] = document.getElementById('namespace_style').value;
  localStorage['symbol_color'] = document.getElementById('symbol_color').value;
  localStorage['symbol_style'] = document.getElementById('symbol_style').value;
  localStorage['collapsed_color'] = document.getElementById('collapsed_color').value;
  localStorage['hover_color'] = document.getElementById('hover_color').value;
  localStorage['background_color'] = document.getElementById('background_color').value;
  localStorage['banner_top_color'] = document.getElementById('banner_top_color').value;
  localStorage['banner_bottom_color'] = document.getElementById('banner_bottom_color').value;
  localStorage['wb_text_color'] = document.getElementById('wb_text_color').value;
  localStorage['wb_background_color'] = document.getElementById('wb_background_color').value;
  localStorage['action_link_color'] = document.getElementById('action_link_color').value;
  localStorage['font_family'] = document.getElementById('font_family').value;
  localStorage['font_size'] = document.getElementById('font_size').value;
  localStorage['indent_size'] = document.getElementById('indent_size').value;
  localStorage['toggle_speed'] = document.getElementById('toggle_speed').value;
  var select = document.getElementById('line_wrap');
  localStorage['line_wrap'] = select.children[select.selectedIndex].value;			
  select = document.getElementById('display_banner');
  localStorage['display_banner'] = select.children[select.selectedIndex].value;			
  select = document.getElementById('display_xml');
  localStorage['display_xml'] = select.children[select.selectedIndex].value;
  select = document.getElementById('show_parsererror');
  localStorage['show_parsererror'] = select.children[select.selectedIndex].value;			
  select = document.getElementById('debug_mode');
  localStorage['debug_mode'] = select.children[select.selectedIndex].value;
  select = document.getElementById('link_urls');
  localStorage['link_urls'] = select.children[select.selectedIndex].value;
  select = document.getElementById('wb_width');
  localStorage['wb_width'] = select.children[select.selectedIndex].value;
  
  restore_options();

  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.innerHTML = 'FLAWLESS VICTORY';
  setTimeout(function() {
    status.innerHTML = '';
  }, 1000);
}

// Display current/default values and render sample xml accordingly
function restore_options() {
  var element_color = localStorage['element_color'];
  if (!element_color) {
    element_color = 'purple';
	localStorage['element_color'] = element_color;
  }
  var element_style = localStorage['element_style'];
  if (!element_style) {
    element_style = '';
	localStorage['element_style'] = element_style;
  }
  var attribute_color = localStorage['attribute_color'];
  if (!attribute_color) {
    attribute_color = 'olive';
	localStorage['attribute_color'] = attribute_color;
  }
  var attribute_style = localStorage['attribute_style'];
  if (!attribute_style) {
    attribute_style = '';
	localStorage['attribute_style'] = attribute_style;
  }
  var attribute_value_color = localStorage['attribute_value_color'];
  if (!attribute_value_color) {
    attribute_value_color = 'blue';
	localStorage['attribute_value_color'] = attribute_value_color;
  }
  var attribute_value_style = localStorage['attribute_value_style'];
  if (!attribute_value_style) {
    attribute_value_style = '';
	localStorage['attribute_value_style'] = attribute_value_style;
  }
  var text_color = localStorage['text_color'];
  if (!text_color) {
    text_color = 'black';
	localStorage['text_color'] = text_color;
  }
  var text_style = localStorage['text_style'];
  if (!text_style) {
    text_style = '';
	localStorage['text_style'] = text_style;
  }
  var cdata_color = localStorage['cdata_color'];
  if (!cdata_color) {
    cdata_color = 'teal';
	localStorage['cdata_color'] = cdata_color;
  }
  var cdata_style = localStorage['cdata_style'];
  if (!cdata_style) {
    cdata_style = '';
	localStorage['cdata_style'] = cdata_style;
  }
  var comment_color = localStorage['comment_color'];
  if (!comment_color) {
    comment_color = 'green';
	localStorage['comment_color'] = comment_color;
  }
  var comment_style = localStorage['comment_style'];
  if (!comment_style) {
    comment_style = '';
	localStorage['comment_style'] = comment_style;
  }
  var pi_color = localStorage['pi_color'];
  if (!pi_color) {
    pi_color = 'gold';
	localStorage['pi_color'] = pi_color;
  }
  var pi_style = localStorage['pi_style'];
  if (!pi_style) {
    pi_style = '';
	localStorage['pi_style'] = pi_style;
  }
  var namespace_color = localStorage['namespace_color'];
  if (!namespace_color) {
    namespace_color = 'gray';
	localStorage['namespace_color'] = namespace_color;
  }
  var namespace_style = localStorage['namespace_style'];
  if (!namespace_style) {
    namespace_style = '';
	localStorage['namespace_style'] = namespace_style;
  }
  var symbol_color = localStorage['symbol_color'];
  if (!symbol_color) {
    symbol_color = 'black';
	localStorage['symbol_color'] = symbol_color;
  }
  var symbol_style = localStorage['symbol_style'];
  if (!symbol_style) {
    symbol_style = '';
	localStorage['symbol_style'] = symbol_style;
  }
  var collapsed_color = localStorage['collapsed_color'];
  if (!collapsed_color) {
    collapsed_color = 'lime';
	localStorage['collapsed_color'] = collapsed_color;
  }
  var hover_color = localStorage['hover_color'];
  if (!hover_color) {
    hover_color = 'skyblue';
	localStorage['hover_color'] = hover_color;
  }
  var background_color = localStorage['background_color'];
  if (!background_color) {
    background_color = 'white';
	localStorage['background_color'] = background_color;
  }
  var banner_top_color = localStorage['banner_top_color'];
  if (!banner_top_color) {
    banner_top_color = 'dodgerblue';
	localStorage['banner_top_color'] = banner_top_color;
  }
  var banner_bottom_color = localStorage['banner_bottom_color'];
  if (!banner_bottom_color) {
    banner_bottom_color = 'slategrey';
	localStorage['banner_bottom_color'] = banner_bottom_color;
  }
  var wb_text_color = localStorage['wb_text_color'];
  if (!wb_text_color) {
    wb_text_color = 'black';
	localStorage['wb_text_color'] = wb_text_color;
  }
  var wb_background_color = localStorage['wb_background_color'];
  if (!wb_background_color) {
    wb_background_color = 'white';
	localStorage['wb_background_color'] = wb_background_color;
  }
  var action_link_color = localStorage['action_link_color'];
  if (!action_link_color) {
    action_link_color = 'white';
	localStorage['action_link_color'] = action_link_color;
  }
  var font_family = localStorage['font_family'];
  if (!font_family) {
    font_family = 'monospace';
	localStorage['font_family'] = font_family;
  }
  var font_size = localStorage['font_size'];
  if (!font_size) {
    font_size = '13px';
	localStorage['font_size'] = font_size;
  }
  var indent_size = localStorage['indent_size'];
  if (!indent_size) {
	indent_size = '20px';
	localStorage['indent_size'] = indent_size;
  }
  var line_wrap = localStorage['line_wrap'];
  if (!line_wrap) {
	line_wrap = '1em';
	localStorage['line_wrap'] = line_wrap;
  }
  var display_banner = localStorage['display_banner'];
  if (!display_banner) {
  	display_banner = 'no'; // disable banner by default (hanagara)
	localStorage['display_banner'] = display_banner;
  }
  var toggle_speed = localStorage['toggle_speed'];
  if (toggle_speed == null) {
  	toggle_speed = "1";
	localStorage['toggle_speed'] = toggle_speed;
  }
  var display_xml = localStorage['display_xml'];
  if (!display_xml) {
	display_xml = 'no';
	localStorage['display_xml'] = display_xml;
  }
  var show_parsererror = localStorage['show_parsererror'];
  if (!show_parsererror) {
	show_parsererror = 'no';
	localStorage['show_parsererror'] = show_parsererror;
  }
  var debug_mode = localStorage['debug_mode'];
  if (!debug_mode) {
  	debug_mode = 'no';
	localStorage['debug_mode'] = debug_mode;
  }
  var link_urls = localStorage['link_urls'];
  if (!link_urls) {
    link_urls = 'yes'; // hyper-linking urls by default (hanagara)
	localStorage['link_urls'] = link_urls;
  }
  var wb_width = localStorage['wb_width'];
  if (!wb_width) {
  	wb_width = '50%';
	localStorage['wb_width'] = wb_width;
  }
  
  document.getElementById('element_color').value = element_color;
  document.getElementById('element_style').value = element_style;
  document.getElementById('attribute_color').value = attribute_color;
  document.getElementById('attribute_style').value = attribute_style;
  document.getElementById('attribute_value_color').value = attribute_value_color;
  document.getElementById('attribute_value_style').value = attribute_value_style;
  document.getElementById('text_color').value = text_color;
  document.getElementById('text_style').value = text_style;
  document.getElementById('cdata_color').value = cdata_color;
  document.getElementById('cdata_style').value = cdata_style;
  document.getElementById('comment_color').value = comment_color;
  document.getElementById('comment_style').value = comment_style;
  document.getElementById('pi_color').value = pi_color;
  document.getElementById('pi_style').value = pi_style;
  document.getElementById('namespace_color').value = namespace_color;
  document.getElementById('namespace_style').value = namespace_style;
  document.getElementById('symbol_color').value = symbol_color;
  document.getElementById('symbol_style').value = symbol_style;
  document.getElementById('collapsed_color').value = collapsed_color;
  document.getElementById('hover_color').value = hover_color;
  document.getElementById('background_color').value = background_color;
  document.getElementById('banner_top_color').value = banner_top_color;
  document.getElementById('banner_bottom_color').value = banner_bottom_color;
  document.getElementById('wb_text_color').value = wb_text_color;
  document.getElementById('wb_background_color').value = wb_background_color;
  document.getElementById('action_link_color').value = action_link_color;
  document.getElementById('font_family').value = font_family;
  document.getElementById('font_size').value = font_size;
  document.getElementById('indent_size').value = indent_size;
  document.getElementById('toggle_speed').value = toggle_speed;

  setSelect(document.getElementById('line_wrap'), line_wrap);
  setSelect(document.getElementById('display_banner'), display_banner);
  setSelect(document.getElementById('display_xml'), display_xml);
  setSelect(document.getElementById('show_parsererror'), show_parsererror);
  setSelect(document.getElementById('debug_mode'), debug_mode);
  setSelect(document.getElementById('link_urls'), link_urls);
  setSelect(document.getElementById('wb_width'), wb_width);

  var banner = document.getElementById('banner');
  banner.style.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from('+banner_top_color+'), to('+banner_bottom_color+'))';

  var wonderbox = document.getElementById('wonderbox');
  wonderbox.style.width = wb_width;
  wonderbox.style.color = wb_text_color;
  wonderbox.style.backgroundColor = wb_background_color;
  document.getElementById('view').style.color = action_link_color;
  document.getElementsByClassName('name')[0].style.color = element_color;
  document.getElementsByClassName('name')[1].style.color = element_color;
  document.getElementsByClassName('name')[2].style.color = element_color;
  document.getElementsByClassName('name')[3].style.color = element_color;
  document.getElementsByClassName('a-name')[0].style.color = attribute_color;
  document.getElementsByClassName('a-value')[0].style.color = attribute_value_color;
  document.getElementsByClassName('text')[0].style.color = text_color;
  document.getElementsByClassName('cdata')[0].style.color = cdata_color;
  document.getElementsByClassName('comment')[0].style.color = comment_color;
  document.getElementsByClassName('pi')[0].style.color = pi_color;
  document.getElementsByClassName('pi')[1].style.color = pi_color;
  document.getElementsByClassName('ns')[0].style.color = namespace_color;
  var tree = document.getElementById('tree');
  tree.style.fontFamily = font_family;
  tree.style.fontSize = font_size;
  tree.style.color = symbol_color;
  tree.style.backgroundColor = background_color;
    
}

function setSelect(selectEle, selectedVal) {
  for (var i = 0; i < selectEle.children.length; i++) {
	var child = selectEle.children[i];
	if (child.value == selectedVal) {
		child.selected = true;
		break;
	}
  }			  
}

function toggle(id) {
	var ele = document.getElementById(id);
	if(ele.style.display=='none'){
		ele.style.display = 'block';
	} else {
		ele.style.display = 'none';
	}
}

function clickHandler(e) {
	var btnText = e.srcElement.innerText;
	if (btnText == 'Save') {
		save_options();
	} else if (btnText == 'Toggle Help') {
		toggle('help');
	} else if (btnText == 'Advanced') {
		toggle('advanced');
	}
}

document.addEventListener('DOMContentLoaded', function () {
	restore_options();
	document.getElementById('help').style.display = 'none';
	document.getElementById('advanced').style.display = 'none';
	
	var btnList = document.querySelectorAll('button');
	for (var i=0;i<btnList.length;i++) {
		btnList[i].addEventListener('click', clickHandler);
	}
});
