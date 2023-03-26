/* =========================================================
 * pegaCepMascara.js
 * http://lls.net.br/
 * ========================================================= */

function pegaCepMascara(numeros) {
	
	carregaCssJs("js/jquery.maskedinput.min.js", "js");
	
	var campoMascara = $("<input>").val(numeros).mask("99.999-999");
	
	return campoMascara.val();
	
}
