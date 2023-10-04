/* =========================================================
 * setDadosDialogEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogEntmilho(entmilho) {
	
	formataDadosEntmilho(entmilho);
	
	var $textoProdutor = juntaTituloTexto('Produtor', entmilho.produtor);
	var $textoFazenda = juntaTituloTexto('Fazenda', entmilho.fazenda);
	
	var $textoData = juntaTituloTexto('Data', entmilho.data);
	var $textoLaudo = juntaTituloTexto('Laudo', entmilho.laudo);
	var $textoTiket = juntaTituloTexto('Ticket', entmilho.tiket);
	var $textoPlaca = juntaTituloTexto('Placa', entmilho.placa);
	var $textoCilo = juntaTituloTexto('Silo', entmilho.cilo);
	
	var $textoBruto = juntaTituloTexto('Peso Bruto', entmilho.bruto);
	var $textoImpureza = juntaTituloTexto('Impureza', entmilho.impureza);
	var $textoValorImpureza = juntaTituloTexto('Impureza Descontada', entmilho.valorImpureza);
	var $textoUmidade = juntaTituloTexto('Indice Umidade', entmilho.umidade);
	var $textoDescontoUmidade = juntaTituloTexto('Umidade', entmilho.descontoUmidade);
	var $textoValorUmidade = juntaTituloTexto('Umidade Descontada', entmilho.valorUmidade);
	var $textoQuirela = juntaTituloTexto('Quirela', entmilho.quirela);
	var $textoValorQuirela = juntaTituloTexto('Quirela Descontada', entmilho.valorQuirela);
	var $textoChocho = juntaTituloTexto('Chocho', entmilho.chocho);
	var $textoValorChocho = juntaTituloTexto('Chocho Descontado', entmilho.valorChocho);
	var $textoLiquido = juntaTituloTexto('Peso Liquido', entmilho.liquido);
	
	var $textoRecepcao = juntaTituloTexto('Recepção', entmilho.recepcao);
	var $textoLimpeza = juntaTituloTexto('Limpeza', entmilho.limpeza);
	var $textoSecagem = juntaTituloTexto('Secagem', entmilho.secagem);
	var $textoCarga = juntaTituloTexto('Carga', entmilho.carga);
	var $textoTotal = juntaTituloTexto('Total', entmilho.total);
	
	var $nomesColunas = {
		"coluna1": "Dados de Entrada",
		"coluna2": "Descontos",
		"coluna3": "Valores"
	};
	
	var $arrayDados1 = {
		"coluna1": $textoProdutor,
		"coluna2": $textoFazenda,
		"coluna3": $textoData,
		"coluna4": $textoLaudo,
		"coluna5": $textoTiket,
		"coluna6": $textoPlaca,
		"coluna7": $textoCilo,
		"coluna8": $textoBruto,
		"coluna9": $textoLiquido
	};
	
	var $arrayDados2 = {
		"coluna1": $textoImpureza,
		"coluna2": $textoValorImpureza,
		"coluna3": $textoUmidade,
		"coluna4": $textoDescontoUmidade,
		"coluna5": $textoValorUmidade,
		"coluna6": $textoQuirela,
		"coluna7": $textoValorQuirela,
		"coluna8": $textoChocho,
		"coluna9": $textoValorChocho
	};
	
	var $arrayDados3 = {
		"coluna1": $textoRecepcao,
		"coluna2": $textoLimpeza,
		"coluna3": $textoSecagem,
		"coluna4": $textoCarga,
		"coluna5": $textoTotal
	};
	
	var $idLinha = 'trEntmilhoDialog_' + entmilho.id;
	
	var $trDados = tr($idLinha, '');
	
	$trDados.append(juntaColunas($arrayDados1, 'text-left', 'texto', 'tdDados1'));
	
	$trDados.append(juntaColunas($arrayDados2, 'text-right', 'texto', 'tdDados2'));
	
	$trDados.append(juntaColunas($arrayDados3, 'text-center', 'texto', 'tdDados3'));
	
	setDadosDialogCadastro(entmilho, $nomesColunas, $trDados);
	
	if (entmilho.obs != '') {
		
		var $trObs = tr('', '')
			.append(tabelaCelula(entmilho.obs, 'text-left', 'texto', 'tdObs').attr('colspan', 3));
		
		$('#divDialog' + entmilho.nomeTabela + ' #tableDialog' + entmilho.nomeTabela + ' tbody')
			.append($trObs);
		
	}
	
}
