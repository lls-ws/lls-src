/* =========================================================
 * campoAreaTextoHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoAreaTextoHorizontal(id, label, tamanhoCampo, tamanhoLabel, linhas, maxlength, placeholder) {
	
	var $campoHorizontal = campoHorizontal(id, label, tamanhoCampo, tamanhoLabel);
	
	var $textarea = campoAreaTexto(id, placeholder, linhas, maxlength);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	$divInput.append($textarea);
	
	$campoHorizontal.append($divInput);
	
	return $campoHorizontal;
	
}
