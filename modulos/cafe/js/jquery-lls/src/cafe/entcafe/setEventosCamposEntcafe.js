/* =========================================================
 * setEventosCamposEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposEntcafe(dados, formulario) {
	
	setEventosCamposCafe(dados, formulario);
	
	addEventoCampoProcuraCafe(dados, formulario, "FazendaProdutor");
	
	formulario.find('#placa' + dados.nomeTabela).prop('disabled', true);
	formulario.find('#ticket' + dados.nomeTabela).prop('disabled', true);
	
}
