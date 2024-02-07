/* =========================================================
 * setDadosRodapeBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeBaixacafe(dados) {

	var paragrafo1 = paragrafo('text-center texto', 'texto');
	var paragrafo2 = paragrafo('text-right texto', 'texto');
	
	paragrafo1.append("Total de Pagamentos: " + dados.totalQtd);
	paragrafo2.append(formataNumero(dados.totalPago, 2, false, false, "R$ ", ""));
		
	var th1 = th().append(paragrafo1).attr('colspan', 3);
	var th2 = th().append(paragrafo2).attr('id', 'totalPago');
	
	var trRodape = tr('nomeRodape' + dados.nomeTabela, '')
		.append(th1).append(th2);
	
	$("#tfoottable" + dados.nomeTabela).append(trRodape);
	
}
