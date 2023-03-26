/* =========================================================
 * removeTotalTabelaLote.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaLote(dados) {
	
	dados.nomeTabelaCadastro = dados.nomeTabelaLancamento;
	
	removeTotalTabelaCafeFormacao(dados);
	
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).empty();
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).remove();
	$('#divDialogVisualiza' + dados.nomeTabelaLancamento).dialog( "close" );
	
}
