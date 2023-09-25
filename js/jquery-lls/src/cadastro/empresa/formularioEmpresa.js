/* =========================================================
 * formularioEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function formularioEmpresa(idEmpresa, nomeTabela) {
	
	var empresa = getJson("achaEmpresa");
	
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
		true, empresa.dataMilho, empresa.dataMilho, empresa.dataMilho,
		'disabled'
	).removeClass("has-feedback");
	
	var $campoDataCafe = campoDataHorizontal(
		"dataCafe" + nomeTabela, "Fat. Café",
		'col-xs-9 col-md-7', 'col-xs-2',
		true, empresa.dataCafe, empresa.dataCafe, empresa.dataCafe,
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
	
	formataDadosEmpresa(empresa);
	
	$formulario.find('#idEmpresa').val(empresa.id);
	$formulario.find('#nome' + nomeTabela).val(empresa.nome);
	$formulario.find('#endereco' + nomeTabela).val(empresa.endereco);
	$formulario.find('#bairro' + nomeTabela).val(empresa.bairro);
	$formulario.find('#cidade' + nomeTabela).val(empresa.cidade);
	$formulario.find('#estado' + nomeTabela).val(empresa.estado);
	$formulario.find('#cep' + nomeTabela).val(empresa.cep);
	$formulario.find('#cpfcnpj' + nomeTabela).val(empresa.cpfcnpj);
	$formulario.find('#ie' + nomeTabela).val(empresa.ie);
	$formulario.find('#email' + nomeTabela).val(empresa.email);
	$formulario.find('#site' + nomeTabela).val(empresa.site);
	$formulario.find('#telefone' + nomeTabela).val(empresa.telefone);
	
	if (empresa.cpfcnpj.length == 18) {
		
		$formulario.find('#cpfcnpj' + nomeTabela + 'RadioCnpj').attr('checked', 'true');
		$formulario.find('#cpfcnpj' + nomeTabela).mask("99.999.999/9999-99");
		$formulario.find('#cpfcnpj' + nomeTabela).attr('placeholder', '__.___.___/____-__');
		$formulario.find('#cpfcnpj' + nomeTabela + 'Label').text('CNPJ');
		
	}
	
	return $formulario;
	
}
