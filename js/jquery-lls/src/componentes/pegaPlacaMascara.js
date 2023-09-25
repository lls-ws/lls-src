/* =========================================================
 * pegaPlacaMascara.js
 * http://lls.net.br/
 * ========================================================= */

function pegaPlacaMascara(numeros) {
	
	var campoMascara = $("<input>").val(numeros).mask("aaa-9*99");
	
	return campoMascara.val();
	
}
