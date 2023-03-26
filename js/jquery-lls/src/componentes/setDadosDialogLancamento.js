/* =========================================================
 * setDadosDialogLancamento.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogLancamento(lancamento, nomesColunasLancamento, trLancamento,
								  nomeBotao, urlBotaoBaixar, colspan) {
	
	setDadosDialogCadastro(lancamento, nomesColunasLancamento, trLancamento);
	
	var tableDialog = $('#divDialog' + lancamento.nomeTabela + ' #tableDialog' + lancamento.nomeTabela);
	
	if (lancamento.observacao != '' && lancamento.observacao != null) {
		lancamento["obs"] = lancamento.observacao;
	}
	
	if (lancamento.obs != '' && lancamento.obs != null) {
		
		if (colspan == null) colspan = 2;
		
		var trObs = tr('', '')
			.append(tabelaCelula(lancamento.obs, 'text-left', 'texto', 'tdObs')
			.attr('colspan', colspan));
		
		tableDialog.find('tbody').append(trObs);
		
	}
	
	var idDialog = campoOculto('id' + lancamento.nomeTabela, lancamento.id);
	
	tableDialog.after(idDialog);
	
	var baixasArray = lancamento.baixas;
	
	if (baixasArray != null && baixasArray.length > 0) {
		
		var tabelaBaixa = pegaTabelaCadastro(baixasArray, lancamento.nomeTabela2);
		
		$('#divTabelaDialog' + lancamento.nomeTabela).after(tabelaBaixa);
		
		var rodapeArray = lancamento.rodape;
	
		if (rodapeArray != null) {
			
			eval ('setDadosRodape' + lancamento.nomeTabela2 +
				'(rodapeArray, "' + lancamento.nomeTabela2 + '")'
			);
			
		}
		
	}
	
	$('#botaoRemover' + lancamento.nomeTabela + 'FormGroup').removeClass('col-xs-6').addClass('col-xs-4');
	$('#botaoAlterar' + lancamento.nomeTabela + 'FormGroup').removeClass('col-xs-6').addClass('col-xs-4');
	
	if (nomeBotao == null) {
		
		nomeBotao = "Baixar";
		
	}
	
	if (urlBotaoBaixar == null) {
		
		urlBotaoBaixar = 'novoCadastro("' + lancamento.nomeTabela2 + '", "noClick", "' + pegaPosicaoItemMenu() + '", "' + lancamento.id + '")';
		
	}
	else {
		
		urlBotaoBaixar = 'alteraCadastro("' + lancamento.id + '", "' + lancamento.nomeTabela2 + '")';
		
	}
	
	var idBotaoBaixar = 'botaoBaixar' + lancamento.nomeTabela;
	
	var botaoBaixar = botaoHorizontal(
		idBotaoBaixar,
		nomeBotao,
		'ok', 4, 4,
		'btn btn-success',
		'button',
		urlBotaoBaixar
	).addClass('col-xs-4');
	
	$("#divBotoes #botaoAlterar" + lancamento.nomeTabela + "FormGroup").after(botaoBaixar);
	
	if (lancamento.baixar == 0) {
		botaoBaixar.find('#botaoBaixar' + lancamento.nomeTabela).show();
	}
	else {
		botaoBaixar.find('#botaoBaixar' + lancamento.nomeTabela).hide();
	}
	
	setBotoesDialogLancamento(lancamento);
	
}
