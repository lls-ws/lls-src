/* =========================================================
 * imagem.js
 * http://lls.net.br/
 * ========================================================= */

function imagem(url, classe, width, height) {
	
	var $imagem = $('<img>');
	
	$imagem.attr('src', url);
	
	$imagem.attr('class', classe);
	
	$imagem.width(width);
	
	$imagem.height(height);
	
	return $imagem;
	
}
