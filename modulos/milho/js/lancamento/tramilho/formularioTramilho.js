/* =========================================================
 * formularioTramilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioTramilho(idTramilho, nomeTabela) {
	
	var $idTela = "div" + nomeTabela;
	
	var $campoData = campoDataHorizontal(
		"data" + nomeTabela, "Data Transferência",
		'col-xs-9 col-md-6', 'col-xs-3',
		true, "0", "0", null,
		'disabled'
	).removeClass("has-feedback");
	
	var $campoProdutorSaida = campoSqlProcuraTexto(
		"Produtor Saída",
		nomeTabela,
		"Milho",
		"Digite o nome do produtor",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var $campoProdutorEntrada = campoSqlProcuraTexto(
		"Produtor Entrada",
		nomeTabela,
		"FazendaProdutor",
		"Digite o nome do produtor",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var $campoLiquido = campoNumeroHorizontal(
		"liquido" + nomeTabela, "Líquido Transferido",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 8, false, false, "", " kg"
	);
	
	var $campoSaldo = campoNumeroHorizontal(
		"saldo" + nomeTabela, "Saldo",
		'col-xs-9 col-md-6', 'col-xs-3', 2, 9, true, true, "", " kg", "disabled"
	);
	
	$campoSaldo.find('#saldo' + nomeTabela)
		.css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	$campoLiquido.find('#liquido' + nomeTabela)
		.css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	var $formTela1 = $("<div/>").attr({id: $idTela}).addClass("form-horizontal");
	
	$formTela1.append($campoProdutorSaida)
		.append($campoProdutorEntrada)
		.append($campoData)
		.append($campoLiquido)
		.append($campoSaldo);
	
	var $telaObservacao = telaObservacao(nomeTabela);
	
	var $formTela2 = $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8 col-md-offset-1")
		.append($telaObservacao);
	
	var $tabs = divTabs(nomeTabela, eval ('nomeTabs' + nomeTabela + '()'));
	
	$tabs.find('#tab' + nomeTabela + '1').addClass('in active');
	$tabs.find('#linha_tab' + nomeTabela + '1').addClass('active');
	
	$tabs.find('#tab' + nomeTabela + '1').append($formTela1);
	$tabs.find('#tab' + nomeTabela + '2').append($formTela2);
	
	var $formulario = formularioCadastro(idTramilho, nomeTabela, 2, 2, $tabs, 3);
	
	$formulario.find("#botaoFormGroup").find('div').addClass('col-md-2 col-md-offset-4');
	
	$campoLiquido.find('#liquido' + nomeTabela).focusout(function() {
		
		verificaLiquidoSaimilho($campoLiquido, nomeTabela);
		
		setObservacaoTransferenciaMilho(nomeTabela);
		
	});
	
	$campoLiquido.find('#liquido' + nomeTabela).on('keyup', function() {
		
		verificaLiquidoSaimilho($campoLiquido, nomeTabela);
		
		setObservacaoTransferenciaMilho(nomeTabela);
		
	});
	
	$campoProdutorSaida.find('#nomeProcuraCadastro' + nomeTabela + 'MilhoDivInput span').on('change', function() {
		
		calculaLiquidoSaimilho(nomeTabela);
		
	});
	
	var laudo = {
		nomeTabela: nomeTabela,
		formulario: $formulario
	};
	
	eventoAcharLaudo(laudo);
	
	return $formulario;
	
}
