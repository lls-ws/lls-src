/* =========================================================
 * novoCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function novoCadastro(nomeTabela, click, posicaoItemMenu, id) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-" + nomeTabela.toLowerCase() + ".js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastro.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-botao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-tabela.js", "js");
	carregaCssJs("js/jquery.validate.min.js", "js");
	
	marcarMenu(posicaoItemMenu);
	
	if (click == 'click') {
		
		if($('.navbar-toggle').css('display') !='none'){
		
			$(".navbar-toggle").trigger("click");
	
		}
	
	}
	
	if (id == null) id = 0;
	
	var formulario = eval('formulario' + nomeTabela + '("' + id + '", "' + nomeTabela + '")');
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(0, eval('pegaNomeColunas' + nomeTabela + '(3)')),
		'Altera' + nomeTabela
	);
	
	if (posicaoItemMenu == "1") {
		
		setTimeout(function() {
		
			formulario.find('#nome' + nomeTabela).focus();
			formulario.find('#codigo' + nomeTabela).focus();
		
		}, 0);
		
	}
	else {
		
		setTimeout(function() {
		
			formulario.find('#nomeProcuraCadastro' + nomeTabela + 'FazendaProdutor').focus();
			formulario.find('#nomeProcuraCadastro' + nomeTabela + 'Milho').focus();
		
		}, 0);
		
	}

}
