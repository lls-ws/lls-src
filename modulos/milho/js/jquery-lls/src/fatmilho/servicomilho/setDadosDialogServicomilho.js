/* =========================================================
 * setDadosDialogServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogServicomilho(servicomilho) {
	
	formataDadosServicomilho(servicomilho);
	
	var $textoProdutor = juntaTituloTexto('Produtor', servicomilho.produtor);
	var $textoFazenda = juntaTituloTexto('Fazenda', servicomilho.fazenda);
	var $textoServico = juntaTituloTexto('Serviço', servicomilho.servico);
	var $textoAutomatico = juntaTituloTexto('Automático', servicomilho.automatico);
	var $textoFechado = juntaTituloTexto('Pago', servicomilho.fechado);
	
	var $textoData = juntaTituloTexto('Data', servicomilho.data);
	var $textoLiquido = juntaTituloTexto('Líquido', servicomilho.liquido);
	var $textoTotal = juntaTituloTexto('Total', servicomilho.total);
	var $textoPago = juntaTituloTexto('Pago', servicomilho.pago);
	var $textoValor = juntaTituloTexto('Valor', servicomilho.valor);
	
	var $nomesColunas = {
		"coluna1": "Dados do Serviço",
		"coluna2": "Valores"
	};
	
	var $arrayDados1 = {
		"coluna1": $textoProdutor,
		"coluna2": $textoFazenda,
		"coluna3": $textoServico,
		"coluna4": $textoAutomatico,
		"coluna5": $textoFechado
	};
	
	var $arrayDados2 = {
		"coluna1": $textoData,
		"coluna2": $textoLiquido,
		"coluna3": $textoTotal,
		"coluna4": $textoPago,
		"coluna5": $textoValor
	};
	
	var $idLinha = 'trServicomilhoDialog_' + servicomilho.id;
	
	var $trDados = tr($idLinha, '');
	
	$trDados.append(juntaColunas($arrayDados1, 'text-left', 'texto', 'tdDados1'));
	
	$trDados.append(juntaColunas($arrayDados2, 'text-right', 'texto', 'tdDados2'));
	
	setDadosDialogLancamento(servicomilho, $nomesColunas, $trDados);
	
}
