/* =========================================================
 * setDadosRodapeServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeServcafe(dados) {
	
	var paragrafo1 = paragrafo('text-center', 'texto').append("Total de Cobranças: " + dados.qtd);
	var paragrafo2 = paragrafo('text-right', 'texto').append(formataNumero(dados.total, 2, true, true, "R$ ", ""));
	
	var th1 = th().append(paragrafo1).attr('id', 'qtd').attr('colspan', 4);
	var th2 = th().append(paragrafo2).attr('id', 'total');
	
	var trRodape = tr('nomeRodape' + dados.nomeTabela, '')
		.append(th1).append(th2);
	
	$("#tfoottable" + dados.nomeTabela).append(trRodape);
	
}
