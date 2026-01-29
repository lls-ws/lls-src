/* =========================================================
 * divDialog.js
 * http://lls.net.br/
 * ========================================================= */

function divDialog(textoMensagem, corTexto) {
	
	textoMensagem = textoMensagem.replace(/\n/g, "<br />");
	
	var $icone = span('glyphicon glyphicon-info-sign');
	
	var $paragrafo = paragrafo('text-center', corTexto)
		.append($icone)
		.append(' ')
		.append(textoMensagem);
	
	return $divDialog = $("<div/>").attr('id', 'divDialog')
								   .append($paragrafo);
		
}
