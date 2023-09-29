/* =========================================================
 * formularioCadastroSenha.js
 * http://lls.net.br/
 * ========================================================= */

function formularioCadastroSenha(dados) {
	
	var campoEmail = campoTextoHorizontal('email', 'email', '', 0 , 0, 'Email', true, 50, 'enabled', 'envelope');
	var campoSenhaNova = campoTextoHorizontal('senhaNova', 'password', '', 0 , 0, 'Digite a nova senha', true, 10, 'enabled', 'key');
	var campoSenhaConfirma = campoTextoHorizontal('senhaConfirma', 'password', '', 0 , 0, 'Confirme a nova senha', true, 10, 'enabled', 'key');
	var campoCodigoSeguranca = campoTextoHorizontal('codigoSeguranca', 'password', '', 0 , 0, 'Código de Segurança', true, 6, 'enabled', 'shield');
	
	campoEmail.find('label').remove();
	campoSenhaNova.find('label').remove();
	campoSenhaConfirma.find('label').remove();
	campoCodigoSeguranca.find('label').remove();
	
	var formulario = formularioLoginCore(dados);
	
	formulario.find('#' + dados.idBotao)
		.before(campoEmail)
		.before(campoCodigoSeguranca)
		.before(campoSenhaNova)
		.before(campoSenhaConfirma);
	
	formulario.find('#email').focus();
	
	$('#painel').removeClass('container_center').addClass('container_senha');
	
	formulario.unbind('submit');
	
	validarFormularioCadastroSenha(dados, formulario);
	
}
