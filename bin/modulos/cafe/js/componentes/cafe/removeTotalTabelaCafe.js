/* =========================================================
 * removeTotalTabelaCafe.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaCafe(idLinha, nomeTabela) {
	
	idLinha = idLinha.replace('#', '');
	
	var sacas = $('#tbodyLista' + nomeTabela).find('#' + idLinha).find("#tdSacas").find('p').text();
	var peso = $('#tbodyLista' + nomeTabela).find('#' + idLinha).find("#tdPeso").find('p').text();
	
	sacas = formataNumeroSacasSql(sacas);
	peso = formataNumeroSql(peso);
	
	var tfootTotalSacas = $('#tfoottableLista' + nomeTabela)
		.find('#nomeRodape' + nomeTabela).find("#totalSacas").find('p');
	
	var tfootTotalPeso = $('#tfoottableLista' + nomeTabela)
		.find('#nomeRodape' + nomeTabela).find("#totalPeso").find('p');
	
	var totalSacas = tfootTotalSacas.text();
	var totalPeso = tfootTotalPeso.text();
	
	totalSacas = formataNumeroSacasSql(totalSacas);
	totalPeso = formataNumeroSql(totalPeso);
	
	totalSacas = totalSacas - sacas;
	totalPeso = totalPeso - peso;
	
	if (totalSacas > 0) {
		
		totalSacas = formataNumeroSacasCafe(totalSacas);
		totalPeso = formataNumero(totalPeso, 2, false, false, "", " kg");
		
		tfootTotalSacas.empty().text(totalSacas);
		tfootTotalPeso.empty().text(totalPeso);
		
		var tfootTotalQtd = $("#tfoottableLista" + nomeTabela)
			.find("#nomeRodape" + nomeTabela).find('#rodapeTotal' + nomeTabela).find('p');
		
		var totalQtd = tfootTotalQtd.text().split(':');
		
		totalQtd[1] = Number(totalQtd[1]) - 1;
		
		tfootTotalQtd.empty().text(totalQtd[0] + ": " + totalQtd[1]);
		
	}
	else {
		
		$('#tfoottableLista' + nomeTabela).empty();
		
		$('#paginaLista' + nomeTabela).hide();
		
		$('#nomeProcura' + nomeTabela)
			.find('#spanGroupPrint' + nomeTabela + 'FazendaProdutor').hide();
		
	}
	
}
