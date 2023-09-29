/* =========================================================
 * formularioRelatorioNomeDataTipo.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeDataTipo(nomeTabela, nomeTabelaProcura, nomeProcura, urlSearch,
										 posicaoItemMenu, tipo, nomeTabelaLancamento) {
	
	var formularioTipo = formularioRelatorioTipo(nomeTabela, urlSearch, tipo);
	
	var divProcuraTipo = $('<div/>')
		.attr('id', 'tipoProcura' + nomeTabela)
		.addClass('col-md-6')
		.append(formularioTipo);
	
	var divProcura = formularioRelatorioNomeDataAdd(
		nomeTabela,
		nomeTabelaProcura,
		nomeProcura,
		urlSearch,
		posicaoItemMenu,
		nomeTabelaLancamento
	);
	
	divProcura.find('#nomeProcura' + nomeTabela)
		.removeClass('col-md-6')
		.addClass('col-md-12');
	
	divProcura.append(divProcuraTipo);
	
	return divProcura;
	
}
