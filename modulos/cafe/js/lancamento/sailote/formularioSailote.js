/* =========================================================
 * formularioSailote.js
 * http://lls.net.br/
 * ========================================================= */

function formularioSailote(dados) {
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		'', true, 8, "disabled"
	).removeClass("has-feedback").css("font-weight", "Bold").css("font-size", "15px");
	
	var campoTicket = campoTextoHorizontal(
		'ticket' + dados.nomeTabela, 'text', 'Ticket',
		'col-xs-8 col-sm-6 col-lg-8', 'col-xs-4 col-sm-6 col-lg-4',
		'', true, 8, "enabled"
	);
	
	var divLote = $("<div/>").addClass('col-xs-6 col-md-6').append(campoLote);
	var divTicket = $("<div/>").addClass('col-xs-6 col-md-6').append(campoTicket);
	
	var divCampos1 = $("<div/>")
		.addClass("form-horizontal")
		.append(divLote)
		.append(divTicket);
	
	var campoSacasDespejo = campoNumeroHorizontal(
		"sacasDespejo" + dados.nomeTabela, "Sacas",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 3, false, false, "", "", "disabled"
	).css("font-weight", "Bold").css("font-size", "15px");
	
	var campoPesoDespejo = campoNumeroHorizontal(
		"pesoDespejo" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	).removeClass("has-feedback").css("font-weight", "Bold").css("font-size", "15px");
	
	var divSacasDespejo = $("<div/>").addClass('col-xs-6 col-md-6').append(campoSacasDespejo);
	var divPesoDespejo = $("<div/>").addClass('col-xs-6 col-md-6').append(campoPesoDespejo);
	
	var divCampos2 = $("<div/>")
		.addClass("form-horizontal")
		.append(divSacasDespejo)
		.append(divPesoDespejo);
	
	var campoSacasReal = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Saída",
		'col-xs-7 col-sm-6 col-lg-8', 'col-xs-5 col-sm-6 col-lg-4',
		0, 4, false, false, "", "", "enabled"
	);
	
	var campoPesoReal = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 8, false, false, "", " kg", "enabled"
	);
	
	var divSacasReal = $("<div/>").addClass('col-xs-6 col-md-6').append(campoSacasReal);
	var divPesoReal = $("<div/>").addClass('col-xs-6 col-md-6').append(campoPesoReal);
	
	var divCampos3 = $("<div/>")
		.addClass("form-horizontal")
		.append(divSacasReal)
		.append(divPesoReal);
	
	var campoCobrar = caixaVerificacaoHorizontal(
		"cobrar" + dados.nomeTabela,
		"Cobrar Carga"
	);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal panel-group")
		.append(divCampos1)
		.append(divCampos2)
		.append(divCampos3)
		.append(campoCobrar);
	
	var formTela2 = formularioObservacaoCore(dados.nomeTabela, "observacao", 9);
	
	var formulario = formularioLancamentoCore(dados, [formTela1, formTela2]);
	
	setFormularioCafe(dados, formulario);
	
	return formulario;
	
}
