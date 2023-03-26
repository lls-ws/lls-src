/* =========================================================
 * novoCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function novoCadastroCore(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-" + dados.nomeTabela.toLowerCase() + ".js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-botao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-tabela.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formularioCore.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastro.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastroCore.js", "js");
	carregaCssJs("js/jquery.validate.min.js", "js");
	
	marcarMenu(dados.posicaoItemMenu);
	
	if (dados.click == 'click') {
		
		if($('.navbar-toggle').css('display') !='none'){
		
			$(".navbar-toggle").trigger("click");
	
		}
	
	}
	
	dados.id = 0;
	
	var formulario = eval('formulario' + dados.nomeTabela + '(dados)');
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)')),
		'Altera' + dados.nomeTabela
	);
	
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor').focus();

}
