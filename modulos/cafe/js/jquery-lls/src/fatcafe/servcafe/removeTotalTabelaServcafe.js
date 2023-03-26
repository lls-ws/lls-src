/* =========================================================
 * removeTotalTabelaServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaServcafe(dados) {
	
	var idLinha = '#' + dados.nomeTabela.toLowerCase() + '_' + dados.id;
	
	var tdValor = $('#tbody' + dados.nomeTabela).find(idLinha).find('#tdValor').find('p');
	
	var valorRemovido = formataNumeroSql(tdValor.text());
	
	dados.valor = 0.00;
	
	var rowCount = $('#tbody' + dados.nomeTabela).find('tr').length;
	
	if (rowCount == 1) $("#tfoottable" + dados.nomeTabela).find("#nomeRodape" + dados.nomeTabela).remove();
	else eval ('setTotalTabela' + dados.nomeTabela + '(dados, valorRemovido)');
	
	$(idLinha).remove();
	
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).empty();
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).remove();
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).dialog( "close" );
	
}
