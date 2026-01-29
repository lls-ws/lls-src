/* =========================================================
 * pegaDadosFormularioProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioProdutor(nomeTabela) {
	
	var dados = {
		id: $('#id' + nomeTabela).val(),
		nome: encodeURIComponent( unescape($('#nome' + nomeTabela).val())),
		endereco: encodeURIComponent( unescape($('#endereco' + nomeTabela).val())),
		bairro: encodeURIComponent( unescape($('#bairro' + nomeTabela).val())),
		cidade: encodeURIComponent( unescape($('#cidade' + nomeTabela).val())),
		estado: pegaValorCaixaCombinacao($('#estado' + nomeTabela).val()),
		cep: pegaCepNumeros($('#cep' + nomeTabela).val()),
		email: $('#email' + nomeTabela).val(),
		site: $('#site' + nomeTabela).val(),
		cpfcnpj: pegaCpfCnpjNumeros($('#cpfcnpj' + nomeTabela).val()),
		observacao: encodeURIComponent( unescape($('#observacao' + nomeTabela).val()))
	}
	
	return dados;
	
}
