/* =========================================================
 * eventoFormularioLogin.js
 * http://lls.net.br/
 * ========================================================= */

function eventoFormularioLogin(dados) {
	
	var number = animacao(dados.idBotao, dados.iconeBotao, true);
	
	var $email = $('#email').val();
	var $senha = $('#senha').val();
	
	$.ajax({
		type: "POST",
		url: "efetuaLogin",
		dataType: "json",
		data : {'email': $email, 'senha': $senha},
		success: function(resposta) {
			
			if (resposta.status == "200") {
				
				carregaCssJs("js/jquery-lls/jquery-lls-menu.js", "js");
				
				menu(resposta.status);
				
			}
			else {
				
				animacao(dados.idBotao, dados.iconeBotao, false, number);
				
				var $mensagem = decodeURIComponent(unescape(resposta.mensagem));
				
				mostraDialog($mensagem, 'texto_cor_vermelho', '.form-signin', tituloPainelLogin());
				
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
