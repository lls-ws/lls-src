/* =========================================================
 * alteraTotalTabelaServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function alteraTotalTabelaServcafe(dados) {
	
	var tdValor = $('#tbody' + dados.nomeTabela)
		.find("#" + dados.nomeTabela + "_" + dados.id)
		.find('#tdValor').find('p');
	
	var valorAnterior = formataNumeroSql(tdValor.text());
	
	tdValor.empty().text(dados.valor);
	
	eval ('setTotalTabela' + dados.nomeTabela + '(dados, valorAnterior)')
	
}
