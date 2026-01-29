/* =========================================================
 * eventoSalvarPreco.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarPreco(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "check", true);
	
	var preco = pegaDadosFormularioPreco(nomeTabela);
	
	$.ajax({
		type: "POST",
		url: "salvaPreco",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({preco: preco}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioPreco();
				
				$("#divDialogAlteraPreco").empty();
				
				$("#divDialogAlteraPreco").remove();
				
				$("#divDialogAlteraPreco").dialog( "close" );
				
				preco["tipoOperacao"] = tipoOperacao;
				
				if (tipoOperacao == 0) {
					
					$("#nomeProcura").val(decodeURIComponent(preco.nome));
					
					eventoListaCadastro(1, nomeTabela);
					
				}
				else {
					
					setDadosTabelaPreco(preco);
					
				}
				
			}
			else {
				
				animacao("botao" + nomeTabela, "check", false, number);
				
				$cor_texto = "texto_cor_vermelho";
				
			}
			
			mostraDialog(
				$mensagem,
				$cor_texto,
				"table",
				tituloPainelCadastro(0, eval('pegaNomeColunas' + nomeTabela + '(3)'))
			);
			
		},
		error: function(jqXHR, exception) {
			
			animacao("botao" + nomeTabela, "check", false, number);
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
