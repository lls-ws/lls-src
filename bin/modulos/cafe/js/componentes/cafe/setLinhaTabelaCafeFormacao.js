/* =========================================================
 * setLinhaTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function setLinhaTabelaCafeFormacao(dados) {
	
	eval ('formataDados' + dados.nomeTabela + '(dados)');
	
	var tbody = $('#tbody' + dados.nomeTabela);
	
	var tr = setIdTabelaCadastro(dados, tbody);
	
	var arrayBotoes = {altera: "", remove: ""};
	
	if (dados.tipoOperacao == 1) arrayBotoes = {remove: ""};
	
	tr.append(tabelaBotoes(dados.id, "", arrayBotoes))
	  .append(tabelaCelula(dados.lote, "text-center", "texto", "tdLote"))
	  .append(tabelaCelula(dados.peneira, "text-center", "texto", "tdPeneira"))
	  .append(tabelaCelula(dados.pilha, "text-center", "texto", "tdPilha"))
	  .append(tabelaCelula(dados.observacao, "text-center", "texto", "tdObservacao"))
	  .append(tabelaCelula(formataNumeroSacasCafe(dados.sacas), "text-right", "texto", "tdSacas"))
	  .append(tabelaCelula(dados.peso, "text-right", "texto", "tdPeso"));
	
	setBotoesTabelaCafeFormacao(dados, tr);
	
	tbody.append(tr);
	
}
