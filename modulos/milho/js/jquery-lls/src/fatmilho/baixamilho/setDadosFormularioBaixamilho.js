/* =========================================================
 * setDadosFormularioBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioBaixamilho(baixamilho) {

	var idServico = $("#idServicomilho").val();
	
	var tdPago = $('#tbodyListaServicomilho').find("#servicomilho_" + idServico).find('#tdPago').find('p');
	var tdValor = $('#tbodyListaServicomilho').find("#servicomilho_" + idServico).find('#tdValor').find('p');
	
	var pago = tdPago.text();
	var valor = tdValor.text();
	
	var valorBaixa = $("#divDialogAlteraBaixamilho").find("#valorBaixamilho").val();
	
	valorBaixa = formataNumeroSql(valorBaixa);
	
	pago = formataNumeroSql(pago);
	valor = formataNumeroSql(valor);
	
	pago = pago + valorBaixa;
	valor = valor - valorBaixa;
	
	if (pago == 0) {
		
		tdPago.removeClass('texto_cor_verde').addClass('texto');
		
	}
	else {
		
		tdPago.removeClass('texto').addClass('texto_cor_verde');
		
	}
	
	if (valor == 0) {
		
		tdValor.removeClass('texto_cor_vermelho').addClass('texto');
		
	}
	
	pago = formataNumero(pago, 2, true, true, "R$ ", "");
	valor = formataNumero(valor, 2, true, true, "R$ ", "");
	
	tdPago.empty();
	tdValor.empty();
	
	tdPago.append(pago);
	tdValor.append(valor);
	
	var totalPago = $("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#pago').find('p').text();
	var totalValor = $("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#valor').find('p').text();
	
	totalPago = formataNumeroSql(totalPago);
	totalValor = formataNumeroSql(totalValor);
	
	totalPago = totalPago + valorBaixa;
	totalValor = totalValor - valorBaixa;
	
	verificaBaixamilho(totalValor, totalPago);
	
	totalPago = formataNumero(totalPago, 2, true, true, "R$ ", "");
	totalValor = formataNumero(totalValor, 2, true, true, "R$ ", "");
	
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#pago').find('p').empty();
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#valor').find('p').empty();
	
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#pago').find('p').text(totalPago);
	$("#tfoottableListaServicomilho").find("#nomeRodapeServicomilho").find('#valor').find('p').text(totalValor);
	
	limpaDadosFormularioBaixamilho();
	
	$("#divDialogAlteraBaixamilho").dialog( "close" );
	
}
