/* =========================================================
 * novoCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function novoCadastro(nomeTabela, click, posicaoItemMenu, id) {
	
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
