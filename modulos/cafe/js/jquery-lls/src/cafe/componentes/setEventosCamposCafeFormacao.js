/* =========================================================
 * setEventosCamposDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposCafeFormacao(dados, formulario, tipo) {
	
	setEventosCamposCafe(dados, formulario, tipo);
	
	if (tipo == 1) {
	
		var rule = {};
	
		if (dados.nomeTabela = "Lote") rule = {checkDesdobrasLote: true};
		else rule = {checkDesdobrasDespejo: true};
		
		formulario.find('#id' + dados.nomeTabela).rules('add', rule);

	}
		
	setValoresCafeFormacao(dados, formulario, tipo);
	
	addEventoCampoProcuraCafe(dados, formulario, dados.campoProcura);
	
}
