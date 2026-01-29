/* =========================================================
 * removeTotalTabelaBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaBaixamilho(idLinha) {
	
	idLinha = idLinha.replace('#', '');
	
	id = idLinha.replace('baixamilho_', '');
	
	var total = $('#tdDados2').find("#coluna3").text().replace('Total: ', '');
	var pago = $("#tdDados2").find("#coluna4").text().replace('Pago: ', '');
	var valor = $('#tdDados2').find("#coluna5").text().replace('Valor: ', '');
	var valorBaixa = $("#tbodyDialogBaixamilho").find('#' + idLinha).find("#tdValor").find('p').text();
	
	total = formataNumeroSql(total);
	pago = formataNumeroSql(pago);
	valor = formataNumeroSql(valor);
	valorBaixa = formataNumeroSql(valorBaixa);
	
	pago = pago - valorBaixa;
	valor = valor + valorBaixa;
	
	var valorPago = pago;
	var valorRestante = valor;
	
	if (pago == 0) {
	
		$('#divTabelaDialogBaixamilho').hide();
		
		$('#tdDados1').find("#coluna5").empty();
		$('#tdDados1').find("#coluna5").append(juntaTituloTexto('Pago', 'Não'));
		
	}
	
	pago = formataNumero(pago, 2, false, false, "R$ ", "");
	valor = formataNumero(valor, 2, false, false, "R$ ", "");
	
	$('#tdDados2').find("#coluna4").empty();
	$('#tdDados2').find("#coluna5").empty();
	
	$('#tdDados2').find("#coluna4").append(juntaTituloTexto('Pago', pago));
	$('#tdDados2').find("#coluna5").append(juntaTituloTexto('Valor', valor));
	
	var $idServico = $('#idServicomilho').val();
	
	var tdPago = $('#tbodyListaServicomilho').find("#servicomilho_" + $idServico).find('#tdPago').find('p');
	var tdValor = $('#tbodyListaServicomilho').find("#servicomilho_" + $idServico).find('#tdValor').find('p');
	
	tdValor.empty();
	tdPago.empty();
	
	if (valorPago == 0) {
		
		tdPago.removeClass('texto_cor_verde').addClass('texto');
		
	}
	else {
		
		tdPago.removeClass('texto').addClass('texto_cor_verde');
		
	}
	
	if (valorRestante == 0) {
		
		tdValor.removeClass('texto_cor_vermelho').addClass('texto');
		
	}
	else {
		
		tdValor.removeClass('texto').addClass('texto_cor_vermelho');
		
	}
	
	tdPago.append(pago);
	tdValor.append(valor);
	
	var totalPago = $("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#pago').find('p').text();
	var totalValor = $("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#valor').find('p').text();
	
	totalPago = formataNumeroSql(totalPago);
	totalValor = formataNumeroSql(totalValor);
	
	totalPago = totalPago - valorBaixa;
	totalValor = totalValor + valorBaixa;
	
	verificaBaixamilho(totalValor, totalPago);
	
	totalPago = formataNumero(totalPago, 2, false, false, "R$ ", "");
	totalValor = formataNumero(totalValor, 2, false, false, "R$ ", "");
	
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#pago').find('p').empty();
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#valor').find('p').empty();
	
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#pago').find('p').text(totalPago);
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#valor').find('p').text(totalValor);

	$("#divDialogVisualizaServicomilho").dialog( "close" );

}
