/* =========================================================
 * formularioTralote.js
 * http://lls.net.br/
 * ========================================================= */

function formularioTralote(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "disabled"
	).removeClass("has-feedback");
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	).removeClass("has-feedback");
	
	var divSacas = $("<div/>").addClass('col-xs-6 col-md-6').append(campoSacas);
	var divPeso = $("<div/>").addClass('col-xs-6 col-md-6').append(campoPeso);
	
	var divCampos1 = $("<div/>")
		.addClass("form-horizontal")
		.append(divSacas)
		.append(divPeso);
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		'', true, 8, "disabled"
	).removeClass("has-feedback").css("font-weight", "Bold").css("font-size", "15px");
	
	var campoDesdobras = campoNumeroHorizontal(
		"desdobras" + dados.nomeTabela, "Desdobras",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 2, false, false, "", "", "enabled"
	).css("font-weight", "Bold").css("font-size", "15px");
	
	var divLote = $("<div/>").addClass('col-xs-6 col-md-6').append(campoLote);
	var divDesdobras = $("<div/>").addClass('col-xs-6 col-md-6').append(campoDesdobras);
	
	var divCampos2 = $("<div/>")
		.addClass("form-horizontal")
		.append(divLote)
		.append(divDesdobras);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")
		.append(divCampos1)
		.append(divCampos2);
	
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
