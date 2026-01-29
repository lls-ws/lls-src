/* =========================================================
 * setLinhaTabelaFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function setLinhaTabelaFazenda(fazenda, tbody, arrayColunaBotoes) {
	
	formataDadosFazenda(fazenda);
	
	var tr = setIdTabelaCadastro(fazenda, tbody);
		
	if (arrayColunaBotoes != null) {
		
		tr.append(tabelaBotoes(fazenda.id, fazenda.nome, arrayColunaBotoes));
		
	}
	
	tr.append(tabelaCelula(fazenda.nome, 'text-left', 'texto', 'tdNome'));
	tr.append(tabelaCelula(fazenda.ie, 'text-center', 'texto', 'tdIe'));
	tr.append(tabelaCelula(fazenda.cpfcnpj, 'text-center', 'texto', 'tdCpfCnpj'));
	tr.append(tabelaCelula(fazenda.endereco, 'text-left', 'texto', 'tdEndereco'));
	tr.append(tabelaCelula(fazenda.bairro, 'text-left', 'texto', 'tdBairro'));
	tr.append(tabelaCelula(fazenda.cidade, 'text-left', 'texto', 'tdCidade'));
	tr.append(tabelaCelula(fazenda.estado, 'text-center', 'texto', 'tdEstado'));
	tr.append(tabelaCelula(fazenda.cep, 'text-center', 'texto', 'tdCep'));
	
	tbody.append(tr);
	
}
