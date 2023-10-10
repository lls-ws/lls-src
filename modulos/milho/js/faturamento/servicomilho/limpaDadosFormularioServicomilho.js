/* =========================================================
 * limpaDadosFormularioServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioServicomilho() {
	
	$("#idServicomilho").val("0");
	$("#liquidoServicomilho").val("");
	$("#valorServicomilho").val("");
	
	limpaCampoSqlProcura("FazendaProdutor", "nome");
	
	limpaCampoSqlProcura("Preco", "nome");
	
}
