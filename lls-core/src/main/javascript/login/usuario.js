/* =========================================================
 * usuario.js
 * http://lls.net.br/
 * ========================================================= */

function usuario(tipo) {
	
	var dados = criaLink(tipo);
	
	dados["titulo"] = 'Ativação de Usuário';
	dados["formulario"] = 'CadastroSenha';
	dados["urlBotao"] = 'eventoFormularioCadastroSenha';
	
	dados.iconeBotao = 'check';
	dados.textoBotao = 'Ativar';
	
	core(dados);
	
}
