/* =========================================================
 * setLinhaTabelaServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setLinhaTabelaServcafe(dados) {
	
	eval ('formataDados' + dados.nomeTabela + '(dados)');
	
	var tbody = $('#tbody' + dados.nomeTabela);
	
	var tr = setIdTabelaCadastro(dados, tbody);
	
	var arrayBotoes = {altera: "", remove: ""};
	
	if (dados.tipoOperacao == 1) arrayBotoes = {remove: ""};
	
	tr.append(tabelaBotoes(dados.id, "", arrayBotoes))
	  .append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
	  .append(tabelaCelula(dados.servico, "text-center", "texto", "tdServico"))
	  .append(tabelaCelula(formataNumeroSacasCafe(dados.sacas), "text-center", "texto", "tdSacas"))
	  .append(tabelaCelula(dados.valor, "text-right", "texto", "tdValor"));
	
	dados.tipoOperacao = 0;
	
	setBotoesTabelaCafeFormacao(dados, tr);
	
	dados.tipoOperacao = 1;
	
	tbody.append(tr);
	
}
