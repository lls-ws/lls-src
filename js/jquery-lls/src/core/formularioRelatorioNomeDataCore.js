/* =========================================================
 * formularioRelatorioNomeDataCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeDataCore(dados, nomeTabelaProcura, nomeProcura, urlAdd, urlSearch) {
	
	if (urlSearch == null) urlSearch = 'eventoListaCadastroCore(' + JSON.stringify(dados) + ')';
	
	var divProcuraNome = formularioRelatorioNomeCore(
		dados,
		nomeTabelaProcura,
		nomeProcura,
		urlSearch
	);
	
	var divProcuraData = formularioRelatorioData(dados.nomeTabela, urlAdd, urlSearch);
	
	var divProcura = $('<div/>')
		.attr('id', 'divProcura' + dados.nomeTabela)
		.addClass('row');
		
	var divProcura1 = $('<div/>').attr('id', 'nomeProcura' + dados.nomeTabela)
		.addClass('col-md-6')
		.append(divProcuraNome);
		
	var divProcura2 = $('<div/>').attr('id', 'dataProcura' + dados.nomeTabela)
		.addClass('col-md-6')
		.append(divProcuraData);
	
	divProcura.append(divProcura1).append(divProcura2);
	
	return divProcura;
	
}
