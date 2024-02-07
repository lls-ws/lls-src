/* =========================================================
 * formularioDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function formularioDespejo(dados) {
	
	var campoSacasAltera = campoOculto("sacasAltera" + dados.nomeTabela, 0);
	var campoPesoAltera = campoOculto("pesoAltera" + dados.nomeTabela, 0);
	var campoSacasTotal = campoOculto("sacasTotal" + dados.nomeTabela, 0);
	var campoPesoTotal = campoOculto("pesoTotal" + dados.nomeTabela, 0);
	var campoObservacao = campoOculto("observacao" + dados.nomeTabela, "");
	var campoPilha = campoOculto("pilha" + dados.nomeTabela, "");
	
	dados["campoProcura"] = "Lote";
	
	var campoLote = campoSqlProcuraTextoCore({
		textoLabel: "Lote",
		nomeTabela: dados.nomeTabela,
		nomeTabelaCadastro: dados.nomeTabelaCadastro,
		campoProcura: dados.campoProcura,
		placeholder: "Digite o número do lote",
		tamanhoCampo: 'col-xs-9 col-md-6',
		tamanhoLabel: 'col-xs-3',
		minChars: 5,
		maxlength: 10
	});
	
	var campoSacasSaldo = campoNumeroHorizontal(
		"sacasSaldo" + dados.nomeTabela, "Saldo Sacas",
		'col-xs-9 col-md-6', 'col-xs-3',
		0, 3, false, false, "", "", "disabled"
	);
	
	var campoPesoSaldo = campoNumeroHorizontal(
		"pesoSaldo" + dados.nomeTabela, "Saldo Peso",
		'col-xs-9 col-md-6', 'col-xs-3',
		2, 7, false, false, "", " kg", "disabled"
	);
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-9 col-md-6', 'col-xs-3',
		0, 3, false, false, "", "", "disabled"
	);
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-9 col-md-6', 'col-xs-3',
		2, 7, false, false, "", " kg", "enabled"
	);
	
	var formTela = $("<div/>")
		.addClass("form-horizontal")
		.append(campoLote)
		.append(campoSacasSaldo)
		.append(campoPesoSaldo)
		.append(campoSacas)
		.append(campoPeso)
		.append(campoObservacao)
		.append(campoPilha)
		.append(campoSacasAltera)
		.append(campoPesoAltera)
		.append(campoSacasTotal)
		.append(campoPesoTotal);
		
	
	var formulario = formularioCadastroCore(dados, formTela);
	
	setFormularioCafe(dados, formulario);
	
	formulario.find('#sacasSaldo' + dados.nomeTabela)
		.css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	formulario.find('#pesoSaldo' + dados.nomeTabela)
		.css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura)
		.addClass("text-uppercase");
	
	return formulario;
	
}
