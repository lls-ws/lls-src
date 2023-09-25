/* =========================================================
 * novoCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function novoCadastroCore(dados) {
	
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
