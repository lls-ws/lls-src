/* =========================================================
 * setDadosRodapeServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeServicocafe(rodape) {
	
	eval ("formataDados" + rodape.nomeTabela + "(rodape[0])");
	
	var paragrafo1 = paragrafo('text-center', 'texto').append("Total de Cobranças: " + rodape[0].qtd);
	var paragrafo2 = paragrafo('text-right', 'texto texto_grande').append(rodape[0].total);
	var paragrafo3 = paragrafo('text-right', 'texto_cor_verde').append(rodape[0].pago);
	var paragrafo4 = paragrafo('text-right', 'texto_cor_vermelho').append(rodape[0].valor);
	
	var th1 = th().append(paragrafo1).attr('id', 'qtd');
	var th2 = th().append(paragrafo2).attr('id', 'total');
	var th3 = th().append(paragrafo3).attr('id', 'pago');
	var th4 = th().append(paragrafo4).attr('id', 'valor');
	
	var trRodapeResumo = tr('totalRodape' + rodape.nomeTabela, '')
		.append(th1).append(th2).append(th3).append(th4);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);
	
	var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
	
	if (produtor == 0) th1.attr('colspan', 5);
	else {
		
		if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			th1.attr('colspan', 4);
			
		}
		else th1.attr('colspan', 3);
		
	}
	
}
