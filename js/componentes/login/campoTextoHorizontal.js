/* =========================================================
 * campoTextoHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoTextoHorizontal(
		id,
		type,
		textoLabel,
		tamanhoCampo,
		tamanhoLabel,
		placeholder,
		required,
		maxlength,
		enabled,
		icon) {
						      
	var $campoTextoHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $input = input(id, type, 'form-control', placeholder, required, maxlength);
	
	if (icon != null) {
	
		var $campoTexto = $("<div/>").addClass('input-group margin-bottom-sm');
	
		var iconImage = $("<i/>").addClass('fa fa-lg fa-' + icon).attr('aria-hidden', true);;
	
		var iconSpan = span('input-group-addon').append(iconImage);
		
		$campoTexto.append(iconSpan).append($input);
		
	}
	
	if (enabled == "disabled") {
		
		$input.attr("disabled", enabled);
		
	}
	
	var $divInput = divInput(id, tamanhoCampo);
	
	var $idSpan = id + "1";
	
	var $span = span('glyphicon form-control-feedback').attr('id', $idSpan);
	
	if (icon != null) $divInput.append($campoTexto);
	else $divInput.append($input);
	
	$divInput.append($span);
	
	$campoTextoHorizontal.append($divInput);
	
	return $campoTextoHorizontal;
	
}
