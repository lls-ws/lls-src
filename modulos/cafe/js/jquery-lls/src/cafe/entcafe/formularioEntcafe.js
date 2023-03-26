/* =========================================================
 * formularioEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function formularioEntcafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-placa.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe-formacao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-sqlProcura.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-sqlProcuraFazendaProdutor.js", "js");
	
	var guia = getJson("getGuia" + dados.nomeTabela);
	
	dados.lote = guia.lote;
	
	var campoProdutor = campoSqlProcuraTexto(
		"Produtor",
		dados.nomeTabela,
		"FazendaProdutor",
		"Digite o nome do produtor",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var divProdutor = $("<div/>")
		.addClass('col-xs-12 col-md-8')
		.append(campoProdutor);
	
	var campoTicket = campoNumeroHorizontal(
		"ticket" + dados.nomeTabela, "Ticket",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 11, false, true, "", "disabled"
	);
	
	var campoData = campoDataHorizontal(
		"data" + dados.nomeTabela, "Data",
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		true, "-3", "0", formataData(guia.data),
		'enabled'
	).removeClass("has-feedback");
	
	var campoPlaca = campoPlacaHorizontal(
		"placa" + dados.nomeTabela, "Placa",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4', false
	);
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		'', true, 8, "disabled"
	).removeClass("has-feedback");
	
	var campoNota = campoTextoHorizontal(
		'nota' + dados.nomeTabela, 'text', 'Número Nota',
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		'', false, 10, "enabled"
	).removeClass("has-feedback");
	
	var campoValor = campoNumeroHorizontal(
		"valor" + dados.nomeTabela, "Valor Nota",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		2, 9, false, true, "R$ ", "", "enabled"
	).removeClass("has-feedback");
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas Nota",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "enabled"
	);
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso Nota",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	);
	
	var divColuna1 = $("<div/>")
		.addClass('col-xs-7 col-md-6')
		.append(campoTicket)
		.append(campoPlaca)
		.append(campoSacas)
		.append(campoPeso);
	
	var divColuna2 = $("<div/>")
		.addClass('col-xs-5 col-md-6')	
		.append(campoData)
		.append(campoLote)
		.append(campoNota)
		.append(campoValor);
	
	var divDados = $("<div/>")
		.addClass("form-horizontal")
		.append(divColuna1)
		.append(divColuna2);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")	
		.append(divProdutor)
		.append(divDados);

	var formTela2 = formularioObservacaoCore(dados.nomeTabela, "observacao", 9);
	
	var formulario = formularioLancamentoCore(dados, [formTela1, formTela2]);
	
	setFormularioCafe(dados, formulario);
	
	return formulario;
	
}
