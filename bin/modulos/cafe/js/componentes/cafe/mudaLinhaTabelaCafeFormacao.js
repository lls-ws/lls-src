/* =========================================================
 * mudaLinhaTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function mudaLinhaTabelaCafeFormacao(dados) {
	
	var tbody = $('#tbody' + dados.nomeTabela);
	
	var tr = tbody.find('#' + dados.nomeTabela.toLowerCase() + '_' + dados.id);
								
	formataDadosCafeFormacao(dados);
	
	var arrayColunaBotoes = { altera: "", remove: "" };
	
	tr.find("#tdBotoes").replaceWith(tabelaBotoes(dados.id, dados.nome, arrayColunaBotoes));
	tr.find("#tdPeneira").replaceWith(tabelaCelula(dados.peneira, "text-center", "texto", "tdPeneira"));
	tr.find("#tdPilha").replaceWith(tabelaCelula(dados.pilha, "text-center", "texto", "tdPilha"));
	tr.find("#tdObservacao").replaceWith(tabelaCelula(dados.observacao, "text-center", "texto", "tdObservacao"));
	
	dados.tipoOperacao = 0;
	
	setBotoesTabelaCafeFormacao(dados, tr);
	
}
