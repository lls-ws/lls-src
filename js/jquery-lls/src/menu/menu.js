/* =========================================================
 * menu.js
 * http://lls.net.br/
 * ========================================================= */

function menu(tipo) {
	
	if (tipo == '1') loginInicio();
	
	carregaCssJs("js/jquery-lls/jquery-lls-menuCore.js", "js");
	
	$('.scroll-pane').jScrollPane();
	
	$('.container').empty();
	
	$('.container').append(telaMenu());
	
	painel('');
	
	formularioMenu();
	
	window.history.replaceState('', '', "/");
	
}
