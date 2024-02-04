/* =========================================================
 * eventoSalvarEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarEmpresa(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "fa-check", true);
	
	var empresa = pegaDadosFormularioEmpresa(nomeTabela);
	
	$.ajax({
		type: "POST",
		url: "salvaEmpresa",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({empresa: empresa}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioEmpresa();
				
				$("#divDialogAlteraEmpresa").empty();
				
				$("#divDialogAlteraEmpresa").remove();
				
				$("#divDialogAlteraEmpresa").dialog( "close" );
				
			}
			else {
				
				animacao("botao" + nomeTabela, "fa-check", false, number);
				
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
			
			animacao("botao" + nomeTabela, "fa-check", false, number);
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
				
			);
		
		}
		
	})
	
}
