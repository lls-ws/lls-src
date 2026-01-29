/* =========================================================
 * limpaDadosFormularioFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioFazenda(nomeTabela) {
	
	var $formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	$formulario.find('#id' + nomeTabela).val(0);
	$formulario.find('#nome' + nomeTabela).val('');
	$formulario.find('#endereco' + nomeTabela).val('');
	$formulario.find('#bairro' + nomeTabela).val('');
	$formulario.find('#cidade' + nomeTabela).val('');
	$formulario.find('#estado' + nomeTabela).val('');
	$formulario.find('#cep' + nomeTabela).val('');
	$formulario.find('#ie' + nomeTabela).val('');
	$formulario.find('#cpfcnpj' + nomeTabela).val('');
	
}
