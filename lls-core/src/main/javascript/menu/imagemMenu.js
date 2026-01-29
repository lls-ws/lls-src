/* =========================================================
 * imagemMenu.js
 * http://lls.net.br/
 * ========================================================= */

function imagemMenu(classe) {
	
	var $imagemMenu = a('', 'javascript:void(0);', 'navbar-brand');
	
	var $imagem = imagem('//lls-ws.github.io/imagens/logo.png', classe, 25, 20);
	
	var $nomeProjeto = nomeProjeto();
	
	var $font = $('<font/>').addClass('texto_label');
	
	$font.append($nomeProjeto);
	
	$imagemMenu.append($imagem);
	$imagemMenu.append($font);
	
	return $imagemMenu;
	
}
