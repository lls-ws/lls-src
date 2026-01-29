/* =========================================================
 * limpaCampoSqlProcura.js
 * http://lls.net.br/
 * ========================================================= */

function limpaCampoSqlProcura(nomeTabela, tipo) {
	
	$("#id" + tipo + "SqlProcura" + nomeTabela).val("0");
	$("#" + tipo + "SqlProcura" + nomeTabela).removeAttr('disabled').val("");
	
}
