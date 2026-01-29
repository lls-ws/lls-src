/* =========================================================
 * setDadosRodapeCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeCafeFormacao(dados) {
	
	var paragrafo1 = paragrafo('text-center texto', 'texto');
	var paragrafo2 = paragrafo('text-right texto', 'texto');
	var paragrafo3 = paragrafo('text-right texto', 'texto');
	
	var titulo = eval ('pegaNomeColunas' + dados.nomeTabela + '(4)');
	
	titulo = titulo.split(' ');
	
	paragrafo1.append("Total de " + titulo[0] + ": " + dados.totalQtd);
	paragrafo2.append(formataNumeroSacasCafe(dados.totalSacas));
	paragrafo3.append(formataNumero(dados.totalPeso, 2, false, false, "", " kg"));
		
	var th1 = th().append(paragrafo1).attr('id', 'totalQtd').attr('colspan', 5);
	var th2 = th().append(paragrafo2).attr('id', 'totalSacas');
	var th3 = th().append(paragrafo3).attr('id', 'totalPeso');
	
	var trRodape = tr('nomeRodape' + dados.nomeTabela, '')
		.append(th1).append(th2).append(th3);
	
	$("#tfoottable" + dados.nomeTabela).append(trRodape);
	
}
