/* =========================================================
 * campoOculto.js
 * http://lls.net.br/
 * ========================================================= */

function campoOculto(id, value) {
	
	var campo = input(id, 'hidden');
	
	campo.val(value);
	
	return campo;
	
}
