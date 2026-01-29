/* =========================================================
 * pegaDadosCampoSqlProcuraMilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosCampoSqlProcuraMilho(id) {
	
	var dados = {
		id: $('#id' + id).val(),
		nome: $('#' + id).val()
	}
	
	return dados;
	
}
