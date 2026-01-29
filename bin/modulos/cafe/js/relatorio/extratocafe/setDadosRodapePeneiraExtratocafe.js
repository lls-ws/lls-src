/* =========================================================
 * setDadosRodapePeneiraExtratocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapePeneiraExtratocafe(rodape) {
	
	var peneira = rodape[0].peneiras;
	
	if (peneira.length > 0) {
	
		var paragrafoTitulo = paragrafo('text-center', 'texto_grande texto_label').append("Resumo por Peneiras");
		
		var thTitulo = th().append(paragrafoTitulo);
		
		var trRodapeResumo = tr('resumoPeneiraRodape' + rodape.nomeTabela, '').append(thTitulo);
		
		$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);

	}
	
	for(var i = 0; i < peneira.length; i++) {

		var paragrafo1 = paragrafo('text-left texto', 'texto').append(peneira[i].nome);
		var paragrafo2 = paragrafo('text-right texto', 'texto').append(formataNumeroSacasCafe(peneira[i].sacas));
		var paragrafo3 = paragrafo('text-right texto', 'texto').append(formataNumero(peneira[i].peso, 2, false, false, "", " kg"));
	
		var th1 = th().append(paragrafo1);
		var th2 = th().append(paragrafo2);
		var th3 = th().append(paragrafo3);
		
		var trRodapeResumo = tr('resumoPeneiraRodape' + rodape.nomeTabela, '').append(th1).append(th2).append(th3);
		
		$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);
		
		var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
		
		if (produtor == 0) {
			
			thTitulo.attr('colspan', 9);
			th1.attr('colspan', 3);
			th2.attr('colspan', 2);
			th3.attr('colspan', 4);
			
		}
		else {
			
			if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
			
				thTitulo.attr('colspan', 8);
				th1.attr('colspan', 2);
				th2.attr('colspan', 2);
				th3.attr('colspan', 4);
				
			}
			else {
				
				thTitulo.attr('colspan', 7);
				th1.attr('colspan', 2);
				th2.attr('colspan', 2);
				th3.attr('colspan', 3);
				
			}
			
		}
		
	}
	
}
