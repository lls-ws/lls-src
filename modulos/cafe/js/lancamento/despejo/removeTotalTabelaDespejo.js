/* =========================================================
 * removeTotalTabelaDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaDespejo(dados) {
	
	if (dados.tipoOperacao == 1) {
		
		dados.nomeTabelaCadastro = dados.nomeTabelaLancamento;
		
		$('#divDialogVisualiza' + dados.nomeTabelaLancamento).empty();
		$('#divDialogVisualiza' + dados.nomeTabelaLancamento).remove();
		$('#divDialogVisualiza' + dados.nomeTabelaLancamento).dialog( "close" );
		
	}
	
	removeTotalTabelaCafeFormacao(dados);
	
	if (dados.tipoOperacao == 0) {
	
		var rowCount = $('#tbody' + dados.nomeTabela).find('tr').length;
		
		if (rowCount == 0) {
		
			$('#' + dados.nomeTabelaCadastro.toLowerCase() + 'Form')
				.find("#spanGroupSearch" + dados.nomeTabelaCadastro + "FazendaProdutor")
					.click(function(){
					
						$('#' + dados.nomeTabelaCadastro.toLowerCase() + 'Form')
							.find('#idnomeProcuraCadastro' + dados.nomeTabelaCadastro + 'FazendaProdutor')
								.val(0);
					
						$('#' + dados.nomeTabelaCadastro.toLowerCase() + 'Form')
							.find('#idnomeProcuraCadastro' + dados.nomeTabelaCadastro + 'FazendaProdutor2')
								.val(0);
					
						$('#' + dados.nomeTabelaCadastro.toLowerCase() + 'Form')
							.find('#nome' + dados.nomeTabelaCadastro + 'FazendaProdutorMensagem')
								.text('').hide().trigger('change');
						
						$('#' + dados.nomeTabelaCadastro.toLowerCase() + 'Form')
							.find('#nomeProcuraCadastro' + dados.nomeTabelaCadastro + 'FazendaProdutor')
								.removeAttr('disabled').val("").focus();
								
					});
					
		}
		
	}
	
}
