/* =========================================================
 * pegaDadosCampoSqlProcuraPreco.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosCampoSqlProcuraPreco(id) {
	
	var tipo = $('#id' + id + '2').val();
	
	if (tipo == '') tipo = 0;
	
	var dados = {
		id: tipo,
		nome: $('#' + id).val()
	}
	
	return dados;
	
}
