/* =========================================================
 * pegaDadosCampoSqlProcuraLote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosCampoSqlProcuraLote(dados, id) {
	
	var valores = pegaDadosCampoSqlProcuraCafe(id);
	
	valores.id = $('#idnomeProcuraCadastro' + dados.nomeTabelaCadastro + 'FazendaProdutor').val();
	
	return valores;
	
}
