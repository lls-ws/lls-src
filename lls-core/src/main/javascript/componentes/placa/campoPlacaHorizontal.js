/* =========================================================
 * campoPlacaHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoPlacaHorizontal(id, textoLabel, tamanhoCampo, tamanhoLabel, required) {
	
	var $campoPlacaHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $campoPlaca = campoPlaca(id, required);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	$divInput.append($campoPlaca);
	
	$campoPlacaHorizontal.append($divInput);
	
	return $campoPlacaHorizontal;
	
}
