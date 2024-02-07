/* =========================================================
 * setLinhaTabelaBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setLinhaTabelaBaixacafe(dados) {
	
	eval ('formataDados' + dados.nomeTabela + '(dados)');
	
	var tbody = $('#tbody' + dados.nomeTabela);
	
	var tr = setIdTabelaCadastro(dados, tbody);
	
	var arrayBotoes = {remove: ""};
	
	tr.append(tabelaBotoes(dados.id, "", arrayBotoes))
	  .append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
	  .append(tabelaCelula(dados.obs, "text-left", "texto", "tdObs"))
	  .append(tabelaCelula(dados.valor, "text-right", "texto", "tdValor"));
	
	setBotoesTabelaCafeFormacao(dados, tr);
	
	tbody.append(tr);
	
}
