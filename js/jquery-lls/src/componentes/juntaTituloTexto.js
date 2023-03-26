/* =========================================================
 * juntaTituloTexto.js
 * http://lls.net.br/
 * ========================================================= */

function juntaTituloTexto(titulo, texto) {
	
	var $textoTitulo = '';
	
	if (texto != '' && texto != null) {
					
		$textoTitulo = titulo + ': <b>' + texto + '</b>';
		
	}

	return $textoTitulo;
	
}
