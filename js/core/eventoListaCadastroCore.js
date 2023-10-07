/* =========================================================
 * eventoListaCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function eventoListaCadastroCore(dados) {
	
	var dadosRelatorio = eval('pegaProcura' + dados.nomeTabela + '(dados)');
	
	$.ajax({
		type: "POST",
		url: "lista" + dados.nomeTabela,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify(dadosRelatorio),
		success: function(resposta) {
			
			if (resposta.status == "200") {
			
				var qtdPaginas = resposta.paginas;
			
				var cadastrosArray = resposta.cadastros;
				
				var formulario = $('#lista' + dados.nomeTabela + 'Form');
				
				var tbodyCadastro = formulario.find('#tableLista' + dados.nomeTabela +
					' #tbodyLista' + dados.nomeTabela
				);
				
				tbodyCadastro.empty();
				
				for(var i = 0; i < cadastrosArray.length; i++) {
					
					dados.tipoOperacao = 0;
					dados["array"] = cadastrosArray[i];
					
					setDadosTabelaCadastroCore(dados);
					
				}
				
				dados.id = 0;
				
				$("#lista" + dados.nomeTabela + "Form #tableLista" + dados.nomeTabela)
					.find('tfoot').empty();
				
				if (cadastrosArray.length > 0) {
					
					formulario.find('#spanGroupPrint' + dados.nomeTabela + 'FazendaProdutor').show();
					
					resposta.rodape["nomeTabela"] = dados.nomeTabela;
					
					var trRodape = eval('setDadosRodape' + dados.nomeTabela + '(resposta.rodape)');
					
				}
				else {
					
					formulario.find('#spanGroupPrint' + dados.nomeTabela + 'FazendaProdutor').hide();
					
					var trRodape = "";
				
				}
				
				$("#lista" + dados.nomeTabela + "Form #tableLista" + dados.nomeTabela)
					.find('tfoot').append(trRodape);
				
				paginacaoCore(dados, qtdPaginas);
				
			}
			else {
				
				mostraDialog(
					resposta.mensagem,
					'texto_cor_vermelho',
					'table',
					tituloPainelCadastro(2, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
				);
				
			}
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
			
		}
		
	})	
	
}
