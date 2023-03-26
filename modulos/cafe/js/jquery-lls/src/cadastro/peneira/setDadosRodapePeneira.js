/* =========================================================
 * setDadosRodapePeneira.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapePeneira(rodape) {
	
	var paragrafo1 = paragrafo('text-center', 'texto').append("Total de Peneiras: " + rodape[0].qtd);
	
	var th1 = th().append(paragrafo1).attr('id', 'qtd').attr('colspan', 2);
	
	var trRodape = tr('nomeRodape' + rodape.nomeTabela, '').append(th1);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodape);
	
}
