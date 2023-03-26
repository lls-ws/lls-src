/* =========================================================
 * eventoSalvarLaudo.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarLaudo(tipoOperacao, nomeTabela) {
	
	var laudo = pegaDadosFormularioLaudo(nomeTabela);
	
	$.ajax({
		type: "POST",
		url: "salvaLaudo",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({laudo: laudo}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioLaudo();
				
				$("#divDialogAlteraLaudo").empty();
				
				$("#divDialogAlteraLaudo").remove();
				
				$("#divDialogAlteraLaudo").dialog( "close" );
				
			}
			else {
				
				$cor_texto = "texto_cor_vermelho";
				
			}
			
			mostraDialog(
				$mensagem,
				$cor_texto,
				"form",
				tituloPainelCadastro(0, eval('pegaNomeColunas' + nomeTabela + '(3)'))
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
