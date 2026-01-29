/* =========================================================
 * formularioRelatorioNomeDataAdd.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeDataAdd(nomeTabela, nomeTabelaProcura, nomeProcura, urlSearch,
										posicaoItemMenu, nomeTabelaLancamento) {
	
	var urlAdd = 'novoCadastro("' + nomeTabela + '", "click-off", "' +
		posicaoItemMenu + '", "0", "' + nomeTabelaLancamento + '")';
	
	return formularioRelatorioNomeData(
		nomeTabela,
		nomeTabelaProcura,
		nomeProcura,
		urlAdd,
		urlSearch
	);
		
}
