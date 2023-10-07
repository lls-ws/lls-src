/* =========================================================
 * setDadosFormularioEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioEmpresa(empresa, formulario) {
	
	formataDadosEmpresa(empresa);
				
	formulario.find('#idEmpresa').val(empresa.id);
	formulario.find('#nomeEmpresa').val(empresa.nome);
	formulario.find('#enderecoEmpresa').val(empresa.endereco);
	formulario.find('#bairroEmpresa').val(empresa.bairro);
	formulario.find('#cidadeEmpresa').val(empresa.cidade);
	formulario.find('#estadoEmpresa').val(empresa.estado);
	formulario.find('#cepEmpresa').val(empresa.cep);
	formulario.find('#cpfcnpjEmpresa').val(empresa.cpfcnpj);
	formulario.find('#ieEmpresa').val(empresa.ie);
	formulario.find('#emailEmpresa').val(empresa.email);
	formulario.find('#siteEmpresa').val(empresa.site);
	formulario.find('#telefoneEmpresa').val(empresa.telefone);
	
	if (empresa.cpfcnpj.length == 18) {
		
		formulario.find('#cpfcnpjEmpresa' + 'RadioCnpj').attr('checked', 'true');
		formulario.find('#cpfcnpjEmpresa').mask("99.999.999/9999-99");
		formulario.find('#cpfcnpjEmpresa').attr('placeholder', '__.___.___/____-__');
		formulario.find('#cpfcnpjEmpresa' + 'Label').text('CNPJ');
		
	}
	
	formulario.find('#dataMilhoEmpresa').datepicker('setDate', empresa.dataMilho);
	formulario.find('#dataCafeEmpresa').datepicker('setDate', empresa.dataCafe);
	
	$('#ui-datepicker-div').find('.ui-datepicker-month').attr('name', 'datepicker-month');
	$('#ui-datepicker-div').find('.ui-datepicker-year').attr('name', 'datepicker-year');
	
}
