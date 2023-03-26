/* =========================================================
 * limpaDadosFormularioTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioTelefone(nomeTabela) {
	
	var $formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	$formulario.find('#id' + nomeTabela).val(0);
	$formulario.find('#numero' + nomeTabela).val('');
	$formulario.find('#responsavel' + nomeTabela).val('');
	$formulario.find('#tipo' + nomeTabela).val('');
	$formulario.find('#operadora' + nomeTabela).val('');
	
	$formulario.find('#operadorasImagem').attr('src', '');
	
	$formulario.find('#operadoras').hide();
	
	$formulario.find('#operadorasFormGroup2').hide();
	
}
