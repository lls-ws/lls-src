/* =========================================================
 * novoFormularioCore.js
 * http://lls.net.br/
 * ========================================================= */

function novoFormularioCore(dados) {
	
	if (dados.click == 'click') {
		
		if($('.navbar-toggle').css('display') !='none'){
		
			$(".navbar-toggle").trigger("click");
	
		}
	
	}
	
	tabelaRelatorioCore(dados);
	
	if (dados.textoLabel != 'Data') eventoListaCadastroCore(dados);

}
