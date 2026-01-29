/* =========================================================
 * novoFormulario.js
 * http://lls.net.br/
 * ========================================================= */

function novoFormulario(nomeTabela, textoLabel, posicaoItemMenu, click, nomeTabelaLancamento) {
	
	if (posicaoItemMenu == 1) {
		
		tabelaCadastro(posicaoItemMenu, nomeTabela, textoLabel);
	
		eval ('eventoListaCadastro(1, "' + nomeTabela + '")');
	
	}
	else {
		
		tabelaRelatorio(posicaoItemMenu, nomeTabela, textoLabel, nomeTabelaLancamento);
		
		if (textoLabel != 'Data') {
		
			eval ('eventoListaCadastro(1, "' + nomeTabela + '")');
			
		}
		
	}

	if (click == 'click') {
		
		if($('.navbar-toggle').css('display') !='none'){
		
			$(".navbar-toggle").trigger("click");
	
		}
	
	}

}
