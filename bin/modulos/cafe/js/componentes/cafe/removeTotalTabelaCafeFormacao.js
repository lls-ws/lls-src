/* =========================================================
 * removeTotalTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaCafeFormacao(dados) {
	
	var idLinha = '#' + dados.nomeTabela.toLowerCase() + '_' + dados.id;
	
	var tdSacas = $('#tbody' + dados.nomeTabela).find(idLinha).find('#tdSacas').find('p');
	var tdPeso = $('#tbody' + dados.nomeTabela).find(idLinha).find('#tdPeso').find('p');
	
	var sacasRemovidas = formataNumeroSacasSql(tdSacas.text());
	var pesoRemovido = formataNumeroSql(tdPeso.text());
	
	dados.sacas = 0;
	dados.peso = 0.00;
	
	var rowCount = $('#tbody' + dados.nomeTabela).find('tr').length;
	
	if (rowCount == 1) $("#tfoottable" + dados.nomeTabela).find("#nomeRodape" + dados.nomeTabela).remove();
	else setTotalTabelaCafeFormacao(dados, sacasRemovidas, pesoRemovido);
	
	$(idLinha).remove();
	
	setTipoRelatorioCafe(dados);
	
	eventoListaCadastroCore(menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem));
	
}
