/* =========================================================
 * removeTotalTabelaServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaServicomilho(idLinha) {
	
	idLinha = idLinha.replace('#', '');
	
	id = idLinha.replace('servicomilho_', '');
	
	var valorTotal = $('#tbodyListaServicomilho').find('#' + idLinha).find("#tdTotal").find('p').text();
	var valorPago = $('#tbodyListaServicomilho').find('#' + idLinha).find("#tdPago").find('p').text();
	var valorRestante = $('#tbodyListaServicomilho').find('#' + idLinha).find("#tdValor").find('p').text();
	
	var total = $('#tfoottableListaServicomilho').find('#nomeRodapeServicomilho').find("#total").find('p').text();
	var pago = $('#tfoottableListaServicomilho').find('#nomeRodapeServicomilho').find("#pago").find('p').text();
	var valor = $('#tfoottableListaServicomilho').find('#nomeRodapeServicomilho').find("#valor").find('p').text();
	
	valorTotal = formataNumeroSql(valorTotal);
	valorPago = formataNumeroSql(valorPago);
	valorRestante = formataNumeroSql(valorRestante);
	
	total = formataNumeroSql(total);
	pago = formataNumeroSql(pago);
	valor = formataNumeroSql(valor);
	
	total = total - valorTotal;
	pago = pago - valorPago;
	valor = valor - valorRestante;
	
	if (total > 0) {
	
		total = formataNumero(total, 2, false, false, "R$ ", "");
		pago = formataNumero(pago, 2, false, false, "R$ ", "");
		valor = formataNumero(valor, 2, false, false, "R$ ", "");
	
		$('#tfoottableListaServicomilho')
			.find('#nomeRodapeServicomilho').find("#total").find('p').empty();
			
		$('#tfoottableListaServicomilho')
			.find('#nomeRodapeServicomilho').find("#pago").find('p').empty();
			
		$('#tfoottableListaServicomilho')
			.find('#nomeRodapeServicomilho').find("#valor").find('p').empty();
		
		
		$('#tfoottableListaServicomilho')
			.find('#nomeRodapeServicomilho').find("#total").find('p').text(total);
			
		$('#tfoottableListaServicomilho')
			.find('#nomeRodapeServicomilho').find("#pago").find('p').text(pago);
			
		$('#tfoottableListaServicomilho')
			.find('#nomeRodapeServicomilho').find("#valor").find('p').text(valor);

	}
	else {
		
		$('#tfoottableListaServicomilho').empty();
		
	}
		
}
