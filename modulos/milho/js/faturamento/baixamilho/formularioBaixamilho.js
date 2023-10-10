/* =========================================================
 * formularioBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioBaixamilho(idServicomilho, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	var servicomilho = getJsonById("baixaServicomilho", idServicomilho);
	
	servicomilho.produtor = decodeURIComponent(servicomilho.produtor);
	servicomilho.fazenda = decodeURIComponent(servicomilho.fazenda);
	servicomilho.servico = decodeURIComponent(servicomilho.servico);
	
	servicomilho.data = formataData(servicomilho.data);
	servicomilho.liquido = formataNumero(servicomilho.liquido, 2, true, true, "", " kg");
	servicomilho.total = formataNumero(servicomilho.total, 2, true, true, "R$ ", "");
	servicomilho.pago = formataNumero(servicomilho.pago, 2, true, true, "R$ ", "");
	servicomilho.valor = formataNumero(servicomilho.valor, 2, true, true, "R$ ", "");
	
	var $campoOculto = campoOculto("idServicomilho", idServicomilho);
	
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
		true, "0", "0", servicomilho.data,
		'disabled'
	).removeClass("has-feedback");
	
	$campoProdutor.find('#produtor' + nomeTabela).attr('disabled', 'disabled');
	$campoFazenda.find('#fazenda' + nomeTabela).attr('disabled', 'disabled');
	$campoServico.find('#servico' + nomeTabela).attr('disabled', 'disabled');
	
	$campoProdutor.find('#produtor' + nomeTabela).val(servicomilho.produtor);
	$campoFazenda.find('#fazenda' + nomeTabela).val(servicomilho.fazenda);
	$campoServico.find('#servico' + nomeTabela).val(servicomilho.servico);
	$campoLiquido.find('#liquido' + nomeTabela).val(servicomilho.liquido);
	$campoTotal.find('#total' + nomeTabela).val(servicomilho.total);
	$campoPago.find('#pago' + nomeTabela).val(servicomilho.pago);
	$campoValor.find('#valor' + nomeTabela).val(servicomilho.valor);
	
	var $formTela1 = $("<div/>").addClass("form-horizontal");
	
	$formTela1.append($campoOculto);
	$formTela1.append($campoData);
	$formTela1.append($campoProdutor);
	$formTela1.append($campoFazenda);
	$formTela1.append($campoServico);
	$formTela1.append($campoLiquido);
	$formTela1.append($campoTotal);
	$formTela1.append($campoPago);
	$formTela1.append($campoValor);
	
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

	return $formulario;
	
}
