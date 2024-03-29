/* =========================================================
 * formularioLogin.js
 * http://lls.net.br/
 * ========================================================= */

function formularioLogin(dados) {
	
	dados["icone"] = 'lock';
	dados["url"] = 'senha(0)';
	dados["texto"] = 'Recuperar senha';
	
	dados["icone2"] = 'user';
	dados["url2"] = 'cadastroLogin(0)';
	dados["texto2"] = 'Criar novo usuário';
	
	dados["idBotao"] = 'botaoLogin';
	dados["textoBotao"] = 'Acessar';
	dados["iconeBotao"] = 'fa-sign-in-alt';
	dados["tipoBotao"] = 'btn-primary';
	dados["urlBotao"] = 'eventoFormularioLogin';
	
	var campoEmail = campoTexto('email', 'text', '', 'Email', 'true', '-1', 50, 'fa-envelope');
	var campoSenha = campoTexto('senha', 'password', '', 'Senha', 'true', '-1', 10, 'fa-key');
	
	var formulario = formularioLoginCore(dados);
	
	formulario.find('#' + dados.idBotao)
		.before(campoEmail)
		.before(campoSenha);
	
	var url = window.location.hostname;
	
	if (url != "funchal.lls.net.br") {
		
		var layout = paragrafo('text-center', '');
	
		var novoUsuario = linkLoginCore(dados.icone2, dados.url2, dados.texto2, 'text-muted');
		
		var usuarioPainel = $("<div/>")
			.append(layout)
			.append(novoUsuario);
		
		formulario.find('#' + dados.idBotao).before(usuarioPainel);
		
	}
	
	formulario.find('#senha').attr('autocomplete', 'on');
	formulario.find('#email').attr('autocomplete', 'on').focus();
	
}
