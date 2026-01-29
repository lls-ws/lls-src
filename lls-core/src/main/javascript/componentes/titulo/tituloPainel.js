/* =========================================================
 * tituloPainel.js
 * http://lls.net.br/
 * ========================================================= */

function tituloPainel(titulo, corLabel, idTitulo) {
	
	var $idTitulo = 'legend' + idTitulo;
	
	var $legend = $("<legend/>").attr('id', $idTitulo);
	
	var $texto = paragrafo('text-center texto_grande texto_label', corLabel);
	
	$texto.text(titulo);
	
	$legend.append($texto);
	
	return $legend;
	
}
