/* =========================================================
 * eventoSalvarUsuario.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarUsuario(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "check", true);
	
	var senhas = pegaDadosFormularioUsuario(nomeTabela);
	
	$.ajax({
		type: "POST",
		url: "alteraSenha",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(senhas),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioUsuario();
				
				$("#divDialogAlteraUsuario").empty();
				
				$("#divDialogAlteraUsuario").remove();
				
				$("#divDialogAlteraUsuario").dialog( "close" );
				
				mostrarMenu();
				
			}
			else {
				
				animacao("botao" + nomeTabela, "check", false, number);
				
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
			
			animacao("botao" + nomeTabela, "check", false, number);
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
				
			);
		
		}
		
	})
	
}
