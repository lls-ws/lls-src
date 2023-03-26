/* =========================================================
 * formularioRelatorioMovimentomilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioMovimentomilho(nomeTabela, posicaoItemMenu) {
	
	var urlSearch = 'eventoListaCadastro(1, "' + nomeTabela + '")';
	
	var $formulario = formularioRelatorioNomeData(
		nomeTabela,
		"FazendaProdutor",
		"Produtor",
		"",
		urlSearch
	);
	
	return $formulario;
	
}
