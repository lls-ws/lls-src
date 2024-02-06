/* =========================================================
 * formularioPeso.js
 * http://lls.net.br/
 * ========================================================= */

function formularioPeso(dados) {
	
	//return mostraDialogBalanca();
	
	return getBalancaPeso();
	
	//campoPeso.find("#peso" + dados.nomeTabela).val(pesoBalanca);
	
	var guia = getJson("getGuiaPeso");
	
	var campoData = campoDataHorizontal(
		"data" + dados.nomeTabela, "Data",
		'col-xs-8 col-md-6', 'col-xs-4 col-md-6',
		true, "0", "0", formataData(guia.data),
		'disabled'
	).removeClass("has-feedback");
	
	var campoTicket = campoNumeroHorizontal(
		"ticket" + dados.nomeTabela, "Ticket",
		'col-xs-8 col-md-7', 'col-xs-4 col-md-5',
		0, 11, false, true, "", "", "disabled"
	).removeClass("has-feedback");
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	);
	
	var campoProdutor = campoSqlProcuraTexto(
		"Produtor",
		dados.nomeTabela,
		"FazendaProdutor",
		"Digite o nome do produtor",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4'
	);
	
	var campoPlaca = campoPlacaHorizontal(
		"placa" + dados.nomeTabela, "Placa",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		false
	);
	
	var campoDestino = campoTextoHorizontal(
		'destino' + dados.nomeTabela, 'text', 'Destino',
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		'', false, 50, "enabled"
	).removeClass("has-feedback");
	
	var campoMotorista = campoTextoHorizontal(
		'motorista' + dados.nomeTabela, 'text', 'Motorista',
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		'', false, 50, "enabled"
	).removeClass("has-feedback");
	
	var caixaCombinacaoProdutos = caixaCombinacaoHorizontal(
		'produto' + dados.nomeTabela,
		'Produto',
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		false,
		{
			"": "Selecione",
			"CAFE": "Café",
			"MILHO": "Milho",
			"OUTROS": "Outros"
		}
	);
	
	var campoDescricao = campoTextoHorizontal(
		'descricao' + dados.nomeTabela, 'text', 'Descrição',
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		'', false, 50, "disabled"
	).removeClass("has-feedback");
	
	var campoObservacao = campoTextoHorizontal(
		'observacao' + dados.nomeTabela, 'text', 'Observação',
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		'', false, 50, "enabled"
	).removeClass("has-feedback");
	
	var pesoLabel = label(
		dados.nomeTabela.toLowerCase(),
		"0,00 kg",
		'texto_enorme texto_cor_azul col-xs-12 col-md-12'
	);
	
	var caixaRadioTipos = caixaRadioHorizontal(
		'tipo' + dados.nomeTabela,
		{
			"TARA": "Tara",
			"BRUTO": "Bruto"
		}
	);
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		'', true, 8, "disabled"
	).removeClass("has-feedback");
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "enabled"
	);
	
	var campoNota = campoTextoHorizontal(
		'nota' + dados.nomeTabela, 'text', 'Número Nota',
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		'', false, 10, "enabled"
	).removeClass("has-feedback");
	
	var campoValor = campoNumeroHorizontal(
		"valor" + dados.nomeTabela, "Valor Nota",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 9, false, true, "R$ ", "", "enabled"
	).removeClass("has-feedback");
	
	var divData = $("<div/>")
		.attr('id', 'dataDiv' + dados.nomeTabela)
		.addClass('col-xs-7 col-md-8')
		.append(campoData);
	
	var divTicket = $("<div/>")
		.attr('id', 'ticketDiv' + dados.nomeTabela)
		.addClass('col-xs-5 col-md-4')
		.append(campoTicket);
	
	var divColuna1 = $("<div/>")
		.addClass('col-xs-12 col-md-6')
		.append(divData)
		.append(divTicket)
		.append(campoPeso)
		.append(campoProdutor)
		.append(campoPlaca)
		.append(campoDestino)
		.append(campoMotorista)
		.append(caixaCombinacaoProdutos)
		.append(campoDescricao)
		.append(campoObservacao);
	
	var divLabel = $("<div/>")
		.addClass("form-group")
		.append(pesoLabel);
	
	var divColuna2 = $("<div/>")
		.addClass('col-xs-12 col-md-6')
		.append(divLabel)
		.append(caixaRadioTipos)
		.append(campoLote)
		.append(campoSacas)
		.append(campoNota)
		.append(campoValor);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")	
		.append(divColuna1)
		.append(divColuna2);
	
	var formulario = formularioLancamentoCore(dados, formTela1);
	
	formulario.find('#botaoFormGroup div')
		.removeClass('col-sm-offset-3')
		.addClass('col-sm-offset-4');
	
	campoTicket.find("#ticket" + dados.nomeTabela).val(guia.ticket);
	campoLote.find("#lote" + dados.nomeTabela).val(guia.lote);
	
	eval ("setEventosCampos" + dados.nomeTabela + "(dados, formulario)");
	
	return formulario;
	
}
