/* =========================================================
 * pegaDadosCampoSqlProcuraCafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosCampoSqlProcuraCafe(id) {
	
	var dados = {
		id: $('#id' + id).val(),
		nome: $('#' + id).val()
	}
	
	return dados;
	
}
