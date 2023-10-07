/* =========================================================
 * formularioRelatorioNomeDataTipoCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeDataTipoCore(dados, nomeTabelaProcura, nomeProcura, tipo, urlSearch) {
	
	if (urlSearch == null) urlSearch = 'eventoListaCadastroCore(' + JSON.stringify(dados) + ')';
	
	var formularioTipo = formularioRelatorioTipo(dados.nomeTabela, urlSearch, tipo);
	
	var divProcuraTipo = $('<div/>')
		.attr('id', 'tipoProcura' + dados.nomeTabela)
		.addClass('col-md-6')
		.append(formularioTipo);
	
	var divProcura = formularioRelatorioNomeDataAddCore(
		dados,
		nomeTabelaProcura,
		nomeProcura,
		urlSearch
	);
	
	divProcura.find('#nomeProcura' + dados.nomeTabela)
		.removeClass('col-md-6')
		.addClass('col-md-12');
	
	divProcura.append(divProcuraTipo);
	
	return divProcura;
	
}
