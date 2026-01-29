/* =========================================================
 * eventoFormularioCadastroLogin.js
 * http://lls.net.br/
 * ========================================================= */

function eventoFormularioCadastroLogin(dados) {
	
	var number = animacao(dados.idBotao, dados.iconeBotao, true);
	
	var $nome = encodeURIComponent( unescape($('#nome').val()));
	var $email = $('#email').val();
	var $telefone = pegaTelefoneNumeros($('#telefone').val());
	
	$.ajax({
		type: "POST",
		url: "efetuaCadastroLogin",
		dataType: "json",
		data : {'email': $email, 'nome': $nome, 'telefone': $telefone},
		success: function(resposta) {
			
			var mensagem = decodeURIComponent(unescape(resposta.mensagem));
			
			if (resposta.status == "200") {
				
				login(0);
				
				mostraDialog(mensagem, "texto_cor_verde", '.form-signin', 'Cadastro de Usuário');
				
			}
			else {
				
				animacao(dados.idBotao, dados.iconeBotao, false, number);
				
				mostraDialog(mensagem, "texto_cor_vermelho", '.form-signin', 'Cadastro de Usuário');
				
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
