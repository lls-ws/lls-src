/* =========================================================
 * setDadosRodapeExtratocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeExtratocafe(rodape) {
	
	setDadosRodapeCafe(rodape);
	
	var paragrafoTitulo = paragrafo('text-center', 'texto_grande texto_label').append("Resumo de Saldo");
	
	$('#rodapeTotal' + rodape.nomeTabela + ' p').remove();
	$('#rodapeTotal' + rodape.nomeTabela).append(paragrafoTitulo);
	
	var texto = {
		qtd: "Total de Lotes: " + rodape[0].qtdLotes,
		media: "Média: " + formataNumero(rodape[0].media, 2, false, false, "", " kg"),
		servico: "Em Serviço: " + formataNumeroSacasCafe(rodape[0].servico),
		saida: "A Sair: " + formataNumeroSacasCafe(rodape[0].saida),
		transferida: "A Transferir: " + formataNumeroSacasCafe(rodape[0].transferida),
		total: "Total: " + formataNumeroSacasCafe(rodape[0].total)
	}
	
	var paragrafo1 = paragrafo('text-center texto', 'texto').append(texto.qtd);
	var paragrafo2 = paragrafo('text-center texto', 'texto').append(texto.servico);
	var paragrafo3 = paragrafo('text-center texto', 'texto').append(texto.saida);
	var paragrafo4 = paragrafo('text-center texto', 'texto').append(texto.transferida);
	var paragrafo5 = paragrafo('text-right texto', 'texto').append(texto.total);
	var paragrafo6 = paragrafo('text-right texto', 'texto').append(texto.media);
	
	var th1 = th().append(paragrafo1);
	var th2 = th().append(paragrafo2);
	var th3 = th().append(paragrafo3);
	var th4 = th().append(paragrafo4);
	var th5 = th().append(paragrafo5);
	var th6 = th().append(paragrafo6);
	
	var trRodapeResumo = tr('resumoRodape' + rodape.nomeTabela, '')
		.append(th1).append(th2).append(th3)
		.append(th4).append(th5).append(th6);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodapeResumo);
	
	var produtor = $('#idnomeProcura' + rodape.nomeTabela + 'FazendaProdutor').val();
	
	if (produtor == 0) {
		th2.attr('colspan', 2);
		th4.attr('colspan', 2);
		th5.attr('colspan', 2);
	}
	else {
		
		if ($('#spanIconClear' + rodape.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			th2.attr('colspan', 2);
			th5.attr('colspan', 2);
			
		}
		else {
			
			th5.attr('colspan', 2);
			
		}
		
	}
	
	setDadosRodapePeneiraExtratocafe(rodape);
	
}
