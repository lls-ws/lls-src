/* =========================================================
 * setDadosRodapeSintetizacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeSintetizacafe(rodape) {
	
	eval ("formataDados" + rodape.nomeTabela + "(rodape[0])");
	
	var paragrafo1 = paragrafo('text-center texto', 'texto').append("Total de Cobranças: " + rodape[0].qtd);
	var paragrafo2 = paragrafo('text-right texto', 'texto').append(rodape[0].armazenagem);
	var paragrafo3 = paragrafo('text-right texto', 'texto').append(rodape[0].servicos);
	var paragrafo4 = paragrafo('text-right texto', 'texto').append(rodape[0].total);
	
	var th1 = th().append(paragrafo1);
	var th2 = th().append(paragrafo2);
	var th3 = th().append(paragrafo3);
	var th4 = th().append(paragrafo4);
	
	var trRodapeResumo = tr('totalRodape' + rodape.nomeTabela, '')
		.append(th1).append(th2).append(th3).append(th4);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);
	
	var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
	
	if (produtor == 0) th1.attr('colspan', 3);
	else {
		
		if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			th1.attr('colspan', 2);
			
		}
		else trRodapeResumo.hide();
		
	}
	
}
