/* =========================================================
 * formataNumero.js
 * http://lls.net.br/
 * ========================================================= */

function formataNumero(numero, scale, allowNegative, allowZero, prefix, suffix) {
	
	carregaCssJs("js/jquery.maskMoney.min.js", "js");
	
	var $input = input('formataNumero', 'text', 'form-control', '', false, null);
	
	$input.maskMoney({
		prefix: prefix,
		allowNegative: allowNegative,
		allowZero: allowZero,
		thousands: '.',
		decimal: ',',
		affixesStay: true,
		precision: scale
	});
	
	return $input.maskMoney('mask', numero).val() + suffix;
	
}
