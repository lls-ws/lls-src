/* =========================================================
 * limpaDadosFormularioSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioSaimilho() {
	
	$("#idSaimilho").val("0");
	$("#laudoSaimilho").val("");
	$("#tiketSaimilho").val("");
	$("#placaSaimilho").val("");
	$("#liquidoSaimilho").val("");
	$("#saldoSaimilho").val("");
	$("#observacaoSaimilho").val("");
	$("#ciloSaimilho").val("");
	$("#destinoSaimilho").val("");
	
	limpaCampoSqlProcura("Milho", "nome");
	
}
