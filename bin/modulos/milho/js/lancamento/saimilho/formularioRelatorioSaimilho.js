/* =========================================================
 * formularioRelatorioSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioSaimilho(nomeTabela, posicaoItemMenu) {
	
	var urlSearch = 'eventoListaCadastro(1, "' + nomeTabela + '")';
	
	var $formulario = formularioRelatorioNomeDataAdd(
		nomeTabela,
		"FazendaProdutor",
		"Produtor",
		urlSearch,
		posicaoItemMenu
	);
	
	return $formulario;
	
}
