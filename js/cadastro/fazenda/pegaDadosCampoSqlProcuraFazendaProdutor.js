/* =========================================================
 * pegaDadosCampoSqlProcuraFazendaProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosCampoSqlProcuraFazendaProdutor(id) {
	
	var dados = {
		id: $('#id' + id).val(),
		nome: $('#' + id).val()
	}
	
	return dados;
	
}
