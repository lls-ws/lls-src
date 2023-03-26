/* =========================================================
 * pegaDadosFormularioTabelaTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioTabelaTelefone(telefone) {
	
	var nomeTabela = telefone.nomeTabela;
	
	var $formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	var telefone = { 
		id: $formulario.find('#id' + nomeTabela).val(),
		numero: $formulario.find('#numero' + nomeTabela).val(),
		responsavel: $formulario.find('#responsavel' + nomeTabela).val(),
		tipo: $formulario.find('#tipo' + nomeTabela).val(),
		operadora: $formulario.find('#operadora' + nomeTabela).val()
	
	};
	
	//var telefone = { 
		//id: $formulario.find('#id' + nomeTabela).val(),
		//numero: pegaTelefoneNumeros($formulario.find('#numero' + nomeTabela).val()),
		//responsavel: $formulario.find('#responsavel' + nomeTabela).val())),
		//tipo: pegaNomeTipoTelefone($formulario.find('#tipo' + nomeTabela).val()),
		//operadora: pegaValorCaixaCombinacao($formulario.find('#operadora' + nomeTabela).val())
	
	//};
	
	formataDadosTelefone(telefone);
	
	return fazenda;
	
}
