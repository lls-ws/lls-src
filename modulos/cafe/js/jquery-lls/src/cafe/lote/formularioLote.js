/* =========================================================
 * formularioLote.js
 * http://lls.net.br/
 * ========================================================= */

function formularioLote(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-sqlProcura.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-sqlProcuraPeneira.js", "js");
	
	var lote = criaNumeroLote(dados.nomeTabela, dados.nomeTabelaCadastro);
	
	var campoSacasAltera = campoOculto("sacasAltera" + dados.nomeTabela, 0);
	var campoPesoAltera = campoOculto("pesoAltera" + dados.nomeTabela, 0);
	
	var campoLote = campoTextoHorizontal(
		'lote' + dados.nomeTabela, 'text', 'Lote',
		'col-xs-9 col-md-6', 'col-xs-3',
		'', true, 10, "disabled"
	);
	
	var campoPeneira = campoSqlProcuraTexto(
		"Peneira",
		dados.nomeTabela,
		"Peneira",
		"Digite o nome da peneira",
		'col-xs-9 col-md-6', 'col-xs-3', 1
	);
	
	var campoSacas = campoNumeroHorizontal(
		"sacas" + dados.nomeTabela, "Sacas",
		'col-xs-9 col-md-6', 'col-xs-3',
		0, 3, false, true, "", "", "enabled"
	);
	
	var campoPeso = campoNumeroHorizontal(
		"peso" + dados.nomeTabela, "Peso",
		'col-xs-9 col-md-6', 'col-xs-3',
		2, 7, false, false, "", " kg", "enabled"
	);
	
	var campoPilha = campoTextoHorizontal(
		'pilha' + dados.nomeTabela, 'text', 'Pilha',
		'col-xs-9 col-md-6', 'col-xs-3',
		'', false, 10, "enabled"
	);
	
	var campoObservacao = campoTextoHorizontal(
		'observacao' + dados.nomeTabela, 'text', 'Observação',
		'col-xs-9 col-md-6', 'col-xs-3',
		'', false, 50, "enabled"
	);
	
	var formTela = $("<div/>")
		.addClass("form-horizontal")
		.append(campoLote)
		.append(campoPeneira)
		.append(campoSacas)
		.append(campoPeso)
		.append(campoPilha)
		.append(campoObservacao)
		.append(campoSacasAltera)
		.append(campoPesoAltera);
	
	var formulario = formularioCadastroCore(dados, formTela);
	
	setFormularioCafe(dados, formulario);
	
	if (dados.id == 0) campoLote.find('#lote' + dados.nomeTabela).val(lote);
	
	return formulario;
	
}
