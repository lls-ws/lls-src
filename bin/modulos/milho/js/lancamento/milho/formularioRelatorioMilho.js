/* =========================================================
 * formularioRelatorioMilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioMilho(nomeTabela, posicaoItemMenu) {
	
	var urlSearch = 'eventoListaCadastro(1, "' + nomeTabela + '")';
	
	var $formulario = formularioRelatorioNome(
		nomeTabela,
		"FazendaProdutor",
		"Produtor",
		urlSearch
	);
	
	return $formulario;
	
}
