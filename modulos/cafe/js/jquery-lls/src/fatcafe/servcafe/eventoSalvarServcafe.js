/* =========================================================
 * eventoSalvarServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarServcafe(dados) {
	
	var servico = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados)');
	
	$.ajax({
		type: "POST",
		url: "salva" + dados.nomeTabela + dados.nomeTabelaCadastro,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(servico),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var cor_texto = "texto_cor_vermelho";
			
			if (resposta.status == "200") {
				
				cor_texto = "texto_cor_verde";
				
				servico.cadastro.nomeTabela = dados.nomeTabela;
				servico.cadastro.nomeTabelaCadastro = dados.nomeTabelaCadastro;
				
				servico.cadastro.id = resposta.id;
				servico.cadastro.data = $.datepicker.formatDate('yy-mm-dd', servico.cadastro.data);
				servico.cadastro.servico = $("#nomeProcuraCadastro" + dados.nomeTabela + "Preco").val();
				
				eval ('limpaDadosFormulario' + dados.nomeTabela + '(dados)');
				
				if (dados.tipoOperacao == 0) {
					
					eval ('setLinhaTabela' + dados.nomeTabela + '(servico.cadastro)');
					eval ('addTotalTabela' + dados.nomeTabela + '(servico.cadastro)');
					
				}
				else {
					
					eval ('mudaLinhaTabela' + dados.nomeTabela + '(servico.cadastro)');
					eval ('alteraTotalTabela' + dados.nomeTabela + '(servico.cadastro)');
					
				}
				
				$("#divDialogAltera" + dados.nomeTabela).dialog( "close" );
				
			}
			
			mostraDialog(
				mensagem,
				cor_texto,
				"table",
				tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
			);
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
