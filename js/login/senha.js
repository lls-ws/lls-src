/* =========================================================
 * senha.js
 * http://lls.net.br/
 * ========================================================= */

function senha(tipo) {
	
	var dados = criaLink(tipo);
	
	dados["titulo"] = 'Recuperação de Senha';
	
	if (dados.tipo == '1') {
		
		dados["urlBotao"] = 'eventoFormularioCadastroSenha';
		dados["formulario"] = 'CadastroSenha';
		
		dados.iconeBotao = 'fa-check';
		dados.textoBotao = 'Salvar';
		
	}
	else {
		
		dados["urlBotao"] = 'eventoFormularioSenha';
		dados["formulario"] = 'Senha';
		
	}
	
	core(dados);
	
}
