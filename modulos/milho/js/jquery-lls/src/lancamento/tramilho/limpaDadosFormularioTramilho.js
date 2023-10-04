/* =========================================================
 * limpaDadosFormularioTramilho.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioTramilho() {
	
	$("#liquidoTramilho").val("");
	$("#saldoTramilho").val("");
	$("#observacaoTramilho").val("");
	
	limpaCampoSqlProcura("Milho", "nome");
	
	limpaCampoSqlProcura("FazendaProdutor", "nome");
	
}
