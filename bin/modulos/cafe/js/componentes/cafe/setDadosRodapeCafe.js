/* =========================================================
 * setDadosRodapeCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeCafe(rodape) {
	
	var titulo = eval ("pegaNomeColunas" + rodape.nomeTabela + "(3)");
	
	titulo = titulo.split(' ');
	
	var paragrafo1 = paragrafo('text-center', 'texto').append("Total de " + titulo[0] + "s: " + rodape[0].qtd);
	var paragrafo2 = paragrafo('text-right', 'texto').append(formataNumeroSacasCafe(rodape[0].sacas));
	var paragrafo3 = paragrafo('text-right', 'texto').append(formataNumero(rodape[0].peso, 2, false, false, "", " kg"));
	
	var th1 = th().append(paragrafo1).attr('id', 'rodapeTotal' + rodape.nomeTabela);
	var th2 = th().append(paragrafo2).attr('id', 'totalSacas');
	var th3 = th().append(paragrafo3).attr('id', 'totalPeso');
		
	var trRodape = tr('nomeRodape' + rodape.nomeTabela, '')
		.append(th1).append(th2).append(th3);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodape);
	
	var totalColunas = $('#tableLista' + rodape.nomeTabela).find('thead th:visible').length;
	
	var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
	
	totalColunas = totalColunas - 2;
	
	if (produtor == 0) th1.attr('colspan', totalColunas);
	else {
		
		if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			th1.attr('colspan', totalColunas);
			
		}
		else th1.attr('colspan', totalColunas);
		
	}
	
}
