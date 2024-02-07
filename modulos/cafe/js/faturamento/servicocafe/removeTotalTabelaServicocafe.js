/* =========================================================
 * removeTotalTabelaServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaServicocafe(idLinha, nomeTabela) {
	
	var paragrafos = {
		qtd: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#qtd").find('p'),
		total: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#total").find('p'),
		pago: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#pago").find('p'),
		valor: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#valor").find('p')
	}
	
	var valores = {
		valorTotal: $('#tbodyLista' + nomeTabela).find(idLinha).find("#tdTotal").find('p').text(),
		valorPago: $('#tbodyLista' + nomeTabela).find(idLinha).find("#tdPago").find('p').text(),
		valorRestante: $('#tbodyLista' + nomeTabela).find(idLinha).find("#tdValor").find('p').text(),
		qtd: paragrafos.qtd.text(),
		total: paragrafos.total.text(),
		pago: paragrafos.pago.text(),
		valor: paragrafos.valor.text()
	}
	
	var textoQtd = valores.qtd.split(':'); 
	
	valores.qtd = Number(textoQtd[1]) - 1;
	
	valores.valorTotal = formataNumeroSql(valores.valorTotal);
	valores.valorPago = formataNumeroSql(valores.valorPago);
	valores.valorRestante = formataNumeroSql(valores.valorRestante);
	
	valores.total = formataNumeroSql(valores.total);
	valores.pago = formataNumeroSql(valores.pago);
	valores.valor = formataNumeroSql(valores.valor);
	
	valores.total = valores.total - valores.valorTotal;
	valores.pago = valores.pago - valores.valorPago;
	valores.valor = valores.valor - valores.valorRestante;
	
	if (valores.total > 0) {
	
		paragrafos.qtd.empty();
		paragrafos.total.empty();
		paragrafos.pago.empty();
		paragrafos.valor.empty();
		
		paragrafos.qtd.text(textoQtd[0] + ": " + valores.qtd);
		paragrafos.total.text(formataNumero(valores.total, 2, false, false, "R$ ", ""));
		paragrafos.pago.text(formataNumero(valores.pago, 2, false, false, "R$ ", ""));
		paragrafos.valor.text(formataNumero(valores.valor, 2, false, false, "R$ ", ""));
		
	}
	else {
		
		$('#tfoottableLista' + nomeTabela).empty();
		
		$('#paginaLista' + nomeTabela).hide();
		
		$('#nomeProcura' + nomeTabela).find('#spanGroupPrint' + nomeTabela + 'FazendaProdutor').hide();
		
	}
		
}
