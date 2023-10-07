/* =========================================================
 * formularioRelatorioNomeTipo.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeTipo(nomeTabela, nomeTabelaProcura, nomeProcura, urlSearch, tipo) {
	
	var $formularioRelatorioNome = formularioRelatorioNome(
		nomeTabela,
		nomeTabelaProcura,
		nomeProcura,
		urlSearch
	);
	
	var $formularioRelatorioTipo = formularioRelatorioTipo(nomeTabela, urlSearch, tipo);
	
	var $divProcuraNome = $('<div/>')
		.attr('id', 'nomeProcura' + nomeTabela)
		.addClass('col-md-6')
		.append($formularioRelatorioNome);
	
	var $divProcuraTipo = $('<div/>')
		.attr('id', 'tipoProcura' + nomeTabela)
		.addClass('col-md-6')
		.append($formularioRelatorioTipo);
	
	var $divProcura = $('<div/>')
		.attr('id', 'divProcura' + nomeTabela)
		.addClass('row')
		.append($divProcuraNome)
		.append($divProcuraTipo);
	
	return $divProcura;
	
}
