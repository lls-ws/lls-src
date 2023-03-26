/* =========================================================
 * pegaDadosFormularioTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioTelefone(nomeTabela) {
	
	var $formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	var telefone = { 
		id: $formulario.find('#id' + nomeTabela).val(),
		numero: pegaTelefoneNumeros($formulario.find('#numero' + nomeTabela).val()),
		responsavel: encodeURIComponent( unescape( $formulario.find('#responsavel' + nomeTabela).val())),
		tipo: pegaValorCaixaCombinacao($formulario.find('#tipo' + nomeTabela).val()),
		operadora: pegaValorCaixaCombinacao($formulario.find('#operadora' + nomeTabela).val())
	
	};
		
	return telefone;
	
}
