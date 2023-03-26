/* =========================================================
 * formularioLoginCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioLoginCore(dados) {
	
	var titulo = tituloLogin(dados.titulo);
	
	var logo = imagem('imagens/logo.png', '', 100, 100);
	
	var imagemPainel = paragrafo('text-center', '').append(logo);
	
	var layout = paragrafo('text-center', '');
	
	var recuperarSenha = linkLoginCore(dados.icone, dados.url, dados.texto);
	
	var senhaPainel = $("<div/>")
		.append(layout)
		.append(recuperarSenha);
	
	var botaoLogin = botao(
		dados.idBotao,
		dados.textoBotao,
		dados.iconeBotao,
		'0',
		'btn btn-block btn-lg ' + dados.tipoBotao,
		'submit',
		''
	);
	
	var formulario = formularioHorizontal('login', 'form form-signin form_center formulario_cor');
	
	formulario.attr('role', 'form');
	
	formulario.append(imagemPainel)
		.append(titulo)
		.append(botaoLogin)
		.append(senhaPainel);
	
	formulario.submit(function(event) {
		
		event.preventDefault();
		
		eval(dados.urlBotao + '(dados)');
		
	});
	
	mudaPainel(formulario, 0);
	
	return formulario;
	
}
