/* =========================================================
 * formataNumero.js
 * http://lls.net.br/
 * ========================================================= */

function formataNumero(numero, scale, allowNegative, allowZero, prefix, suffix) {
	
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
