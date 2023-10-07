/* =========================================================
 * eventoFormularioCadastroSenha.js
 * http://lls.net.br/
 * ========================================================= */

function eventoFormularioCadastroSenha(dados) {
	
	var number = animacao(dados.idBotao, dados.iconeBotao, true);
	
	var senhas = {
		email: $('#email').val(),
		codigoSeguranca: $('#codigoSeguranca').val(),
		senhaNova: $('#senhaNova').val(),
		senhaConfirma: $('#senhaConfirma').val()
	}
	
	$.ajax({
		type: "POST",
		url: "ativaUsuario",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(senhas),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent(unescape(resposta.mensagem));
			
			var titulo = $('#loginForm p h3').val();
			
			if (resposta.status == "200") {
				
				menu(resposta.status);
				
			}
			else {
				
				animacao(dados.idBotao, dados.iconeBotao, false, number);
				
				mostraDialog(mensagem, "texto_cor_vermelho", '.form-signin', titulo);
				
			}
				
		},
		error: function(jqXHR, exception) {
			
			animacao(dados.idBotao, dados.iconeBotao, false, number);
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
			
		}
	 
	});
    
}
