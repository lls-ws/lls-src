/* =========================================================
 * campoCep.js
 * http://lls.net.br/
 * ========================================================= */

function campoCep(id, required) {
	
	var $inputCep = input(id, 'text', 'form-control', '__.___-___', required, 10);
	
	$inputCep.mask("99.999-999");
	
	return $inputCep;
	
}
