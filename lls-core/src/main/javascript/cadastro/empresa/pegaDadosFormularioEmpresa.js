/* =========================================================
 * pegaDadosFormularioEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioEmpresa(nomeTabela) {
	
	var dados = {
		id: $('#id' + nomeTabela).val(),
		nome: encodeURIComponent( unescape($('#nome' + nomeTabela).val())),
		endereco: encodeURIComponent( unescape($('#endereco' + nomeTabela).val())),
		bairro: encodeURIComponent( unescape($('#bairro' + nomeTabela).val())),
		cidade: encodeURIComponent( unescape($('#cidade' + nomeTabela).val())),
		estado: pegaValorCaixaCombinacao($('#estado' + nomeTabela).val()),
		cep: pegaCepNumeros($('#cep' + nomeTabela).val()),
		cpfcnpj: pegaCpfCnpjNumeros($('#cpfcnpj' + nomeTabela).val()),
		ie: $('#ie' + nomeTabela).val(),
		email: $('#email' + nomeTabela).val(),
		site: $('#site' + nomeTabela).val(),
		telefone: pegaTelefoneNumeros($('#telefone' + nomeTabela).val()),
		dataMilho: $("#dataMilho" + nomeTabela).datepicker("getDate"),
		dataCafe: $("#dataCafe" + nomeTabela).datepicker("getDate")
	}
	
	return dados;
	
}
