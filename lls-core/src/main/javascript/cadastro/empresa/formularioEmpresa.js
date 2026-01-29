/* =========================================================
 * formularioEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function formularioEmpresa(idEmpresa, nomeTabela) {
	
	var $idTela = "div" + nomeTabela;
	
	var $telaEndereco = telaEndereco(nomeTabela);
	
	var $campoCpfCnpj = campoCpfCnpjHorizontal(
		'cpfcnpj' + nomeTabela, 'CPF',
		'col-xs-9 col-md-7', 'col-xs-2', false
	);
	
	var $campoIE = campoTextoHorizontal(
		'ie' + nomeTabela, 'text', 'I.E.', 9, 2, '', false, 20
	);
	
	var $campoEmail = campoTextoHorizontal(
		'email' + nomeTabela, 'email', 'Email', 9 , 2, '', false, 50
	);
	
	var $campoSite = campoTextoHorizontal(
		'site' + nomeTabela, 'text', 'Site', 9 , 2, '', false, 50
	);
	
	var $campoTelefone = campoTelefoneHorizontal(
		'telefone' + nomeTabela, 'Telefone', 9, 2, true
	);
	
	var $campoDataMilho = campoDataHorizontal(
		"dataMilho" + nomeTabela, "Fat. Milho",
		'col-xs-9 col-md-7', 'col-xs-2',
		true, null, null, null,
		'disabled'
	).removeClass("has-feedback");
	
	var $campoDataCafe = campoDataHorizontal(
		"dataCafe" + nomeTabela, "Fat. Café",
		'col-xs-9 col-md-7', 'col-xs-2',
		true, null, null, null,
		'disabled'
	).removeClass("has-feedback");
	
	$telaEndereco.append($campoCpfCnpj);
	
	$telaEndereco.append($campoIE);
	
	var $telaContato = $("<div/>")
		.addClass("form-horizontal")
		.append($campoEmail)
		.append($campoSite)
		.append($campoTelefone)
		.append($campoDataMilho)
		.append($campoDataCafe);
	
	var $nomesTabs = { 
		tab1: "Dados",
		tab2: "Contatos"
	};
	
	var $tabs = divTabs(nomeTabela, $nomesTabs);
	
	$tabs.find('#tab1').addClass('in active');
	
	$tabs.find('#linha_tab1').addClass('active');
	
	$tabs.find('#tab1').append($telaEndereco);
	
	$tabs.find('#tab2').append($telaContato);
	
	var $formulario = formularioCadastro(idEmpresa, nomeTabela, 2, 4, $tabs);
	
	eventoAcharEmpresa($formulario);
	
	$('#ui-datepicker-div').find('.ui-datepicker-month').attr('name', 'datepicker-month');
	$('#ui-datepicker-div').find('.ui-datepicker-year').attr('name', 'datepicker-year');
	
	return $formulario;
	
}
