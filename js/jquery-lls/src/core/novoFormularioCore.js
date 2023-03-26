/* =========================================================
 * novoFormularioCore.js
 * http://lls.net.br/
 * ========================================================= */

function novoFormularioCore(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-" + dados.nomeTabela.toLowerCase() + ".js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formularioCore.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastro.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastroCore.js", "js");
	carregaCssJs("js/jquery.validate.min.js", "js");
	
	if (dados.click == 'click') {
		
		if($('.navbar-toggle').css('display') !='none'){
		
			$(".navbar-toggle").trigger("click");
	
		}
	
	}
	
	tabelaRelatorioCore(dados);
	
	if (dados.textoLabel != 'Data') eventoListaCadastroCore(dados);

}
