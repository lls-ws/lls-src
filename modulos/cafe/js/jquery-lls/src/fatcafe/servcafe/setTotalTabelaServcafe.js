/* =========================================================
 * setTotalTabelaServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setTotalTabelaServcafe(dados, valorAnterior) {
	
	var tfootTotal = $("#tfoottable" + dados.nomeTabela)
		.find("#nomeRodape" + dados.nomeTabela).find('#total').find('p');
	
	var total = formataNumeroSql(tfootTotal.text());
	
	total = total - valorAnterior + formataNumeroSql(dados.valor);
	
	total = formataNumero(total, 2, false, false, "R$ ", "");
	
	tfootTotal.empty().text(total);
	
	if (valorAnterior == 0 || dados.valor == 0) {
		
		var tfootQtd = $("#tfoottable" + dados.nomeTabela)
			.find("#nomeRodape" + dados.nomeTabela).find('#qtd').find('p');
		
		var qtd = tfootQtd.text().split(':');
		
		if (valorAnterior == 0) qtd[1] = Number(qtd[1]) + 1;
		else qtd[1] = Number(qtd[1]) - 1;
		
		tfootQtd.empty().text(qtd[0] + ": " + qtd[1]);
		
	}
	
}
