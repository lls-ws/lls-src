/* =========================================================
 * setDadosRodapeSaldocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeSaldocafe(rodape) {
	
	eval ("formataDados" + rodape.nomeTabela + "(rodape[0])");
	
	var paragrafo1 = paragrafo('text-center texto', 'texto').append("Total de Fazendas: " + rodape[0].qtd);
	var paragrafo2 = paragrafo('text-right texto', 'texto').append(rodape[0].sacas);
	var paragrafo3 = paragrafo('text-right texto', 'texto').append(rodape[0].peso);
	var paragrafo4 = paragrafo('text-right texto', 'texto').append(rodape[0].media);
	var paragrafo5 = paragrafo('text-right texto', 'texto').append(rodape[0].servico);
	var paragrafo6 = paragrafo('text-right texto', 'texto').append(rodape[0].saida);
	var paragrafo7 = paragrafo('text-right texto', 'texto').append(rodape[0].transferida);
	var paragrafo8 = paragrafo('text-right texto', 'texto').append(rodape[0].total);
	
	var th1 = th().append(paragrafo1);
	var th2 = th().append(paragrafo2);
	var th3 = th().append(paragrafo3);
	var th4 = th().append(paragrafo4);
	var th5 = th().append(paragrafo5);
	var th6 = th().append(paragrafo6);
	var th7 = th().append(paragrafo7);
	var th8 = th().append(paragrafo8);
	
	var trRodapeResumo = tr('totalRodape' + rodape.nomeTabela, '')
		.append(th1).append(th2).append(th3).append(th4)
		.append(th5).append(th6).append(th7).append(th8);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);
	
	var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
	
	if (produtor == 0) th1.attr('colspan', 2);
	else {
		
		if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star")) {
		
			trRodapeResumo.hide();
			
		}
		
	}
	
}
