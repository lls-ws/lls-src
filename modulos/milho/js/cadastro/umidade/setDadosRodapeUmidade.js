/* =========================================================
 * setDadosRodapeUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeUmidade(rodape) {

	var paragrafo1 = paragrafo('text-center', 'texto').append("Total de Umidades: " + rodape[0].qtd);
	
	var th1 = th().append(paragrafo1).attr('id', 'qtd').attr('colspan', 4);
	
	var trRodape = tr('nomeRodape' + rodape.nomeTabela, '').append(th1);
	
	$("#tfoottableLista" + rodape.nomeTabela).append(trRodape);
	
}
