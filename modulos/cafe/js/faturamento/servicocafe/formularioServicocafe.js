/* =========================================================
 * formularioServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function formularioServicocafe(dados) {
	
	var dataAtual = getJson("getData");
	
	var campoProdutor = campoSqlProcuraTexto(
		"Produtor",
		dados.nomeTabela,
		"FazendaProdutor",
		"Digite o nome do produtor",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var campoServico = campoSqlProcuraTexto(
		"Serviço",
		dados.nomeTabela,
		"Preco",
		"Digite o nome do serviço",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "enabled"
	);
	
	var campoValor = campoNumeroHorizontal(
		"valor" + dados.nomeTabela, "Valor",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		2, 9, false, false, "R$ ", "", "enabled"
	);
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		'', false, 10, "enabled"
	).removeClass("has-feedback");
	
	var campoData = campoDataHorizontal(
		"data" + dados.nomeTabela, "Data",
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		true, "-3", "0", formataData(dataAtual.data),
		'enabled'
	).removeClass("has-feedback");
	
	var divProdutor = $("<div/>")
		.addClass('col-xs-12 col-md-8')
		.append(campoProdutor);
		
	var divServico = $("<div/>")
		.addClass('col-xs-12 col-md-8')
		.append(campoServico);
	
	var divColuna1 = $("<div/>")
		.addClass('col-xs-7 col-md-6')
		.append(campoSacas)
		.append(campoValor);
	
	var divColuna2 = $("<div/>")
		.addClass('col-xs-5 col-md-6')	
		.append(campoLote)
		.append(campoData);
	
	var divDados = $("<div/>")
		.addClass("form-horizontal")
		.append(divColuna1)
		.append(divColuna2);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")	
		.append(divProdutor)
		.append(divServico)
		.append(divDados);
	
	var formTela2 = formularioObservacaoCore(dados.nomeTabela, "observacao", 9);
	
	var formulario = formularioLancamentoCore(dados, [formTela1, formTela2]);
	
	eval ("setEventosCampos" + dados.nomeTabela + "(dados, formulario)");
	
	return formulario;
	
}
