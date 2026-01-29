/* =========================================================
 * campoTexto.js
 * http://lls.net.br/
 * ========================================================= */

function campoTexto(id, type, textoLabel, placeholder, required,
					tamanhoCampo, maxlength, icon) {
	
	var $campoTexto = $("<div/>").addClass('input-group margin-bottom-sm');
	
	var $label = label(id, textoLabel, 'texto_label');
		
	var iconImage = $("<i/>").attr('id', id + 'Image')
		.attr('aria-hidden', true)
		.addClass('fa fa-lg ' + icon);
	
	var iconSpan = span('input-group-addon').append(iconImage);
	
	var $input = input(id, type, 'form-control', placeholder, required, maxlength);	
	
	if (tamanhoCampo >= 0) {
				
		var $tamanhoCampo = 'col-md-' + tamanhoCampo;
		
		$campoTexto.addClass('row');
		
		var $divForm = $("<div/>").addClass('form-group');
		
		$divForm.addClass($tamanhoCampo);
		
		$divForm.append($label);
		
		$divForm.append($input);
		
		$campoTexto.append($divForm);
		
		return $campoTexto;
		
	}
	else {
		
		$campoTexto.append($label);
		
		$campoTexto.append(iconSpan);
		
		$campoTexto.append($input);
		
		return $campoTexto;
		
	}
		
}
