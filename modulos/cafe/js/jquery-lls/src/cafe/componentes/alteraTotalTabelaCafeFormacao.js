/* =========================================================
 * alteraTotalTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function alteraTotalTabelaCafeFormacao(dados) {
	
	var valores = pegaValoresTabelaCafeFormacao(dados);
	
	var tdSacas = $('#tbody' + dados.nomeTabela)
		.find("#" + dados.nomeTabela + "_" + dados.id)
		.find('#tdSacas').find('p');
	
	var tdPeso = $('#tbody' + dados.nomeTabela)
		.find("#" + dados.nomeTabela + "_" + dados.id)
		.find('#tdPeso').find('p');
	
	tdSacas.empty().text(formataNumeroSacasCafe(dados.sacas));
	tdPeso.empty().text(dados.peso);
	
	setTotalTabelaCafeFormacao(dados, valores.sacas, valores.peso);
	
}
