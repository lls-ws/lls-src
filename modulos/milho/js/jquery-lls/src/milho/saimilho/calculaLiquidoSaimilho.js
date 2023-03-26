/* =========================================================
 * calculaLiquidoSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function calculaLiquidoSaimilho(nomeTabela) {
	
	var valorLiquido = formataNumeroSql($('#liquido' + nomeTabela).val());
	
	var idMilho = $('#idnomeProcuraCadastro' + nomeTabela + 'Milho').val();
	
	if (idMilho > 0) {
		
		var textoMilho = $('#nomeProcuraCadastro' + nomeTabela + 'MilhoDivInput span').text();
		
		var textoMilhoArray = textoMilho.split(' ');
		
		var saldoInicialMilho = textoMilhoArray[1];
		
		saldoInicialMilho = formataNumeroSql(saldoInicialMilho);
		
	}
	else {
		
		var saldoInicialMilho = 0;
		
	}
	
	var saldoFinalMilho = Math.round(saldoInicialMilho - valorLiquido);
	
	$('#saldo' + nomeTabela).val(formataNumero(saldoFinalMilho, 2, true, true, "", " kg"));
	
}

function verificaLiquidoSaimilho(campoLiquido, nomeTabela) {
	
	var valorLiquido = formataNumeroSql(campoLiquido.find('#liquido' + nomeTabela).val());
		
	if (valorLiquido > 0) {
		
		calculaLiquidoSaimilho(nomeTabela);
		
	}
	
}
