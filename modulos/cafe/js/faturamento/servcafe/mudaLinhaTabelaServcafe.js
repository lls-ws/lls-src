/* =========================================================
 * mudaLinhaTabelaServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function mudaLinhaTabelaServcafe(dados) {
	
	var tbody = $('#tbody' + dados.nomeTabela);
	
	var tr = tbody.find('#' + dados.nomeTabela.toLowerCase() + '_' + dados.id);
								
	eval ('formataDados' + dados.nomeTabela + '(dados)');
	
	var arrayColunaBotoes = { altera: "", remove: "" };
	
	tr.find("#tdBotoes").replaceWith(tabelaBotoes(dados.id, dados.nome, arrayColunaBotoes));
	tr.find("#tdData").replaceWith(tabelaCelula(dados.data, "text-center", "texto", "tdData"));
	tr.find("#tdServico").replaceWith(tabelaCelula(dados.servico, "text-center", "texto", "tdServico"));
	tr.find("#tdSacas").replaceWith(tabelaCelula(formataNumeroSacasCafe(dados.sacas), "text-center", "texto", "tdSacas"));
	
	dados.tipoOperacao = 0;
	
	setBotoesTabelaCafeFormacao(dados, tr);
	
}
