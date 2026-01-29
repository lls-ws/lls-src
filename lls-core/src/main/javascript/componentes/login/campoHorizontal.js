/* =========================================================
 * campoHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoHorizontal(id, textoLabel, colClass) {
	
	var $idFormGroup = id + 'FormGroup';
	
	var $divFormGroup = $("<div/>").attr({id: $idFormGroup});
	
	$divFormGroup.addClass('form-group has-feedback');
	
	var $label = label(id, textoLabel, 'control-label texto_label texto_grande');
	
	if (colClass == "2" ) {
		
		colClass = 'col-xs-2 col-md-2';
		
	}
	
	$label.addClass(colClass);
	
	$divFormGroup.append($label);
	
	return $divFormGroup;
	
}
