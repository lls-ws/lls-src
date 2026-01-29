/* =========================================================
 * formularioObservacaoCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioObservacaoCore(nomeTabela, id, tamanho) {
	
	var areaTexto = campoAreaTexto(id + nomeTabela, '', tamanho, 255);
	
	return $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8 col-md-offset-2")
		.append(areaTexto);
	
}
