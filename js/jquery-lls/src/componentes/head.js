/* =========================================================
 * head.js
 * http://lls.net.br/
 * ========================================================= */

function head() {
	
	var $link = $('<link />');
	 
	$link.attr('rel', 'icon');
	$link.attr('href', 'imagens/favicon.ico');
	
	var $meta1 = '<meta name="author" content="Leandro Luiz">';
	var $meta2 = '<meta charset="ISO-8859-1">';
	var $meta3 = '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
	var $meta4 = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">';
	var $meta5 = '<meta name="description" content="' + nomeProjeto() + '">';
	
	var $title = title();
	
	$('head').append($link);
	$('head').append($meta1);
	$('head').append($meta2);
	$('head').append($meta3);
	$('head').append($meta4);
	$('head').append($meta5);
	$('head').append($title);
	
}
