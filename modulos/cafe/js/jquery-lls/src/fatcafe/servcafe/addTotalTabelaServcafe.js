/* =========================================================
 * addTotalTabelaServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function addTotalTabelaServcafe(dados) {
	
	var rowCount = $('#tbody' + dados.nomeTabela).find('tr').length;
	
	if (rowCount == 1) {
		
		dados["qtd"] = 1;
		dados["total"] = formataNumeroSql(dados.valor);
		
		eval ('setDadosRodape' + dados.nomeTabela + '(dados)');
		
	}
	else eval ('setTotalTabela' + dados.nomeTabela + '(dados, 0)');
	
}
