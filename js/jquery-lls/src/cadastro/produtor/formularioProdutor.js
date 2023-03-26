/* =========================================================
 * formularioProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function formularioProdutor(idProdutor, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cep.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cpf.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-endereco.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastro-tabela.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-fazenda.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-telefone.js", "js");
	
	var $tabs = divTabs(nomeTabela, eval ('nomeTabs' + nomeTabela + '()'));
	
	$tabs.find('#tab' + nomeTabela + '1').addClass('in active');
	
	$tabs.find('#linha_tab' + nomeTabela + '1').addClass('active');
	
	var $telaEndereco = telaEnderecoProdutor(nomeTabela);
	
	var $telaFazenda = telaTabela('Fazenda', nomeTabela);
	
	var $telaTelefone = telaTabela('Telefone', nomeTabela);
	
	var $telaObservacao = telaObservacao(nomeTabela);
	
	var $formObs = $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8 col-md-offset-1")
		.append($telaObservacao);
	
	$tabs.find('#tab' + nomeTabela + '1').append($telaEndereco);
	
	$tabs.find('#tab' + nomeTabela + '2').append($telaFazenda);
	
	$tabs.find('#tab' + nomeTabela + '3').append($telaTelefone);
	
	$tabs.find('#tab' + nomeTabela + '4').append($formObs);
	
	var $formulario = formularioCadastro(idProdutor, nomeTabela, 2, 4, $tabs);
	
	return $formulario;
	
}
