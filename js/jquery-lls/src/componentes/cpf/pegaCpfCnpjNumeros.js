/* =========================================================
 * pegaCpfCnpjNumeros.js
 * http://lls.net.br/
 * ========================================================= */

function pegaCpfCnpjNumeros(valorComMascara) {
						      
	var $numeros = valorComMascara.replace(/\./g,'').replace(/-/g,'').replace(/\//g,'');
	
	return $numeros;
	
}
