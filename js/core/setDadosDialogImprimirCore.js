/* =========================================================
 * setDadosDialogImprimirCore.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogImprimirCore(dados, nomesColunas, trDados) {
	
	setDadosDialogLancamentoCore(dados, nomesColunas, trDados);
	
	if (dados.array.imprimir == 0) {
		
		var idBotaoPrint = 'botaoPrint' + dados.nomeTabela;
		
		var urlBotaoPrint = 'imprimirGuiaCafe(' + JSON.stringify(dados) + ')';
		
		var botaoPrint = botaoHorizontal(
			idBotaoPrint,
			"Imprimir",
			'print', 4, 0,
			'btn  btn-primary',
			'button',
			urlBotaoPrint
		).addClass('col-xs-3');
		
		var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
		
		botaoPrint.find('#botaoPrint' + dados.nomeTabela)
			.attr('title', "Imprimir " + titulo + ': ' + dados.array.titulo);
		
		if (dados.tipo == "GR" ) {
			
			if ($('#botaoAlterar' + dados.nomeTabela).is(':visible')) {
				
				$('#botaoRemover' + dados.nomeTabela + 'FormGroup').removeClass('col-xs-4').addClass('col-xs-3');
				$('#botaoAlterar' + dados.nomeTabela + 'FormGroup').removeClass('col-xs-4').addClass('col-xs-3');
				$('#botaoLancamento' + dados.nomeTabela + 'FormGroup').removeClass('col-xs-4').addClass('col-xs-3');
				
				$("#botaoAlterar" + dados.nomeTabela + "FormGroup").after(botaoPrint);
				
			}
			else {
				
				if (!$('#botaoLancamento' + dados.nomeTabela).is(':visible')) {
				
					$('#botaoRemover' + dados.nomeTabela + 'FormGroup').remove();
					$('#botaoPrint' + dados.nomeTabela + 'FormGroup').removeClass('col-xs-3').addClass('col-xs-4');
					$("#botaoAlterar" + dados.nomeTabela + "FormGroup").after(botaoPrint);
					
				}
				
			}
			
		}
		else {
			
			if (dados.array.indexStatus == 2) {
				
				$('#botaoRemover' + dados.nomeTabela + 'FormGroup').remove();
				$('#botaoPrint' + dados.nomeTabela + 'FormGroup').removeClass('col-xs-3').addClass('col-xs-4');
				$("#botaoAlterar" + dados.nomeTabela + "FormGroup").after(botaoPrint);
				
			}
			
		}
		
	}
	
}
