/* =========================================================
 * setDadosDialogSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogSaimilho(saimilho) {
	
	formataDadosSaimilho(saimilho);
	
	var $textoData = juntaTituloTexto('Data', saimilho.data);
	var $textoProdutor = juntaTituloTexto('Produtor', saimilho.produtor);
	var $textoFazenda = juntaTituloTexto('Fazenda', saimilho.fazenda);
	var $textoLiquido = juntaTituloTexto('Peso Liquido', saimilho.liquido);
	var $textoLaudo = juntaTituloTexto('Nota N.E', saimilho.laudo);
	var $textoTiket = juntaTituloTexto('Ticket', saimilho.tiket);
	var $textoPlaca = juntaTituloTexto('Placa', saimilho.placa);
	var $textoCilo = juntaTituloTexto('Silo', saimilho.cilo);
	var $textoDestino = juntaTituloTexto('Destino', saimilho.destino);
	
	var $nomesColunas = {
		"coluna1": "Saída de Milho",
		"coluna2": "Dados de Saída"
	};
	
	var $arrayDados1 = {
		"coluna1": $textoData,
		"coluna2": $textoLaudo,
		"coluna3": $textoProdutor,
		"coluna4": $textoFazenda,
		"coluna5": $textoLiquido
	};
	
	var $arrayDados2 = {
		"coluna1": $textoTiket,
		"coluna2": $textoPlaca,
		"coluna3": $textoCilo,
		"coluna4": $textoDestino
	};
	
	var $idLinha = 'trSaimilhoDialog_' + saimilho.id;
	
	var $trDados = tr($idLinha, '');
	
	$trDados.append(juntaColunas($arrayDados1, 'text-left', 'texto', 'tdDados2'));
	
	$trDados.append(juntaColunas($arrayDados2, 'text-center', 'texto', 'tdDados2'));
	
	setDadosDialogCadastro(saimilho, $nomesColunas, $trDados);
	
	if (saimilho.obs != '') {
		
		var $trObs = tr('', '')
			.append(tabelaCelula(saimilho.obs, 'text-left', 'texto', 'tdObs').attr('colspan', 2));
		
		$('#divDialog' + saimilho.nomeTabela + ' #tableDialog' + saimilho.nomeTabela + ' tbody')
			.append($trObs);
		
	}
	
	$('#botaoAlterarFormGroup').removeClass('col-xs-6');
	$('#botaoRemoverFormGroup').removeClass('col-xs-6').addClass('col-xs-12');
	
	$("#botaoAlterar").hide();
	
}
