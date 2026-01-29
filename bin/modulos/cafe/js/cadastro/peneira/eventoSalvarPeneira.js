/* =========================================================
 * eventoSalvarPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarPeneira(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "fa-check", true);
	
	var peneira = pegaDadosFormularioPeneira(nomeTabela);
	
	$.ajax({
		type: "POST",
		url: "salvaPeneira",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({peneira: peneira}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioPeneira();
				
				$("#divDialogAlteraPeneira").empty();
				
				$("#divDialogAlteraPeneira").remove();
				
				$("#divDialogAlteraPeneira").dialog( "close" );
				
				peneira["tipoOperacao"] = tipoOperacao;
				
				if (tipoOperacao == 0) {
					
					eventoListaCadastro(1, nomeTabela);
					
				}
				else {
					
					setDadosTabelaPeneira(peneira);
					
				}
				
			}
			else {
				
				animacao("botao" + nomeTabela, "fa-check", false, number);
				
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
			
			animacao("botao" + nomeTabela, "fa-check", false, number);
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
