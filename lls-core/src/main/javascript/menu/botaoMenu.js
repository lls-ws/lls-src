/* =========================================================
 * botaoMenu.js
 * http://lls.net.br/
 * ========================================================= */

function botaoMenu() {
	
	var $botaoMenu = $("<button/>").addClass('navbar-toggle');
	
	$botaoMenu.attr('type', 'button');
	$botaoMenu.attr('data-toggle', 'collapse');
	$botaoMenu.attr('data-target', '.navbar-collapse');
	
	var $spanBotao1 = span('sr-only').text("toggle navigation");
	var $spanBotao2 = span('icon-bar');
	var $spanBotao3 = span('icon-bar');
	var $spanBotao4 = span('icon-bar');
	
	$botaoMenu.append($spanBotao1);
	$botaoMenu.append($spanBotao2);
	$botaoMenu.append($spanBotao3);
	$botaoMenu.append($spanBotao4);
	
	return $botaoMenu;
	
}
