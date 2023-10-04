/* =========================================================
 * formularioRelatorioSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioSaimilho(nomeTabela, posicaoItemMenu) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-milho.js", "js");
	
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
