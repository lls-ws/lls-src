/* =========================================================
 * formularioRelatorioNomeData.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeData(nomeTabela, nomeTabelaProcura, nomeProcura, urlAdd, urlSearch) {
	
	var divProcuraNome = formularioRelatorioNome(
		nomeTabela,
		nomeTabelaProcura,
		nomeProcura,
		urlSearch
	);
	
	var divProcuraData = formularioRelatorioData(nomeTabela, urlAdd, urlSearch);
	
	var divProcura = $('<div/>')
		.attr('id', 'divProcura' + nomeTabela)
		.addClass('row');
		
	var divProcura1 = $('<div/>').attr('id', 'nomeProcura' + nomeTabela)
		.addClass('col-md-6')
		.append(divProcuraNome);
		
	var divProcura2 = $('<div/>').attr('id', 'dataProcura' + nomeTabela)
		.addClass('col-md-6')
		.append(divProcuraData);
	
	divProcura.append(divProcura1).append(divProcura2);
	
	return divProcura;
	
}
