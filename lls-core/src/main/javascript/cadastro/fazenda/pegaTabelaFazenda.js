/* =========================================================
 * pegaTabelaFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaFazenda(tr, idFazenda) {
	
	var fazenda = { 
		id: idFazenda,
		nome: encodeURIComponent( unescape( tr.find("#tdNome").find('p').text())),
		endereco: encodeURIComponent( unescape( tr.find("#tdEndereco").find('p').text())),
		bairro: encodeURIComponent( unescape( tr.find("#tdBairro").find('p').text())),
		cidade: encodeURIComponent( unescape( tr.find("#tdCidade").find('p').text())),
		estado: pegaValorCaixaCombinacao(tr.find("#tdEstado").find('p').text()),
		cep: pegaCepNumeros(tr.find("#tdCep").find('p').text()),
		ie: tr.find("#tdIe").find('p').text(),
		cpfcnpj: tr.find("#tdCpfCnpj").find('p').text()
	}
	
	return fazenda;
	
}
