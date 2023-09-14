/* =========================================================
 * pegaCpfCnpjMascara.js
 * http://lls.net.br/
 * ========================================================= */

function pegaCpfCnpjMascara(numeros) {
	
	if (numeros.length == 11) {
	
		var $campoMascara = $("<input>").val(numeros).mask("999.999.999-99");
		
	}
	else {
		
		var $campoMascara = $("<input>").val(numeros).mask("99.999.999/9999-99");
		
	}
	
	return $campoMascara.val();
	
}
