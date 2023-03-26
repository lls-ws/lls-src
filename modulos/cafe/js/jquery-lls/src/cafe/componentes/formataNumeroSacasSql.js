/* =========================================================
 * formataNumeroSacasSql.js
 * http://lls.net.br/
 * ========================================================= */

function formataNumeroSacasSql(numero) {
	
	return Number(numero.replace(' scs', '').replace('.', ''));
	
}
