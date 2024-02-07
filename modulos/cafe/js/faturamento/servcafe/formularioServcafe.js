/* =========================================================
 * formularioServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function formularioServcafe(dados) {
	
	var dataAtual = getJson("getData");
	
	var campoData = campoDataHorizontal(
		"data" + dados.nomeTabela, "Data",
		'col-xs-9 col-md-6', 'col-xs-3',
		true, "0", "0", formataData(dataAtual.data),
		'disabled'
	).removeClass("has-feedback");
	
	var campoServico = campoSqlProcuraTexto(
		"Serviço",
		dados.nomeTabela,
		"Preco",
		"Digite o nome do serviço",
		'col-xs-9 col-md-6', 'col-xs-3'
	);
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-9 col-md-6', 'col-xs-3',
		0, 3, false, false, "", "", "enabled"
	);
	
	var campoValor = campoNumeroHorizontal(
		"valor" + dados.nomeTabela, "Valor",
		'col-xs-9 col-md-6', 'col-xs-3',
		2, 9, false, false, "R$ ", "", "enabled"
	);
	
	var campoObs = campoTextoHorizontal(
		'observacao' + dados.nomeTabela, 'text', 'Observação',
		'col-xs-9 col-md-6', 'col-xs-3',
		'', false, 50, "enabled"
	).removeClass("has-feedback");
	
	var formTela1 = $("<div/>")
		.addClass("form-horizontal")	
		.append(campoData)
		.append(campoServico)
		.append(campoSacas)
		.append(campoValor)
		.append(campoObs);
	
	var formulario = formularioCadastroCore(dados, formTela1);
	
	eval ("setEventosCampos" + dados.nomeTabela + "(dados, formulario)");
	
	return formulario;
	
}
