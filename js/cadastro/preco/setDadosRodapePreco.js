/* =========================================================
 * setDadosRodapePreco.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapePreco(rodape) {
	
	var paragrafo1 = paragrafo('text-center', 'texto').append("Total de Preços: " + rodape[0].qtd);
	
	var th1 = th().append(paragrafo1).attr('id', 'qtd').attr('colspan', 3);
	
	var trRodape = tr('nomeRodape' + rodape.nomeTabela, '').append(th1);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodape);
	
}
