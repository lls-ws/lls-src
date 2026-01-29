/* =========================================================
 * limpaDadosFormularioEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioEntmilho() {
	
	$("#idEntmilho").val("0");
	$("#laudoEntmilho").val("");
	$("#tiketEntmilho").val("");
	$("#placaEntmilho").val("");
	$("#brutoEntmilho").val("");
	$("#impurezaEntmilho").val("");
	$("#chochoEntmilho").val("");
	$("#quirelaEntmilho").val("");
	$("#liquidoEntmilho").val("");
	$("#limpezaEntmilho").val("");
	$("#secagemEntmilho").val("");
	$("#cargaEntmilho").val("");
	$("#recepcaoEntmilho").val("");
	$("#totalEntmilho").val("");
	$("#observacaoEntmilho").val("");
	$("#ciloEntmilho").val("");
	
	limpaCampoSqlProcura("FazendaProdutor", "nome");
	
	limpaCampoSqlProcura("Umidade", "numero");
	
}
