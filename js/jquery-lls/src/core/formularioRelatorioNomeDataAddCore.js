/* =========================================================
 * formularioRelatorioNomeDataAddCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeDataAddCore(dados, nomeTabelaProcura, nomeProcura, urlSearch) {
	
	if (urlSearch == null) urlSearch = 'eventoListaCadastroCore(' + JSON.stringify(dados) + ')';
	
	dados.click = "click-off";
	
	var urlAdd = 'novoCadastroCore(' + JSON.stringify(dados) + ')';
	
	dados.click = "click";
	
	return formularioRelatorioNomeDataCore(
		dados,
		nomeTabelaProcura,
		nomeProcura,
		urlAdd,
		urlSearch
	);
		
}
