/* =========================================================
 * formularioSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioSaimilho(idSaimilho, nomeTabela) {
	
	var $campoProdutor = campoSqlProcuraTexto(
		"Produtor",
		nomeTabela,
		"Milho",
		"Digite o nome do produtor",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var $divProdutor = $("<div/>").addClass('col-xs-10 col-md-8').append($campoProdutor);
	
	var $campoLaudo = campoNumeroHorizontal(
		"laudo" + nomeTabela, "N.E",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 0, 6, false, false, "", "", "enabled");
	
	var $campoData = campoDataHorizontal(
		"data" + nomeTabela, "Data",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		true, "0", "0", null,
		'disabled'
	).removeClass("has-feedback");
	
	var $divLaudoData = $("<div/>").addClass("form-horizontal");
	var $divLaudo = $("<div/>").addClass('col-xs-6');
	var $divData = $("<div/>").addClass('col-xs-6');
	
	$divLaudo.append($campoLaudo);
	$divData.append($campoData);

	$divLaudoData.append($divLaudo).append($divData);
	
	var $campoTiket = campoNumeroHorizontal(
		"tiket" + nomeTabela, "Ticket",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 0, 6, false, true, "", ""
	);
	
	var $campoPlaca = campoPlacaHorizontal(
		"placa" + nomeTabela, "Placa",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', false
	);
	
	var $divTiketPlaca = $("<div/>").addClass("form-horizontal");
	var $divTiket = $("<div/>").addClass('col-xs-6');
	var $divPlaca = $("<div/>").addClass('col-xs-6');
	
	$divTiket.append($campoTiket);
	$divPlaca.append($campoPlaca);

	$divTiketPlaca.append($divTiket).append($divPlaca);
	
	var $campoLiquido = campoNumeroHorizontal(
		"liquido" + nomeTabela, "Liquido",
		 'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 8, false, false, "", " kg", "enabled"
	);
	
	var $campoSaldo = campoNumeroHorizontal(
		"saldo" + nomeTabela, "Saldo",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 8, true, true, "", " kg", "disabled"
	);
	
	var $divDados = $("<div/>").addClass("form-horizontal");
	var $divPeso = $("<div/>").addClass('col-xs-6');
	var $divDestino = $("<div/>").addClass('col-xs-6');
	
	$divPeso.append($campoLiquido);
	$divPeso.append($campoSaldo);
	
	var $campoCilo = campoNumeroHorizontal(
		"cilo" + nomeTabela, "Silo",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 0, 1, false, true, "", ""
	);
	
	var $campoDestino = campoTextoHorizontal(
		'destino' + nomeTabela, 'text', 'Destino',
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', '', true, 20
	);
	
	$divDestino.append($campoCilo);
	$divDestino.append($campoDestino);
	
	$divDados.append($divPeso).append($divDestino);
	
	var $campoObs = campoTextoHorizontal("obs" + nomeTabela, "text", "Obs", 9, 2, "", false, 50);
	
	var $formTela1 = $("<div/>").addClass("form-horizontal");
	
	$formTela1.append($divProdutor);
	$formTela1.append($divLaudoData);
	$formTela1.append($divTiketPlaca);
	$formTela1.append($divDados);

	var $telaObservacao = telaObservacao(nomeTabela);
	
	var $formTela2 = $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8 col-md-offset-2")
		.append($telaObservacao);
	
	var $tabs = divTabs(nomeTabela, eval ('nomeTabs' + nomeTabela + '()'));
	
	$tabs.find('#tab' + nomeTabela + '1').addClass('in active');
	$tabs.find('#linha_tab' + nomeTabela + '1').addClass('active');
	
	$tabs.find('#tab' + nomeTabela + '1').append($formTela1);
	$tabs.find('#tab' + nomeTabela + '2').append($formTela2);
	
	var $formulario = formularioCadastro(idSaimilho, nomeTabela, 2, 2, $tabs, 3);
	
	$campoLiquido.find('#liquido' + nomeTabela).css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	$campoSaldo.find('#saldo' + nomeTabela).css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	$campoLiquido.find('#liquido' + nomeTabela).focusout(function() {
		
		verificaLiquidoSaimilho($campoLiquido, nomeTabela);
		
	});
	
	$campoLiquido.find('#liquido' + nomeTabela).on('keyup', function() {
		
		verificaLiquidoSaimilho($campoLiquido, nomeTabela);
		
	});
	
	$campoProdutor.find('#nomeProcuraCadastro' + nomeTabela + 'MilhoDivInput span').on('change', function() {
		
		calculaLiquidoSaimilho(nomeTabela);
		
	});
	
	var laudo = {
		nomeTabela: nomeTabela,
		formulario: $formulario
	};
	
	eventoAcharLaudo(laudo);
	
	return $formulario;
	
}
