/* =========================================================
 * formularioMenu.js
 * http://lls.net.br/
 * ========================================================= */

function formularioMenu() {
	
	var $divCenter = $('<div/>').addClass('container_menu container_center');
	
	var $formulario = formularioHorizontal('menu', 'form-menu form_center');
	
	var $paragrafo = paragrafo('text-center', '');
	
	var $imagem = imagem('imagens/painel.png', 'imagem-painel', 100, 100);
	
	$paragrafo.append($imagem);
	
	$formulario.append($paragrafo);
	
	$divCenter.append($formulario);
	
	mudaPainel($divCenter, '0');
	
}
