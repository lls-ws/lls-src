/* =========================================================
 * eventoFormularioSenha.js
 * http://lls.net.br/
 * ========================================================= */

function eventoFormularioSenha(dados) {
	
	var number = animacao(dados.idBotao, dados.iconeBotao, true);
	
	var $email = $('#email').val();
	
	$.ajax({
		type: "POST",
		url: "recuperaSenha",
		dataType: "json",
		data : {'email': $email},
		success: function(resposta) {
			
			var mensagem = decodeURIComponent(unescape(resposta.mensagem));
			
			if (resposta.status == "200") {
				
				login(0);
				
				mostraDialog(mensagem, "texto_cor_verde", '.form-signin', 'Recuperação de Senha');
				
			}
			else {
				
				animacao(dados.idBotao, dados.iconeBotao, false, number);
				
				mostraDialog(mensagem, "texto_cor_vermelho", '.form-signin', 'Recuperação de Senha');
				
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
