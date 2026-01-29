/* =========================================================
 * campoNumeroInteiro.js
 * http://lls.net.br/
 * ========================================================= */

function campoNumeroInteiro(id, maxlength) {
	
	if (maxlength == null) maxlength = 10;
	
	var $input = input(id, 'text', 'form-control', '0', false, maxlength);
	
	var mask = '';
	
	for(var i=0; i< maxlength; i++) {
		mask += '9';
	}
	
	$input.inputmask({
	  alias: 'numeric', 
	  allowMinus: false,
	  rightAlign: false,
	  digits: 0,
	  max: mask
	});
	
	return $input;
	
}
