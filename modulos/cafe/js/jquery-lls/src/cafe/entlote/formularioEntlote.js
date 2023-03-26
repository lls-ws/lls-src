/* =========================================================
 * formularioEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function formularioEntlote(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		'', true, 8, "disabled"
	);
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "enabled"
	);
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "enabled"
	);
	
	var campoDesdobras = campoNumeroHorizontal(
		"desdobras" + dados.nomeTabela, "Desdobras",
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		0, 2, false, false, "", "", "enabled"
	);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal col-xs-12 col-md-8")
		.append(campoLote)
		.append(campoSacas)
		.append(campoPeso)
		.append(campoDesdobras);
	
	var formTela2 = telaTabelaCore(dados, 2);
	
	var formulario = formularioLancamentoCore(dados, [formTela1, formTela2]);
	
	setFormularioCafe(dados, formulario);
	
	return formulario;
	
}
