/* =========================================================
 * campoCep.js
 * http://lls.net.br/
 * ========================================================= */

function campoCep(id, required) {
	
	carregaCssJs("js/jquery.maskedinput.min.js", "js");
	
	var $input = input(id, 'text', 'form-control', '__.___-___', required, 10);
	
	$input.mask("99.999-999");
	
	return $input;
	
}
