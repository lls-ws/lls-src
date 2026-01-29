/* =========================================================
 * campoImagemHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoImagemHorizontal(id, textoLabel, tamanhoCampo, tamanhoLabel, imagem) {
	
	var $campoHorizontal = campoHorizontal(id, '', tamanhoLabel);
	
	var $divGroup = $('<div />').addClass('input-group');
	
	var texto = $('<span/>').text('	').append($('<a/>').text(textoLabel).addClass('texto'));
	
	$divGroup.append(imagem);
	
	$divGroup.append(texto);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	$divInput.append($divGroup);
	
	$campoHorizontal.append($divInput);
	
	return $campoHorizontal;
	
}
