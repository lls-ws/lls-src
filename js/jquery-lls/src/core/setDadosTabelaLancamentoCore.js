/* =========================================================
 * setDadosTabelaLancamentoCore.is
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaLancamentoCore(dados) {
	
	if(typeof dados.array.lancamentos === 'undefined') return;
	
	if (dados.array.lancamentos.length > 0) {
		
		var tabelaDialog = $("#divTabelaDialog" + dados.nomeTabela).clone();
		
		$("#divDialog" + dados.nomeTabela + " div:first").remove();
		
		var nomeTabs = eval('nomeTabs' + dados.nomeTabela + '(2)');
		
		var tabs = divTabs(dados.nomeTabela, nomeTabs);
		
		$('#divDialog' + dados.nomeTabela + " div:first").before(tabs);
		
		jQuery.each( nomeTabs, function( i, value ) {
			
			tabs.find('#linha_' +  i).hide();
			
		});
		
		var tabNumero = 1;
		
		$('#tab' + dados.nomeTabela + tabNumero)
			.append(tabelaDialog)
			.removeClass('in active');
		
		$('#linha_tab' + dados.nomeTabela + tabNumero)
			.removeClass('active')
			.show();
		
		for(var j = 0; j < dados.array.lancamentos.length; j++) {
		
			carregaCssJs("js/jquery-lls/jquery-lls-" + dados.nomeTabelaLancamento[j].toLowerCase() + ".js", "js");
		
			var tbodyTabela = tbody('tbody' + dados.nomeTabelaLancamento[j]);
			
			var tabelaFormulario = tabela(
				'table' + dados.nomeTabelaLancamento[j],
				eval('pegaNomeColunas' + dados.nomeTabelaLancamento[j] + '(1)')
			).append(tbodyTabela);
			
			var divTabela = $('<div/>')
				.attr('id', 'divTabela' + dados.nomeTabelaLancamento[j])
				.addClass('form-table table-responsive')
				.append(tabelaFormulario);
			
			tabNumero++;
			
			tabs.find('#tab' + dados.nomeTabela + tabNumero).append(divTabela);
			
			var lancamentosTabela = dados.array.lancamentos[j];
			
			var count = 0;
			
			for(var i = 0; i < lancamentosTabela.length; i++) {
				
				lancamentosTabela[i]["idCadastro"] = dados.id;
				lancamentosTabela[i]["posicaoItem"] = dados.posicaoItem;
				lancamentosTabela[i]["posicaoItemMenu"] = dados.posicaoItemMenu;
				lancamentosTabela[i]["tipoOperacao"] = dados.tipoOperacao;
				lancamentosTabela[i]["nomeTabela"] = dados.nomeTabelaLancamento[j];
				
				if (dados.tipoOperacao == 0) {
					lancamentosTabela[i]["nomeTabelaCadastro"] = dados.nomeTabela;
					lancamentosTabela[i]["nomeTabelaLancamento"] = dados.nomeTabelaCadastro;
				}
				else {
					lancamentosTabela[i]["nomeTabelaCadastro"] = dados.nomeTabelaCadastro;
					lancamentosTabela[i]["nomeTabelaLancamento"] = dados.nomeTabela;
				}
				
				eval ('setLinhaTabela' + dados.nomeTabelaLancamento[j] + '(lancamentosTabela[i])');
				
				count++;
				
			}
			
			if (count > 0) {
				
				dados.array.rodape[j]["nomeTabela"] = dados.nomeTabelaLancamento[j];
			
				eval ("setDadosRodape" + dados.nomeTabelaLancamento[j] + '(dados.array.rodape[j])');
				
				tabs.find('#linha_tab' + dados.nomeTabela + tabNumero).show();
			
			}
			else tabNumero--;
			
		}
		
		$('#tab' + dados.nomeTabela + tabNumero).addClass('in active');
		$('#linha_tab' + dados.nomeTabela + tabNumero).addClass('active');
		
		$('#botao').focus();
		
	}
	
}
