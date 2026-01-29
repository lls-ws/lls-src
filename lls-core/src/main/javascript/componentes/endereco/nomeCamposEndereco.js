/* =========================================================
 * nomeCamposEndereco.js
 * http://lls.net.br/
 * ========================================================= */

function nomeCamposEndereco(nomeTabela) {
	
	var nomesCampos = { 
		"Nome": "nome" + nomeTabela,
		"Endereço": "endereco" + nomeTabela,
		"Bairro": "bairro" + nomeTabela,
		"Cidade": "cidade" + nomeTabela,
		"Estado": "estado" + nomeTabela,
		"CEP": "cep" + nomeTabela
	};
	
	return nomesCampos;
	
}
