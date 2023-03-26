/* =========================================================
 * setDadosDialogMilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogMilho(milho) {
	
	formataDadosMilho(milho);
	
	var $textoProdutor = juntaTituloTexto('Produtor', milho.produtor);
	var $textoFazenda = juntaTituloTexto('Fazenda', milho.fazenda);
	var $textoLiquidoEntrada = juntaTituloTexto('Peso Liquido de Entrada', milho.entrada);
	var $textoDataEntrada = juntaTituloTexto('Data da Última Entrada', milho.dataEntrada);
	var $textoLiquidSaida = juntaTituloTexto('Peso Liquido de Saída', milho.saida);
	var $textoDataSaida = juntaTituloTexto('Data da Última Saída', milho.dataSaida);
	var $textoTotal = juntaTituloTexto('Total Liquido', milho.saldo);
	var $textoDataFaturamento = juntaTituloTexto('Data do Último Faturamento', milho.dataFaturamento);
	
	var $nomesColunas = {
		"coluna1": "Saldo do Produtor"
	};
	
	var $arrayDados = {
		"coluna1": $textoProdutor,
		"coluna2": $textoFazenda,
		"coluna3": $textoLiquidoEntrada,
		"coluna4": $textoDataEntrada,
		"coluna5": $textoLiquidSaida,
		"coluna6": $textoDataSaida,
		"coluna7": $textoTotal,
		"coluna8": $textoDataFaturamento,
	};
	
	var $idLinha = 'trMilhoDialog_' + milho.id;
	
	var $trDados = tr($idLinha, '');
	
	$trDados.append(juntaColunas($arrayDados, 'text-left', 'texto', 'tdDados'));
	
	setDadosDialogCadastro(milho, $nomesColunas, $trDados);
	
	$("#botaoAlterar").hide();
	$("#botaoRemover").hide();
	
}
