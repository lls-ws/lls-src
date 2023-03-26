/* =========================================================
 * addTotalTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function addTotalTabelaCafeFormacao(dados) {
	
	var rowCount = $('#tbody' + dados.nomeTabela).find('tr').length;
	
	if (rowCount == 1) {
		
		dados["totalQtd"] = 1;
		dados["totalSacas"] = formataNumeroSacasSql(dados.sacas);
		dados["totalPeso"] = formataNumeroSql(dados.peso);
		
		setDadosRodapeCafeFormacao(dados);
		
	}
	else setTotalTabelaCafeFormacao(dados, 0, 0);
	
}
