/* =========================================================
 * formularioRelatorioServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioServicomilho(nomeTabela, posicaoItemMenu) {
	
	var urlSearch = 'eventoListaCadastro(1, "' + nomeTabela + '")';
	
	var $formulario = formularioRelatorioNomeDataTipo(
		nomeTabela,
		"FazendaProdutor",
		"Produtor",
		urlSearch,
		posicaoItemMenu,
		1
	);
	
	return $formulario;
					
}
