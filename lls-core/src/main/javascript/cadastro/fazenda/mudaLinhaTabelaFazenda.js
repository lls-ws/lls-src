/* =========================================================
 * mudaLinhaTabelaFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function mudaLinhaTabelaFazenda(fazenda, tr, arrayColunaBotoes) {
	
	formataDadosFazenda(fazenda);
	
	tr.find("#tdNome").replaceWith(tabelaCelula(fazenda.nome, 'text-left', 'texto', 'tdNome'));
	tr.find("#tdEndereco").replaceWith(tabelaCelula(fazenda.endereco, 'text-left', 'texto', 'tdEndereco'));
	tr.find("#tdBairro").replaceWith(tabelaCelula(fazenda.bairro, 'text-left', 'texto', 'tdBairro'));
	tr.find("#tdCidade").replaceWith(tabelaCelula(fazenda.cidade, 'text-left', 'texto', 'tdCidade'));
	tr.find("#tdEstado").replaceWith(tabelaCelula(fazenda.estado, 'text-center', 'texto', 'tdEstado'));
	tr.find("#tdCep").replaceWith(tabelaCelula(fazenda.cep, 'text-center', 'texto', 'tdCep'));
	tr.find("#tdIe").replaceWith(tabelaCelula(fazenda.ie, 'text-center', 'texto', 'tdIe'));
	tr.find("#tdCpfCnpj").replaceWith(tabelaCelula(fazenda.cpfcnpj, 'text-center', 'texto', 'tdCpfCnpj'));
	tr.find("#tdBotoes").replaceWith(tabelaBotoes(fazenda.id, fazenda.nome, arrayColunaBotoes));
	
}
