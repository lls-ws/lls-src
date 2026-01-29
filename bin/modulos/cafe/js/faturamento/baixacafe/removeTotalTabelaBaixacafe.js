/* =========================================================
 * removeTotalTabelaBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaBaixacafe(dados) {
	
	dados.nomeTabelaCadastro = dados.nomeTabelaLancamento;
	
	setTipoRelatorioCafe(dados);
	
	eventoListaCadastroCore(menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem));
	
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).empty();
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).remove();
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).dialog( "close" );
	
}
