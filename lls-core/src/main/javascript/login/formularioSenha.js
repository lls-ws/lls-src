/* =========================================================
 * formularioSenha.js
 * http://lls.net.br/
 * ========================================================= */

function formularioSenha(dados) {
	
	var campoEmail = campoTexto('email', 'email', '', 'Email', 'true', '-1', 50, 'fa-envelope');
	
	var formulario = formularioLoginCore(dados);
	
	formulario.find('#' + dados.idBotao).before(campoEmail);
	
	formulario.find('#email').attr('autocomplete', 'on').focus();
	
}
