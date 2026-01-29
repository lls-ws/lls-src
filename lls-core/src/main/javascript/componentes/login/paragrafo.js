/* =========================================================
 * paragrafo.js
 * http://lls.net.br/
 * ========================================================= */

function paragrafo(posicaoTexto, corTexto) {
	
	var $paragrafo = $("<p/>").addClass(posicaoTexto);
	
	$paragrafo.addClass(corTexto);
	
	return $paragrafo;
	
}
