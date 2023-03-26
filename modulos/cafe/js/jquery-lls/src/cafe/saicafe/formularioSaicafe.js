/* =========================================================
 * formularioSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function formularioSaicafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe-formacao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-despejo.js", "js");
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
	
	var campoDestino = campoTextoHorizontal(
		'destino' + dados.nomeTabela, 'text', 'Destino',
		'col-xs-9 col-md-6', 'col-xs-3',
		'', true, 50, "enabled"
	);
	
	var divProdutor = $("<div/>")
		.addClass('col-xs-12 col-md-8')
		.append(campoProdutor)
		.append(campoDestino);
	
	var campoData = campoDataHorizontal(
		"data" + dados.nomeTabela, "Data",
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		true, "-3", "0", formataData(guia.data),
		'enabled'
	).removeClass("has-feedback");
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		'', true, 8, "disabled"
	).removeClass("has-feedback");
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 4, false, false, "", "", "enabled"
	);
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		2, 8, false, false, "", " kg", "disabled"
	).removeClass("has-feedback");
	
	var divColuna1 = $("<div/>")
		.addClass('col-xs-7 col-md-6')
		.append(campoSacas)
		.append(campoPeso);
	
	var divColuna2 = $("<div/>")
		.addClass('col-xs-5 col-md-6')
		.append(campoData)
		.append(campoLote);
	
	var divDados = $("<div/>")
		.addClass("form-horizontal")
		.append(divColuna1)
		.append(divColuna2);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")	
		.append(divProdutor)
		.append(divDados);
	
	var formTela2 = telaTabelaCore(dados, 1);
	var formTela3 = formularioObservacaoCore(dados.nomeTabela, "observacao", 9);
	
	var formulario = formularioLancamentoCore(dados, [formTela1, formTela2, formTela3]);
	
	setFormularioCafe(dados, formulario);
	
	return formulario;
	
}
