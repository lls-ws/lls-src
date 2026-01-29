/* =========================================================
 * setBotoesTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function setBotoesTabelaCafeFormacao(dados, tr) {
	
	var url = "";
	
	if (dados.tipoOperacao == 0) {
		
		url = 'remove' + dados.nomeTabela + dados.nomeTabelaCadastro;
		
		var urlBotaoAlterar = 'alteraCadastroTabelaCore(' + JSON.stringify(dados) + ')';
			
		tr.find('#botaoAlterar_' + dados.id)
			.attr('onclick', urlBotaoAlterar)
			.attr('title', "Alterar " + dados.titulo);
		
	}
	else url = 'remove' + dados.nomeTabelaCadastro;
	
	dados["url"] = url;
	
	var urlBotaoRemover = 'remove' + dados.nomeTabela + '(' + JSON.stringify(dados) + ')';
	
	tr.find('#botaoRemover_' + dados.id)
		.attr('onclick', urlBotaoRemover)
		.attr('title', "Remover " + dados.titulo);
	
}
