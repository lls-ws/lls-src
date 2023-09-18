/* =========================================================
 * pegaDadosFormularioFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioFazenda(nomeTabela) {
	
	var $formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	var fazenda = { 
		id: $formulario.find('#id' + nomeTabela).val(),
		nome: encodeURIComponent( unescape($formulario.find('#nome' + nomeTabela).val())),
		endereco: encodeURIComponent( unescape($formulario.find('#endereco' + nomeTabela).val())),
		bairro: encodeURIComponent( unescape($formulario.find('#bairro' + nomeTabela).val())),
		cidade: encodeURIComponent( unescape($formulario.find('#cidade' + nomeTabela).val())),
		estado: pegaValorCaixaCombinacao($formulario.find('#estado' + nomeTabela).val()),
		cep: pegaCepNumeros($formulario.find('#cep' + nomeTabela).val()),
		ie: $formulario.find('#ie' + nomeTabela).val(),
		cpfcnpj: $formulario.find('#cpfcnpj' + nomeTabela).val()
	};
	
	return fazenda;
	
}
