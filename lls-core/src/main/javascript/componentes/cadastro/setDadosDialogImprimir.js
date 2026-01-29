/* =========================================================
 * setDadosDialogImprimir.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogImprimir(lancamento, nomesColunasLancamento, trLancamento, nomeBotao,
								urlBotaoBaixar, urlBotaoPrint, colspan) {
	
	setDadosDialogLancamento(lancamento, nomesColunasLancamento, trLancamento, nomeBotao,
							 urlBotaoBaixar, colspan);
	
	$('#botaoRemover' + lancamento.nomeTabela + 'FormGroup').removeClass('col-xs-4').addClass('col-xs-3');
	$('#botaoAlterar' + lancamento.nomeTabela + 'FormGroup').removeClass('col-xs-4').addClass('col-xs-3');
	$('#botaoBaixar' + lancamento.nomeTabela + 'FormGroup').removeClass('col-xs-4').addClass('col-xs-3');
	
	var idBotaoPrint = 'botaoPrint' + lancamento.nomeTabela;
	
	var botaoPrint = botaoHorizontal(
		idBotaoPrint,
		"Imprimir",
		'print', 4, 0,
		'btn  btn-primary',
		'button',
		urlBotaoPrint
	).addClass('col-xs-3');
	
	$("#divBotoes #botaoAlterar" + lancamento.nomeTabela + "FormGroup").after(botaoPrint);
	
	botaoPrint.find('#botaoPrint' + lancamento.nomeTabela)
		.attr('title', "Imprimir " + lancamento.titulo);
	
	$('#botaoBaixar' + lancamento.nomeTabela).attr('title', nomeBotao + " " + lancamento.titulo);
	
	if (lancamento.imprimir == 0) {
		if ($('#botaoBaixarOscafe').is(':visible')) {
			botaoPrint.find('#botaoPrint' + lancamento.nomeTabela).show();
		}
	}
	else {
		botaoPrint.find('#botaoPrint' + lancamento.nomeTabela).hide();
	}
	
}
