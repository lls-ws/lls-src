/* =========================================================
 * formularioCadastroLogin.js
 * http://lls.net.br/
 * ========================================================= */

function formularioCadastroLogin(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-telefone.js", "js");
	
	var campoNome = campoTexto('nome', 'text', '', 'Nome', true, '-1', 50, 'user');
	var campoEmail = campoTexto('email', 'email', '', 'Email', true, '-1', 50, 'envelope');
	var campoFone = campoTelefone('telefone', true);
	
	var formulario = formularioLoginCore(dados);
	
	formulario.find('#' + dados.idBotao)
		.before(campoNome)
		.before(campoEmail)
		.before(campoFone);
	
	formulario.find('#nome').focus();
	
}
