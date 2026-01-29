/* =========================================================
 * formularioRelatorioNomeTipoCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeTipoCore(dados, nomeTabelaProcura, nomeProcura, tipo, urlSearch) {
	
	if (urlSearch == null) urlSearch = 'eventoListaCadastroCore(' + JSON.stringify(dados) + ')';
	
	var formularioTipo = formularioRelatorioTipo(dados.nomeTabela, urlSearch, tipo);
	
	var divProcuraTipo = $('<div/>')
		.attr('id', 'tipoProcura' + dados.nomeTabela)
		.append(formularioTipo);
	
	var divProcuraNome = formularioRelatorioNomeCore(
		dados,
		nomeTabelaProcura,
		nomeProcura,
		urlSearch
	);
	
	var divProcura = $('<div/>')
		.attr('id', 'divProcura' + dados.nomeTabela)
		.addClass('row');
		
	var divProcura1 = $('<div/>').attr('id', 'nomeProcura' + dados.nomeTabela)
		.addClass('col-md-6')
		.append(divProcuraNome);
		
	var divProcura2 = $('<div/>').attr('id', 'dataProcura' + dados.nomeTabela)
		.addClass('col-md-6')
		.append(divProcuraTipo);
	
	divProcura.append(divProcura1).append(divProcura2);
	
	return divProcura;
	
}
