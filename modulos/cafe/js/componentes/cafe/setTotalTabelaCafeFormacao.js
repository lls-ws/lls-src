/* =========================================================
 * setTotalTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function setTotalTabelaCafeFormacao(dados, sacasAnterior, pesoAnterior) {
	
	var tfootTotalSacas = $("#tfoottable" + dados.nomeTabela)
		.find("#nomeRodape" + dados.nomeTabela).find('#totalSacas').find('p');
		
	var tfootTotalPeso = $("#tfoottable" + dados.nomeTabela)
		.find("#nomeRodape" + dados.nomeTabela).find('#totalPeso').find('p');
	
	var totalSacas = formataNumeroSacasSql(tfootTotalSacas.text());
	var totalPeso = formataNumeroSql(tfootTotalPeso.text());
	
	totalSacas = totalSacas - sacasAnterior + Number(dados.sacas);
	totalPeso = totalPeso - pesoAnterior + formataNumeroSql(dados.peso);
	
	totalSacas = formataNumeroSacasCafe(totalSacas);
	totalPeso = formataNumero(totalPeso, 2, false, false, "", " kg");
	
	tfootTotalSacas.empty().text(totalSacas);
	tfootTotalPeso.empty().text(totalPeso);
	
	if (sacasAnterior == 0 || dados.sacas == 0) {
		
		var tfootTotalQtd = $("#tfoottable" + dados.nomeTabela)
			.find("#nomeRodape" + dados.nomeTabela).find('#totalQtd').find('p');
		
		var totalQtd = tfootTotalQtd.text().split(':');
		
		if (sacasAnterior == 0) totalQtd[1] = Number(totalQtd[1]) + 1;
		else totalQtd[1] = Number(totalQtd[1]) - 1;
		
		tfootTotalQtd.empty().text(totalQtd[0] + ": " + totalQtd[1]);
		
	}
	
}
