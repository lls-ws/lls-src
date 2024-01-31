/* =========================================================
 * formularioEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioEntmilho(idEntmilho, nomeTabela) {
	
	var laudo = getJson("achaLaudo");
	
	var precoEntmilho = pegaPrecoEntmilho();
	
	var $campoProdutor = campoSqlProcuraTexto(
		"Produtor",
		nomeTabela,
		"FazendaProdutor",
		"Digite o nome do produtor",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var $divProdutor = $("<div/>").addClass('col-xs-10 col-md-8').append($campoProdutor);
	
	var $campoTiket = campoNumeroHorizontal(
		"tiket" + nomeTabela, "Ticket",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 0, 11, false, true, "", ""
	);
	
	var $campoData = campoDataHorizontal(
		"data" + nomeTabela, "Data",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		true, "-3", "0", formataData(laudo.data),
		'enabled'
	).removeClass("has-feedback");
	
	var $divTiketData = $("<div/>").addClass("form-horizontal");
	var $divTiket = $("<div/>").addClass('col-xs-6');
	var $divData = $("<div/>").addClass('col-xs-6');
	
	$divTiket.append($campoTiket);
	$divData.append($campoData);

	$divTiketData.append($divTiket).append($divData);
	
	var $campoPlaca = campoPlacaHorizontal(
		"placa" + nomeTabela, "Placa",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', false
	);
	
	var $campoLaudo = campoNumeroHorizontal(
		"laudo" + nomeTabela, "Laudo",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 0, 11, false, false, "", "", "disabled"
	);
	
	var $divPlacaLaudo = $("<div/>").addClass("form-horizontal");
	var $divPlaca = $("<div/>").addClass('col-xs-6');
	var $divLaudo= $("<div/>").addClass('col-xs-6');
	
	$divPlaca.append($campoPlaca);
	$divLaudo.append($campoLaudo);

	$divPlacaLaudo.append($divPlaca).append($divLaudo);
	
	var $campoBruto = campoNumeroHorizontal(
		"bruto" + nomeTabela, "Bruto",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 7, false, false, "", " kg");
	
	var $campoImpureza = campoNumeroHorizontal(
		"impureza" + nomeTabela, "Impureza",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 4, false, true, "", " %", "disabled"
	);
	
	var $campoChocho = campoNumeroHorizontal(
		"chocho" + nomeTabela, "Chocho",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 4, false, true, "", " %", "disabled");
	
	var $campoQuirela = campoNumeroHorizontal(
		"quirela" + nomeTabela, "Quirela",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 4, false, true, "", " %", "disabled");
	
	var $campoUmidade = campoSqlProcuraNumero(
		nomeTabela,
		"Umidade",
		"Umidade",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 4, false, false, "", " %", "enabled");
	
	var $campoLiquido = campoNumeroHorizontal(
		"liquido" + nomeTabela, "Liquido",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 8, false, false, "", " kg", "disabled");	
	
	var $divDados = $("<div/>").addClass("form-horizontal");
	var $divPeso = $("<div/>").addClass('col-xs-6');
	var $divValores = $("<div/>").addClass('col-xs-6');
	
	$divPeso.append($campoBruto);
	$divPeso.append($campoImpureza);
	$divPeso.append($campoChocho);
	$divPeso.append($campoQuirela);
	$divPeso.append($campoUmidade);
	$divPeso.append($campoLiquido);
	
	var $campoCilo = campoNumeroHorizontal(
		"cilo" + nomeTabela, "Silo",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 0, 11, false, true, "", ""
	);
	
	var $campoSecagem = campoNumeroHorizontal(
		"secagem" + nomeTabela, "Secagem",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 6, false, true, "R$ ", "", "disabled"
	);
	
	var $campoLimpeza = campoNumeroHorizontal(
		"limpeza" + nomeTabela, "Limpeza",
		 'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 6, false, true, "R$ ", "", "disabled"
		);
	
	var $campoCarga = campoNumeroHorizontal(
		"carga" + nomeTabela, "Carga",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 6, false, true, "R$ ", "", "disabled");
	
	var $campoRecepcao = campoNumeroHorizontal(
		"recepcao" + nomeTabela, "Recepção",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 6, false, true, "R$ ", "", "disabled");
	
	var $campoTotal = campoNumeroHorizontal(
		"total" + nomeTabela, "Total",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', 2, 6, false, false, "R$ ", "", "disabled");
	
	$divValores.append($campoCilo);
	$divValores.append($campoSecagem);
	$divValores.append($campoLimpeza);
	$divValores.append($campoCarga);
	$divValores.append($campoRecepcao);
	$divValores.append($campoTotal);

	$divDados.append($divPeso).append($divValores);
	
	var $formTela1 = $("<div/>").addClass("form-horizontal");
	
	$formTela1.append($divProdutor);
	$formTela1.append($divTiketData);
	$formTela1.append($divPlacaLaudo);
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
	
	var $formulario = formularioCadastro(idEntmilho, nomeTabela, 2, 3, $tabs, 4);
	
	$campoLaudo.find('#laudo' + nomeTabela)
		.val(laudo.laudo)
		.css("font-weight", "Bold")
		.css("font-size", "15px");
	
	$campoLiquido.find('#liquido' + nomeTabela).css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
		
	$campoBruto.find('#bruto' + nomeTabela).css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
		
	$campoTotal.find('#total' + nomeTabela).css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	$campoBruto.find('#bruto' + nomeTabela).focusout(function() {
		
		verificaBruto($campoBruto, nomeTabela, precoEntmilho);
		
	});
	
	$campoBruto.find('#bruto' + nomeTabela).on('keyup', function() {
		
		verificaBruto($campoBruto, nomeTabela, precoEntmilho);
		
	});
	
	$campoLiquido.find('#liquido' + nomeTabela).focusout(function() {
		
		verificaLiquido(nomeTabela);
		
	});
	
	$campoLiquido.find('#liquido' + nomeTabela).on('keyup', function() {
		
		verificaLiquido(nomeTabela);
		
	});
	
	$campoImpureza.find('#impureza' + nomeTabela).on('keyup', function() {
		
		calculaLiquidoEntmilho(nomeTabela);
		
	});
	
	$campoChocho.find('#chocho' + nomeTabela).on('keyup', function() {
		
		calculaLiquidoEntmilho(nomeTabela);
		
	});
	
	$campoQuirela.find('#quirela' + nomeTabela).on('keyup', function() {
		
		calculaLiquidoEntmilho(nomeTabela);
		
	});
	
	$campoUmidade.find('#numeroProcuraCadastro' + nomeTabela + 'UmidadeDivInput span').on('change', function() {
		
		var valorBruto = formataNumeroSql($('#brutoEntmilho').val());
		
		$campoBruto.find('#bruto' + nomeTabela).removeAttr('disabled');
		
		calculaLiquidoEntmilho(nomeTabela);
		
		calculaTotalEntmilho(nomeTabela);
		
	});
	
	$campoSecagem.find('#secagem' + nomeTabela).on('keyup', function() {
		
		calculaTotalEntmilho(nomeTabela);
		
	});
	
	$campoLimpeza.find('#limpeza' + nomeTabela).on('keyup', function() {
		
		calculaTotalEntmilho(nomeTabela);
		
	});
	
	$campoCarga.find('#carga' + nomeTabela).on('keyup', function() {
		
		calculaTotalEntmilho(nomeTabela);
		
	});
	
	$campoRecepcao.find('#recepcao' + nomeTabela).on('keyup', function() {
		
		calculaTotalEntmilho(nomeTabela);
		
	});
	
	return $formulario;
	
}
