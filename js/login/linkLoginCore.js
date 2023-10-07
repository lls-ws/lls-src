/* =========================================================
 * linkLoginCore.js
 * http://lls.net.br/
 * ========================================================= */

function linkLoginCore(icone, url, texto, corTexto) {
	
	var imagem = 'glyphicon glyphicon-' + icone;
	var spanIcone = span(imagem);
	
	if (corTexto == null) corTexto = 'text-danger';
	
	var link = a(
		url,
		'javascript:void(0);',
		corTexto,
		'link'
	).append(spanIcone).append(' ').append(texto);
	
	return paragrafo('text-muted text-center', '').append(link);
	
}
