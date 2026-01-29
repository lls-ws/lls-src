/* =========================================================
 * formataNumeroSacasCafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataNumeroSacasCafe(numero) {
	
	var sacas = formataNumero(Number(numero), 1, false, true, "", "");
		
	sacas = sacas.split(',');
	
	return sacas[0] + " scs";
	
}
