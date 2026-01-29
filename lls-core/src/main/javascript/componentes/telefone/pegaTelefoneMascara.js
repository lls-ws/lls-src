/* =========================================================
 * pegaTelefoneMascara.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTelefoneMascara(telefoneNumeros) {
	
	if(telefoneNumeros.length == 11) {
	
		var telefoneMascara = $("<input>").val(telefoneNumeros).mask("(99) 99999-9999");
	
	} else {
		
		var telefoneMascara = $("<input>").val(telefoneNumeros).mask("(99) 9999-9999");
			
	}
	
	return telefoneMascara.val();
	
}
