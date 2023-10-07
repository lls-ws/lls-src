/* =========================================================
 * campoNumero.js
 * http://lls.net.br/
 * ========================================================= */

function campoNumero(id, scale, precision, allowNegative, allowZero, prefix, suffix) {
	
	var placeholder = prefix + "0,00" + suffix;
	
	var totalPontos = 0;
		
	if (precision < 6) {
		
		totalPontos = 1;
		
	}
	else if (precision < 9) {
	
		totalPontos = 2;
	
	}
	else if (precision < 12) {
	
		totalPontos = 3;
	
	}
	else if (precision < 15) {
		
		totalPontos = 4;
		
	}
	else {
	
		totalPontos = 5;
	
	}

	var maxlength = Number(precision) + Number(totalPontos) + Number(prefix.length) + Number(suffix.length);
	
	var $input = input(id, 'text', 'form-control', placeholder, false, maxlength);
	
	$input.maskMoney({
		suffix: suffix,
		prefix: prefix,
		allowNegative: allowNegative,
		allowZero: allowZero,
		thousands: '.',
		decimal: ',',
		affixesStay: true,
		precision: scale
	});
	
	return $input;
	
}
