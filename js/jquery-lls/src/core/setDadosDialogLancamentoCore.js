/* =========================================================
 * setDadosDialogLancamentoCore.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogLancamentoCore(dados, nomesColunas, trDados) {
	
	setDadosDialogCadastroCore(dados, nomesColunas, trDados);
	
	var tableDialog = $('#divDialog' + dados.nomeTabela + ' #tableDialog' + dados.nomeTabela);
	
	if (dados.array.observacao != '' && dados.array.observacao != null) {
		
		var trObs = tr('trObservacao' + dados.nomeTabela, '')
			.append(tabelaCelula(dados.array.observacao, 'text-left', 'texto', 'tdObs')
				.attr('colspan', 3));
		
		tableDialog.find('tbody').append(trObs);
		
	}
	
	var idDialog = campoOculto('id' + dados.nomeTabela, dados.id);
	
	$('#divBotoes' + dados.nomeTabela).before(idDialog);
	
	var nomeTabela = dados.nomeTabelaLancamento[0];
	
	dados.nomeTabelaLancamento.splice(0, 1);
	
	var dadosLancamento = {
		id: dados.id,
		tipoOperacao: 1,
		posicaoItem: dados.posicaoItem,
		posicaoItemMenu: dados.posicaoItemMenu,
		nomeTabela: nomeTabela,
		nomeTabelaCadastro: dados.nomeTabela,
		nomeTabelaLancamento: dados.nomeTabelaLancamento
	}
	
	var urlBotaoLancamento = 'eventoAcharCadastroCore(' + JSON.stringify(dadosLancamento) + ')';
	
	var idBotaoLancamento = 'botaoLancamento' + dados.nomeTabela;
	
	var botaoLancamento = botaoHorizontal(
		idBotaoLancamento,
		dados.nomeBotaoLancamento,
		'ok', 4, 4,
		'btn btn-success',
		'button',
		urlBotaoLancamento
	).addClass('col-xs-5');
	
	$('#botaoAlterar' + dados.nomeTabela + 'FormGroup')
		.removeClass('col-xs-9').addClass('col-xs-4')
		.after(botaoLancamento);
	$('#botaoRemover' + dados.nomeTabela + 'FormGroup')
		.removeClass('col-xs-3').addClass('col-xs-3');
	
	var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
	
	botaoLancamento.find('#botaoLancamento' + dados.nomeTabela)
		.attr('title', dados.nomeBotaoLancamento + " " + titulo + ': ' + dados.array.titulo);
	
	setBotoesDialogLancamentoCore(dados);
	
	dados.tipoOperacao = 1;
	dados.nomeTabelaCadastro = nomeTabela;
	
	setDadosTabelaLancamentoCore(dados);
	
}
