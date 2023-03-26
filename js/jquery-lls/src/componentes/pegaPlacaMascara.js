/* =========================================================
 * pegaPlacaMascara.js
 * http://lls.net.br/
 * ========================================================= */

function pegaPlacaMascara(numeros) {
	
	carregaCssJs("js/jquery.maskedinput.min.js", "js");
	
	var campoMascara = $("<input>").val(numeros).mask("aaa-9*99");
	
	return campoMascara.val();
	
}
