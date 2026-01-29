/* =========================================================
 * input.js
 * http://lls.net.br/
 * ========================================================= */

function input(id, type, classForm, placeholder, required, maxlength) {
	
	var $input = $('<input>').attr({
		id: id,
		name: id,
		type: type,
		placeholder: placeholder,
		required: required,
		maxlength: maxlength
	});
	
	$input.addClass(classForm);
	$input.addClass('input-large');
	
	return $input;
}
