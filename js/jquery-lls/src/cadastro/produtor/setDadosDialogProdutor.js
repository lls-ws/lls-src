/* =========================================================
 * setDadosDialogProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogProdutor(produtor) {
	
	formataDadosProdutor(produtor);
	
	var $textoNome = juntaTituloTexto('Nome', produtor.nome);
	var $textoEndereco = juntaTituloTexto('Endereço', produtor.endereco);
	var $textoBairro = juntaTituloTexto('Bairro', produtor.bairro);
	var $textoCidade = juntaTituloTexto('Cidade', produtor.cidade);
	var $textoCep = juntaTituloTexto('Cep', produtor.cep);
	var $textoEmail = juntaTituloTexto('Email', produtor.email);
	var $textoSite = juntaTituloTexto('Site', produtor.site);
	
	if (produtor.cpfcnpj.length == 14) {
		
		var $textoCpfCnpj = juntaTituloTexto('CPF', produtor.cpfcnpj);
		
	}
	else if (produtor.cpfcnpj.length == 18) {
		
		var $textoCpfCnpj = juntaTituloTexto('CNPJ', produtor.cpfcnpj);
		
	}
	else {
		
		var $textoCpfCnpj = '';
		
	}
	
	var $arrayLinhaCidade = {
		"linha1": $textoCidade,
		"linha2": produtor.estado
	};
	
	var $arrayProdutor = {
		"coluna1": $textoNome,
		"coluna2": $textoEndereco,
		"coluna3": $textoBairro,
		"coluna4": juntaTexto($arrayLinhaCidade),
		"coluna5": $textoCep,
		"coluna6": $textoEmail,
		"coluna7": $textoSite,
		"coluna8": $textoCpfCnpj,
	};
	
	var $nomesColunasProdutor = {
		"coluna1": "Endereço",
		"coluna2": "Observações"
	};
	
	var $idLinha = 'trProdutorDialog_' + produtor.id;
	
	var $trProdutor = tr($idLinha, '');
	
	$trProdutor.append(juntaColunas($arrayProdutor, 'text-left', 'texto', 'tdProdutor'));
	
	$trProdutor.append(tabelaCelula(produtor.observacao, 'text-left', 'texto', 'tdObservacao'));
	
	produtor["nomeTabela"] = 'Produtor';
	
	setDadosDialogCadastro(produtor, $nomesColunasProdutor, $trProdutor);
	
	var telefonesArray = produtor.telefones;
	
	if (telefonesArray != null) {
		
		var $tabelaTelefone = pegaTabelaCadastro(telefonesArray, 'Telefone');
		
		$('#divDialog' + produtor.nomeTabela + ' #tableDialog' + produtor.nomeTabela).after($tabelaTelefone);
		
	}
	
	var fazendasArray = produtor.fazendas;
	
	if (fazendasArray != null) {
		
		var $tabelaFazenda = pegaTabelaCadastro(fazendasArray, 'Fazenda');
		
		$('#divDialog' + produtor.nomeTabela + ' #tableDialog' + produtor.nomeTabela).after($tabelaFazenda);
		
	}
	
}
