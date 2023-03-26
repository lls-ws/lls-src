/* =========================================================
 * setEventosCamposTralote.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposTralote(dados, formulario) {
	
	setEventoDesdobrasCafeFormacao(dados, formulario);
	
	var rule = {checkLotesTralote: true};
	
	formulario.find('#nomeTabela' + dados.nomeTabelaLancamento[0])
		.rules('add', rule);
		
}
