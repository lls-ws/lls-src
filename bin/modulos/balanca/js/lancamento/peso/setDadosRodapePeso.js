/* =========================================================
 * setDadosRodapePeso.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapePeso(rodape) {
	
	eval ("formataDados" + rodape.nomeTabela + "(rodape[0])");
	
	var paragrafo1 = paragrafo('text-center', 'texto').append("Total de Pesagens: " + rodape[0].qtd);
	var paragrafo2 = paragrafo('text-right', 'texto texto_grande').append(rodape[0].tara);
	var paragrafo3 = paragrafo('text-right', 'texto texto_grande').append(rodape[0].bruto);
	var paragrafo4 = paragrafo('text-right', 'texto texto_grande').append(rodape[0].liquido);
	
	var th1 = th().append(paragrafo1).attr('id', 'qtd');
	var th2 = th().append(paragrafo2).attr('id', 'tara');
	var th3 = th().append(paragrafo3).attr('id', 'bruto');
	var th4 = th().append(paragrafo4).attr('id', 'liquido');
	
	var trRodapeResumo = tr('totalRodape' + rodape.nomeTabela, '')
		.append(th1).append(th2).append(th3).append(th4);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);
	
	var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
	
	if (produtor == 0) th1.attr('colspan', 8);
	else {
		
		if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			th1.attr('colspan', 7);
			
		}
		else th1.attr('colspan', 6);
		
	}
	
}
