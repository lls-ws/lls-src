/* =========================================================
 * formularioRelatorioEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioEntmilho(nomeTabela, posicaoItemMenu) {
	
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
