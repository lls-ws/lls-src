/* =========================================================
 * setDadosRodapeFaturacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeFaturacafe(rodape) {
	
	eval ("formataDados" + rodape.nomeTabela + "(rodape[0])");
	
	var paragrafo1 = paragrafo('text-center texto', 'texto').append("Total de Faturamentos: " + rodape[0].qtd);
	var paragrafo2 = paragrafo('text-right texto', 'texto').append(rodape[0].anterior);
	var paragrafo3 = paragrafo('text-right texto', 'texto').append(rodape[0].entradas);
	var paragrafo4 = paragrafo('text-right texto', 'texto').append(rodape[0].saidas);
	var paragrafo5 = paragrafo('text-right texto', 'texto').append(rodape[0].quebras);
	var paragrafo6 = paragrafo('text-right texto', 'texto').append(rodape[0].acrescimos);
	var paragrafo7 = paragrafo('text-right texto', 'texto').append(rodape[0].recebidas);
	var paragrafo8 = paragrafo('text-right texto', 'texto').append(rodape[0].emitidas);
	var paragrafo9 = paragrafo('text-right texto', 'texto').append(rodape[0].saldo);
	var paragrafo10 = paragrafo('text-right texto', 'texto').append(rodape[0].armazenagem);
	var paragrafo11 = paragrafo('text-right texto', 'texto').append(rodape[0].servicos);
	var paragrafo12 = paragrafo('text-right texto', 'texto').append(rodape[0].total);
	
	var th1 = th().append(paragrafo1);
	var th2 = th().append(paragrafo2);
	var th3 = th().append(paragrafo3);
	var th4 = th().append(paragrafo4);
	var th5 = th().append(paragrafo5);
	var th6 = th().append(paragrafo6);
	var th7 = th().append(paragrafo7);
	var th8 = th().append(paragrafo8);
	var th9 = th().append(paragrafo9);
	var th10 = th().append(paragrafo10);
	var th11 = th().append(paragrafo11);
	var th12 = th().append(paragrafo12);
	
	var trRodapeResumo = tr('totalRodape' + rodape.nomeTabela, '')
		.append(th1).append(th2).append(th3).append(th4)
		.append(th5).append(th6).append(th7).append(th8)
		.append(th9).append(th10).append(th11).append(th12);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);
	
	var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
	
	if (produtor == 0) th1.attr('colspan', 3);
	else {
		
		if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			th1.attr('colspan', 2);
			
		}
		
	}
	
}
