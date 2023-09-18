/* =========================================================
 * setDadosTabelaProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaProdutor(produtor) {
	
	formataDadosProdutor(produtor);
	
	var $idLinha = 'produtor_' + produtor.id;
	
	var $urlBotao = 'mostraCadastro("' + produtor.id + '" , "Produtor")';
	
	var $botaoVisualizar = botao('botaoVisualizar' + produtor.id, '', 'eye', '0', 'btn btn-primary btn-xs', 'button', $urlBotao);
	
	var $tbody = $('#listaProdutorForm #tableListaProdutor #tbodyListaProdutor');
	
	if (produtor.tipoOperacao == 0) {
		
		var $tr = tr($idLinha, '');
		
		$tr.append(tabelaCelula($botaoVisualizar, 'text-center', 'texto', 'tdBotao'));
		$tr.append(tabelaCelula(produtor.nome, 'text-left', 'texto', 'tdNome'));
		$tr.append(tabelaCelula(produtor.cpfcnpj, 'text-center', 'texto', 'tdCpfCnpj'));
		$tr.append(tabelaCelula(produtor.endereco, 'text-left', 'texto', 'tdEndereco'));
		$tr.append(tabelaCelula(produtor.bairro, 'text-left', 'texto', 'tdBairro'));
		$tr.append(tabelaCelula(produtor.cidade, 'text-center', 'texto', 'tdCidade'));
		$tr.append(tabelaCelula(produtor.estado, 'text-center', 'texto', 'tdEstado'));
		$tr.append(tabelaCelula(produtor.cep, 'text-center', 'texto', 'tdCep'));
		
		$tbody.append($tr);
		
	}
	else {
		
		var $tr = $tbody.find('#' + $idLinha);
		
		$tr.find("#tdBotao")
			.replaceWith(tabelaCelula($botaoVisualizar, 'text-center', 'texto', 'tdBotao'));
		$tr.find("#tdNome")
			.replaceWith(tabelaCelula(produtor.nome, 'text-left', 'texto', 'tdNome'));
		$tr.find("#tdCpfCnpj")
			.replaceWith(tabelaCelula(produtor.cpfcnpj, 'text-center', 'texto', 'tdCpfCnpj'));
		$tr.find("#tdEndereco")
			.replaceWith(tabelaCelula(produtor.endereco, 'text-left', 'texto', 'tdEndereco'));
		$tr.find("#tdBairro")
			.replaceWith(tabelaCelula(produtor.bairro, 'text-left', 'texto', 'tdBairro'));
		$tr.find("#tdCidade")
			.replaceWith(tabelaCelula(produtor.cidade, 'text-center', 'texto', 'tdCidade'));
		$tr.find("#tdEstado")
			.replaceWith(tabelaCelula(produtor.estado, 'text-center', 'texto', 'tdEstado'));
		$tr.find("#tdCep")
			.replaceWith(tabelaCelula(produtor.cep, 'text-center', 'texto', 'tdCep'));
		
	}
	
}
