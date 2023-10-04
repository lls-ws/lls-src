/* =========================================================
 * removeTotalTabelaEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaEntmilho(idLinha) {
	
	idLinha = idLinha.replace('#', '');
	
	var bruto = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdBruto").find('p').text();
	
	var valorImpureza = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdValorImpureza").find('p').text();
	var valorUmidade = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdValorUmidade").find('p').text();
	var valorQuirela = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdValorQuirela").find('p').text();
	var valorChocho = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdValorChocho").find('p').text();
	
	var liquido = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdLiquido").find('p').text();
	var limpeza = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdLimpeza").find('p').text();
	var secagem = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdSecagem").find('p').text();
	var carga = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdCarga").find('p').text();
	var recepcao = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdRecepcao").find('p').text();
	var total = $('#tbodyListaEntmilho').find('#' + idLinha).find("#tdTotal").find('p').text();
	
	bruto = formataNumeroSql(bruto);
	
	valorImpureza = formataNumeroSql(valorImpureza);
	valorUmidade = formataNumeroSql(valorUmidade);
	valorQuirela = formataNumeroSql(valorQuirela);
	valorChocho = formataNumeroSql(valorChocho);
	
	liquido = formataNumeroSql(liquido);
	limpeza = formataNumeroSql(limpeza);
	secagem = formataNumeroSql(secagem);
	carga = formataNumeroSql(carga);
	recepcao = formataNumeroSql(recepcao);
	total = formataNumeroSql(total);
	
	var totalBruto = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalBruto").find('p').text();
	
	var totalImpureza = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalImpureza").find('p').text();
	var totalUmidade = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalUmidade").find('p').text();
	var totalQuirela = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalQuirela").find('p').text();
	var totalChocho = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalChocho").find('p').text();	
	
	var totalLiquido = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalLiquido").find('p').text();
	var totalLimpeza = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalLimpeza").find('p').text();
	var totalSecagem = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalSecagem").find('p').text();
	var totalCarga = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalCarga").find('p').text();
	var totalRecepcao = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalRecepcao").find('p').text();
	var totalTotal = $('#tfoottableListaEntmilho')
		.find('#nomeRodapeEntmilho').find("#totalTotal").find('p').text();
	
	totalBruto = formataNumeroSql(totalBruto);
	
	totalImpureza = formataNumeroSql(totalImpureza);
	totalUmidade = formataNumeroSql(totalUmidade);
	totalQuirela = formataNumeroSql(totalQuirela);
	totalChocho = formataNumeroSql(totalChocho);
	
	totalLiquido = formataNumeroSql(totalLiquido);
	totalLimpeza = formataNumeroSql(totalLimpeza);
	totalSecagem = formataNumeroSql(totalSecagem);
	totalCarga = formataNumeroSql(totalCarga);
	totalRecepcao = formataNumeroSql(totalRecepcao);
	totalTotal = formataNumeroSql(totalTotal);
	
	totalBruto = totalBruto - bruto;
	
	totalImpureza = totalImpureza - valorImpureza;
	totalUmidade = totalUmidade - valorUmidade;
	totalQuirela = totalQuirela - valorQuirela;
	totalChocho = totalChocho - valorChocho;
	
	totalLiquido = totalLiquido - liquido;
	totalLimpeza = totalLimpeza - limpeza;
	totalSecagem = totalSecagem - secagem;
	totalCarga = totalCarga - carga;
	totalRecepcao = totalRecepcao - recepcao;
	totalTotal = totalTotal - total;
	
	if (totalLiquido > 0) {
		
		var idFazenda = $('#idnomeProcuraEntmilhoFazendaProdutor').val();
		
		if (idFazenda > 0) {
			
			removeTotalTabelaSaldoMilho("Entmilho", liquido, 0);
			
		}
		
		totalBruto = formataNumero(totalBruto, 2, false, false, "", " kg");
		
		totalImpureza = formataNumero(totalImpureza, 2, false, false, "", " kg");
		totalUmidade = formataNumero(totalUmidade, 2, false, false, "", " kg");
		totalQuirela = formataNumero(totalQuirela, 2, false, false, "", " kg");
		totalChocho = formataNumero(totalChocho, 2, false, false, "", " kg");
		
		totalLiquido = formataNumero(totalLiquido, 2, false, false, "", " kg");
		totalLimpeza = formataNumero(totalLimpeza, 2, false, false, "R$ ", "");
		totalSecagem = formataNumero(totalSecagem, 2, false, false, "R$ ", "");
		totalCarga = formataNumero(totalCarga, 2, false, false, "R$ ", "");
		totalRecepcao = formataNumero(totalRecepcao, 2, false, false, "R$ ", "");
		totalTotal = formataNumero(totalTotal, 2, false, false, "R$ ", "");
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalBruto").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalBruto").find('p').text(totalBruto);
		
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalImpureza").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalImpureza").find('p').text(totalImpureza);
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalUmidade").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalUmidade").find('p').text(totalUmidade);
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalQuirela").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalQuirela").find('p').text(totalQuirela);
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalChocho").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalChocho").find('p').text(totalChocho);
		
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalLiquido").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalLiquido").find('p').text(totalLiquido);
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalLimpeza").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalLimpeza").find('p').text(totalLimpeza);
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalSecagem").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalSecagem").find('p').text(totalSecagem);
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalCarga").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalCarga").find('p').text(totalCarga);
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalRecepcao").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalRecepcao").find('p').text(totalRecepcao);
		
		
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalTotal").find('p').empty();
	
		$('#tfoottableListaEntmilho')
			.find('#nomeRodapeEntmilho').find("#totalTotal").find('p').text(totalTotal);
			
	}
	else {
		
		$('#tfoottableListaEntmilho').empty();
		
		$('#nomeProcuraEntmilho').find('#spanGroupPrintEntmilhoFazendaProdutor').hide();
		
	}
	
}
