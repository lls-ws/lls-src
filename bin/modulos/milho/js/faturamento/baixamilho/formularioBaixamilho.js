/* =========================================================
 * formularioBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioBaixamilho(id, nomeTabela) {
	
	var $campoOculto = campoOculto("idServicomilho", id);
	
	var $campoProdutor = campoTextoHorizontal(
		"produtor" + nomeTabela,
		'text',
		'Produtor',
		'col-xs-9 col-md-6' , 'col-xs-3', '', false, 50);
		
	var $campoFazenda = campoTextoHorizontal(
		"fazenda" + nomeTabela,
		'text',
		'Fazenda',
		'col-xs-9 col-md-6' , 'col-xs-3', '', false, 50);
	
	var $campoServico = campoTextoHorizontal(
		"servico" + nomeTabela,
		'text',
		'Serviço',
		'col-xs-9 col-md-6' , 'col-xs-3', '', false, 50);
	
	var $campoLiquido = campoNumeroHorizontal(
		"liquido" + nomeTabela,
		"Líquido",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, false, "", " kg", 'disabled'
	);
	
	var $campoTotal = campoNumeroHorizontal(
		"total" + nomeTabela,
		"Total",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, false, "R$ ", "", 'disabled'
	);
	
	var $campoPago = campoNumeroHorizontal(
		"pago" + nomeTabela,
		"Pago",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, true, "R$ ", "", 'disabled'
	);
	
	var $campoValor = campoNumeroHorizontal(
		"valor" + nomeTabela,
		"Valor",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, false, false, "R$ ", "", 'enabled'
	);
	
	var $campoData = campoDataHorizontal(
		"data" + nomeTabela,
		"Data",
		'col-xs-9 col-md-6', 'col-xs-3',
		true, "0", "0", null,
		'disabled'
	).removeClass("has-feedback");
	
	$campoProdutor.find('#produtor' + nomeTabela).attr('disabled', 'disabled');
	$campoFazenda.find('#fazenda' + nomeTabela).attr('disabled', 'disabled');
	$campoServico.find('#servico' + nomeTabela).attr('disabled', 'disabled');
	
	var $formTela1 = $("<div/>").addClass("form-horizontal");
	
	$formTela1.append($campoOculto)
		.append($campoData)
		.append($campoProdutor)
		.append($campoFazenda)
		.append($campoServico)
		.append($campoLiquido)
		.append($campoTotal)
		.append($campoPago)
		.append($campoValor);
	
	var $telaObservacao = telaObservacao(nomeTabela);
	
	var $formTela2 = $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8 col-md-offset-2")
		.append($telaObservacao);
	
	var $tabs = divTabs(nomeTabela, eval ('nomeTabs' + nomeTabela + '()'));
	
	$tabs.find('#tab' + nomeTabela + '1').addClass('in active');
	$tabs.find('#linha_tab' + nomeTabela + '1').addClass('active');
	
	$tabs.find('#tab' + nomeTabela + '1').append($formTela1);
	$tabs.find('#tab' + nomeTabela + '2').append($formTela2);
	
	$('#divDialogVisualizaServicomilho').empty();
	
	$('#divDialogVisualizaServicomilho').remove();
	
	$('#divDialogVisualizaServicomilho').dialog( "close" );
	
	var $formulario = formularioCadastro(0, nomeTabela, 3, 3, $tabs, 4);

	var servicoBaixamilho = {
		id: id,
		nomeTabela: nomeTabela,
		formulario: $formulario
	}

	eventoAcharServicoBaixamilho(servicoBaixamilho);

	return $formulario;
	
}
