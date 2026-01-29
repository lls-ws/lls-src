/* =========================================================
 * eventoListaCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function eventoListaCadastro(pagina, nomeTabela) {
	
	var dados = eval('pegaProcura' + nomeTabela + '("' + pagina + '", "' + nomeTabela + '")');
	
	$.ajax({
		type: "POST",
		url: "lista" + nomeTabela,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify(dados),
		success: function(resposta) {
			
			if (resposta.status == "200") {
			
				var qtdPaginas = resposta.paginas;
				
				var cadastrosArray = resposta.cadastros;
				
				var formulario = $('#lista' + nomeTabela + 'Form');
				
				var tbodyCadastro = formulario.find('#tableLista' + nomeTabela + ' #tbodyLista' + nomeTabela);
				
				tbodyCadastro.empty();
				
				for(var i = 0; i < cadastrosArray.length; i++) {
					
					cadastrosArray[i]["tipoOperacao"] = 0;
					cadastrosArray[i]["nomeTabela"] = nomeTabela;
					
					eval('setDadosTabela' + nomeTabela + '(cadastrosArray[i])');
					
				}
				
				$("#lista" + nomeTabela + "Form #tableLista" + nomeTabela)
					.find('tfoot').empty();
				
				if (cadastrosArray.length > 0) {
					
					formulario.find('#spanGroupPrint' + nomeTabela + 'FazendaProdutor').show();
					
					resposta.rodape["nomeTabela"] = nomeTabela;
					
					var $trRodape = eval('setDadosRodape' + nomeTabela + '(resposta.rodape)');
					
				}
				else {
				
					formulario.find('#spanGroupPrint' + nomeTabela + 'FazendaProdutor').hide();
					
					var $trRodape = "";
				
				}
				
				$("#lista" + nomeTabela + "Form #tableLista" + nomeTabela)
					.find('tfoot').append($trRodape);
				
				paginacao(
					'paginaLista' + nomeTabela,
					'eventoListaCadastro',
					qtdPaginas,
					pagina,
					nomeTabela
				);
				
			}
			else {
				
				mostraDialog(
					resposta.mensagem,
					'texto_cor_vermelho',
					'table',
					tituloPainelCadastro(2, eval('pegaNomeColunas' + nomeTabela + '(3)'))
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
