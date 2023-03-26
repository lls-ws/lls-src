/* =========================================================
 * formularioOslote.js
 * http://lls.net.br/
 * ========================================================= */

function formularioOslote(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		'', true, 8, "disabled"
	).removeClass("has-feedback").css("font-weight", "Bold").css("font-size", "15px");
	
	var campoDesdobras = campoNumeroHorizontal(
		"desdobras" + dados.nomeTabela, "Desdobras",
		'col-xs-6 col-sm-6 col-lg-8', 'col-xs-6 col-sm-6 col-lg-4',
		0, 2, false, false, "", "", "enabled"
	).css("font-weight", "Bold").css("font-size", "15px");
	
	var divLote = $("<div/>").addClass('col-xs-6 col-md-6').append(campoLote);
	var divDesdobras = $("<div/>").addClass('col-xs-6 col-md-6').append(campoDesdobras);
	
	var divCampos1 = $("<div/>")
		.addClass("form-horizontal")
		.append(divLote)
		.append(divDesdobras);
	
	var campoSacasDespejo = campoNumeroHorizontal(
		"sacasDespejo" + dados.nomeTabela, "Sacas",
		'col-xs-6 col-sm-6 col-lg-8', 'col-xs-6 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "disabled"
	).css("font-weight", "Bold").css("font-size", "15px");
	
	var campoPesoDespejo = campoNumeroHorizontal(
		"pesoDespejo" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	).css("font-weight", "Bold").css("font-size", "15px");
	
	var divSacasDespejo = $("<div/>").addClass('col-xs-6 col-md-6').append(campoSacasDespejo);
	var divPesoDespejo = $("<div/>").addClass('col-xs-6 col-md-6').append(campoPesoDespejo);
	
	var divCampos2 = $("<div/>")
		.addClass("form-horizontal")
		.append(divSacasDespejo)
		.append(divPesoDespejo);
	
	var campoQuebra = campoNumeroHorizontal(
		"sacasQuebra" + dados.nomeTabela, "Quebra",
		'col-xs-6 col-sm-6 col-lg-8', 'col-xs-6 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "enabled"
	);
	
	var campoPesoQuebra = campoNumeroHorizontal(
		"pesoQuebra" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "enabled"
	);
	
	var divQuebra = $("<div/>").addClass('col-xs-6 col-md-6').append(campoQuebra);
	var divPesoQuebra = $("<div/>").addClass('col-xs-6 col-md-6').append(campoPesoQuebra);
	
	var divCampos3 = $("<div/>")
		.addClass("form-horizontal")
		.append(divQuebra)
		.append(divPesoQuebra);
	
	var campoAcrescimo = campoNumeroHorizontal(
		"sacasAcrescimo" + dados.nomeTabela, "Acréscimo",
		'col-xs-6 col-sm-6 col-lg-8', 'col-xs-6 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "enabled"
	);
	
	var campoPesoAcrescimo = campoNumeroHorizontal(
		"pesoAcrescimo" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "enabled"
	);
	
	var divAcrescimo = $("<div/>").addClass('col-xs-6 col-md-6').append(campoAcrescimo);
	var divPesoAcrescimo = $("<div/>").addClass('col-xs-6 col-md-6').append(campoPesoAcrescimo);
	
	var divCampos4 = $("<div/>")
		.addClass("form-horizontal")
		.append(divAcrescimo)
		.append(divPesoAcrescimo);
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Resultado",
		'col-xs-6 col-sm-6 col-lg-8', 'col-xs-6 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "disabled"
	);
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	);
	
	var divSacas = $("<div/>").addClass('col-xs-6 col-md-6').append(campoSacas);
	var divPeso = $("<div/>").addClass('col-xs-6 col-md-6').append(campoPeso);
	
	var divCampos5 = $("<div/>")
		.addClass("form-horizontal")
		.append(divSacas)
		.append(divPeso);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")
		.append(divCampos1)
		.append(divCampos2)
		.append(divCampos3)
		.append(divCampos4)
		.append(divCampos5);
	
	dados.nomeTabelaLancamento.splice(0, 1);
	
	var arrayTela = [];
	
	arrayTela[0] = formTela1;
	
	for(var i = 0; i < dados.nomeTabelaLancamento.length; i++) {
		
		arrayTela[i+1] = telaTabelaCore(dados, 2, i);
		
	}
	
	var formulario = formularioLancamentoCore(dados, arrayTela);
	
	setFormularioCafe(dados, formulario);
	
	return formulario;
	
}
