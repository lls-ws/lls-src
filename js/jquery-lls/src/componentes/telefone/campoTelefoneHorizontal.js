/* =========================================================
 * campoTelefoneHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoTelefoneHorizontal(id, textoLabel, tamanhoCampo, tamanhoLabel, required) {
	
	var $campoTelefoneHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $campoTelefone = campoTelefone(id, required);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	var $idSpan = id + "1";
	
	var $span = span('glyphicon form-control-feedback').attr('id', $idSpan);
	
	$divInput.append($campoTelefone);
	
	$divInput.append($span);
	
	$campoTelefoneHorizontal.append($divInput);
	
	return $campoTelefoneHorizontal;
	
}
