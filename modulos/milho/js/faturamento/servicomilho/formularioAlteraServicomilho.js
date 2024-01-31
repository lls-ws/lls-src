/* =========================================================
 * formularioAlteraServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioAlteraServicomilho(servicomilho) {
	
	var idFazenda = "idnomeProcuraCadastro" + servicomilho.nomeTabela + "FazendaProdutor";
	var idServico = "idnomeProcuraCadastro" + servicomilho.nomeTabela + "Preco";
	
	var $campoFazendaOculto = campoOculto(idFazenda, servicomilho.idFazenda);
	var $campoServicoOculto = campoOculto(idServico, servicomilho.idServico);
	
	var $campoProdutor = campoTextoHorizontal(
		"produtor" + servicomilho.nomeTabela,
		'text',
		'Produtor',
		'col-xs-9 col-md-6' , 'col-xs-3', '', false, 50);
	
	var $campoServico = campoTextoHorizontal(
		"servico" + servicomilho.nomeTabela,
		'text',
		'Serviço',
		'col-xs-9 col-md-6' , 'col-xs-3', '', false, 50);
	
	var $campoLiquido = campoNumeroHorizontal(
		"liquido" + servicomilho.nomeTabela,
		"Líquido",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, false, "", " kg"
	);
	
	var $campoValor = campoNumeroHorizontal(
		"valor" + servicomilho.nomeTabela,
		"Valor",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, false, "R$ ", ""
	);
	
	var $campoData = campoDataHorizontal(
		"data" + servicomilho.nomeTabela,
		"Data",
		'col-xs-9 col-md-6', 'col-xs-3',
		true, "0", "0", servicomilho.data,
		'disabled'
	).removeClass("has-feedback");
	
	var $formTela1 = $("<div/>").addClass("form-horizontal");
	
	$formTela1.append($campoFazendaOculto);
	$formTela1.append($campoServicoOculto);
	$formTela1.append($campoData);
	$formTela1.append($campoProdutor);
	$formTela1.append($campoServico);
	$formTela1.append($campoLiquido);
	$formTela1.append($campoValor);

	var $telaObservacao = telaObservacao(servicomilho.nomeTabela);
	
	var $formTela2 = $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8 col-md-offset-2")
		.append($telaObservacao);
	
	var $tabs = divTabs(servicomilho.nomeTabela, eval ('nomeTabs' + servicomilho.nomeTabela + '()'));
	
	$tabs.find('#tab' + servicomilho.nomeTabela + '1').addClass('in active');
	$tabs.find('#linha_tab' + servicomilho.nomeTabela + '1').addClass('active');
	
	$tabs.find('#tab' + servicomilho.nomeTabela + '1').append($formTela1);
	$tabs.find('#tab' + servicomilho.nomeTabela + '2').append($formTela2);
	
	var $formulario = formularioCadastro(servicomilho.id, servicomilho.nomeTabela, 2, 2, $tabs, 4);
	
	return $formulario;
	
}
