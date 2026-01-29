/* =========================================================
 * cadastroLogin.js
 * http://lls.net.br/
 * ========================================================= */

function cadastroLogin(tipo) {
	
	var dados = criaLink(tipo);
	
	dados["titulo"] = 'Cadastro de Usuário';
	dados["urlBotao"] = 'eventoFormularioCadastroLogin';
	dados["formulario"] = 'CadastroLogin';
	
	core(dados);
	
}
