/* =========================================================
 * campoNumeroHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoNumeroHorizontal(
		id,
		textoLabel,
		tamanhoCampo,
		tamanhoLabel,
		scale,
		precision,
		allowNegative,
		allowZero,
		prefix,
		suffix,
		enabled) {
	
	var $campoNumero = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	if (scale > 0) {
		
		var $input = campoNumero(id, scale, precision, allowNegative, allowZero, prefix, suffix);
		
	}
	else {
		
		var $input = campoNumeroInteiro(id, precision);
		
	}
	
	if (enabled == "disabled") {
		
		$input.attr("disabled", enabled);
		
	}
	
	var $divInput = divInput(id, tamanhoCampo);
	
	var $idSpan = id + "1";
	
	var $span = span('glyphicon form-control-feedback').attr('id', $idSpan);
	
	$divInput.append($input);
	
	$divInput.append($span);
	
	$campoNumero.append($divInput);
	
	return $campoNumero;
	
}
