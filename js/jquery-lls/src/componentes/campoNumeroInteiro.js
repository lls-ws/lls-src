/* =========================================================
 * campoNumeroInteiro.js
 * http://lls.net.br/
 * ========================================================= */

function campoNumeroInteiro(id, maxlength) {
	
	carregaCssJs("js/jquery.decimalMask.min.js", "js");
	
	if (maxlength == null) maxlength = 10;
	
	var $input = input(id, 'text', 'form-control', '0', false, maxlength);
	
	var mask = '';
	
	for(var i=0; i< maxlength; i++) {
		mask += '9';
	}
	
	$input.decimalMask(mask);
	
	return $input;
	
}
