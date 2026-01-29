/* =========================================================
 * pegaDadosCampoSqlProcuraUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosCampoSqlProcuraUmidade(id) {
	
	var dados = {
		id: $('#id' + id).val(),
		nome: formataNumeroSql($('#' + id).val())
	}
	
	return dados;
	
}
