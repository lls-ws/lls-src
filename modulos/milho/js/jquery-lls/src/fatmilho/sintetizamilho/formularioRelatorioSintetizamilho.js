/* =========================================================
 * formularioRelatorioSintetizamilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioSintetizamilho(nomeTabela, posicaoItemMenu) {
	
	var urlSearch = 'eventoListaCadastro(1, "' + nomeTabela + '")';
	
	var $divProcura = formularioRelatorioNomeTipo(
		nomeTabela,
		"FazendaProdutor",
		"Produtor",
		urlSearch,
		2
	);
	
	return $divProcura;
	
}
