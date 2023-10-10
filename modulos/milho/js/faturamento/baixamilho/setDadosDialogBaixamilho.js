/* =========================================================
 * setDadosDialogBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogBaixamilho(lancamento) {
	
	formataDadosBaixamilho(lancamento);
	
	var $textoProdutor = juntaTituloTexto('Produtor', lancamento.produtor);
	var $textoFazenda = juntaTituloTexto('Fazenda', lancamento.fazenda);
	var $textoServico = juntaTituloTexto('Serviço', lancamento.servico);
	
	var $textoData = juntaTituloTexto('Data', lancamento.data);
	var $textoTotal = juntaTituloTexto('Total', lancamento.total);
	var $textoPago = juntaTituloTexto('Pago', lancamento.pago);
	var $textoValor = juntaTituloTexto('Valor', lancamento.valor);
	
	var $nomesColunas = {
		"coluna1": "Dados do Serviço",
		"coluna2": "Valores"
	};
	
	var $arrayDados1 = {
		"coluna1": $textoProdutor,
		"coluna2": $textoFazenda,
		"coluna3": $textoServico
	};
	
	var $arrayDados2 = {
		"coluna1": $textoData,
		"coluna2": $textoTotal,
		"coluna3": $textoPago,
		"coluna4": $textoValor
	};
	
	var $idLinha = 'trBaixamilhoDialog_' + lancamento.id;
	
	var $trDados = tr($idLinha, '');
	
	$trDados.append(juntaColunas($arrayDados1, 'text-left', 'texto', 'tdDados1'));
	
	$trDados.append(juntaColunas($arrayDados2, 'text-right', 'texto', 'tdDados2'));
	
	setDadosDialogCadastro(lancamento, $nomesColunas, $trDados);
	
}
