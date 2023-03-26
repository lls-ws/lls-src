/* =========================================================
 * formularioBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function formularioBaixacafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	var campoData = campoDataHorizontal(
		"data" + dados.nomeTabela,
		"Data",
		'col-xs-9 col-md-6', 'col-xs-3',
		true, "0", "0", dados.data,
		'disabled'
	).removeClass("has-feedback");
	
	var campoProdutor = campoTextoHorizontal(
		"produtor" + dados.nomeTabela, 'text', 'Produtor',
		'col-xs-9 col-md-6' , 'col-xs-3',
		'', false, 50, "disabled"
	);
		
	var campoFazenda = campoTextoHorizontal(
		"fazenda" + dados.nomeTabela, 'text', 'Fazenda',
		'col-xs-9 col-md-6' , 'col-xs-3',
		'', false, 50, "disabled"
	);
	
	var campoServico = campoTextoHorizontal(
		"servico" + dados.nomeTabela, 'text', 'Serviço',
		'col-xs-9 col-md-6' , 'col-xs-3',
		'', false, 50, "disabled"
	);
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-9 col-md-6', 'col-xs-3',
		0, 3, false, false, "", "", "disabled"
	);
	
	var campoTotal = campoNumeroHorizontal(
		"total" + dados.nomeTabela, "Total",
		'col-xs-9 col-md-6', 'col-xs-3',
		2, 9, false, false, "R$ ", "", 'disabled'
	);
	
	var campoPago = campoNumeroHorizontal(
		"pago" + dados.nomeTabela, "Pago",
		'col-xs-9 col-md-6', 'col-xs-3',
		2, 9, false, true, "R$ ", "", 'disabled'
	);
	
	var campoValor = campoNumeroHorizontal(
		"valor" + dados.nomeTabela, "Valor",
		'col-xs-9 col-md-6', 'col-xs-3',
		2, 9, false, false, "R$ ", "", 'enabled'
	);
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")
		.append(campoData)
		.append(campoProdutor)
		.append(campoFazenda)
		.append(campoServico)
		.append(campoSacas)
		.append(campoTotal)
		.append(campoPago)
		.append(campoValor);
	
	var formTela2 = formularioObservacaoCore(dados.nomeTabela, "observacao", 9);
	
	var formulario = formularioLancamentoCore(dados, [formTela1, formTela2]);
	
	return formulario;
	
}
