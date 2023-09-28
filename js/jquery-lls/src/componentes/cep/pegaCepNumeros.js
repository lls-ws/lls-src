/* =========================================================
 * pegaCepNumeros.js
 * http://lls.net.br/
 * ========================================================= */

function pegaCepNumeros(valorComMascara) {
						      
	return valorComMascara.replace(/\./g,'').replace(/-/g,'');
	
}
