/* =========================================================
 * pegaTelefoneNumeros.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTelefoneNumeros(valorComMascara) {
						      
	var $numeros = valorComMascara.replace(/\(/g,'').replace(/\)/g,'').replace(/\ /g,'').replace(/-/g,'');
	
	return $numeros;
	
}
