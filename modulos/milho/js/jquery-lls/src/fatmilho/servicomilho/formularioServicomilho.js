/* =========================================================
 * formularioServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioServicomilho(idServicomilho, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-sqlProcura.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-sqlProcuraFazendaProdutor.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-sqlProcuraPreco.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-laudo.js", "js");
	
	var servico = getJson("achaLaudo");
	
	var $campoProdutor = campoSqlProcuraTexto(
		"Produtor",
		nomeTabela,
		"FazendaProdutor",
		"Digite o nome do produtor",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var $campoServico = campoSqlProcuraTexto(
		"Serviço",
		nomeTabela,
		"Preco",
		"Digite o nome do serviço",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var $campoLiquido = campoNumeroHorizontal(
		"liquido" + nomeTabela, "Líquido",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, false, "", " kg"
	);
	
	var $campoValor = campoNumeroHorizontal(
		"valor" + nomeTabela, "Valor",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, false, "R$ ", ""
	);
	
	var $campoData = campoDataHorizontal(
		"data" + nomeTabela, "Data",
		'col-xs-9 col-md-6', 'col-xs-3',
		true, "0", "0", formataData(servico.data),
		'disabled'
	).removeClass("has-feedback");
	
	var $formTela1 = $("<div/>").addClass("form-horizontal");
	
	$formTela1.append($campoProdutor);
	$formTela1.append($campoServico);
	$formTela1.append($campoLiquido);
	$formTela1.append($campoValor);
	$formTela1.append($campoData);

	var $telaObservacao = telaObservacao(nomeTabela);
	
	var $formTela2 = $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8 col-md-offset-2")
		.append($telaObservacao);
	
	var $tabs = divTabs(nomeTabela, eval ('nomeTabs' + nomeTabela + '()'));
	
	$tabs.find('#tab' + nomeTabela + '1').addClass('in active');
	$tabs.find('#linha_tab' + nomeTabela + '1').addClass('active');
	
	$tabs.find('#tab' + nomeTabela + '1').append($formTela1);
	$tabs.find('#tab' + nomeTabela + '2').append($formTela2);
	
	var $formulario = formularioCadastro(idServicomilho, nomeTabela, 2, 2, $tabs, 4);
	
	$campoLiquido.find('#liquido' + nomeTabela).focusout(function() {
		
		calculaValorServicomilho(nomeTabela);
		
	});
	
	$campoLiquido.find('#liquido' + nomeTabela).on('keyup', function() {
		
		calculaValorServicomilho(nomeTabela);
		
	});
	
	$campoValor.find('#valor' + nomeTabela).on('focus', function() {
		
		calculaValorServicomilho(nomeTabela);
		
	});
	
	$campoServico.find('#nomeProcuraCadastro' + nomeTabela + 'PrecoDivInput span').on('change', function() {
		
		calculaValorServicomilho(nomeTabela);
		
	});
	
	return $formulario;
	
}
