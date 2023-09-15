/* =========================================================
 * novoFormulario.js
 * http://lls.net.br/
 * ========================================================= */

function novoFormulario(nomeTabela, textoLabel, posicaoItemMenu, click, nomeTabelaLancamento) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-" + nomeTabela.toLowerCase() + ".js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastro.js", "js");
	
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
