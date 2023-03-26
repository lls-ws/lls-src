/* =========================================================
 * removeTotalTabelaSaldoMilho.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaSaldoMilho(nomeTabela, entrada, saida) {
	
	var totalEntradas = $('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalEntradas").find('p').text();
	var totalSaidas = $('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalSaidas").find('p').text();
	var totalSaldo = $('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalSaldo").find('p').text();
	
	totalEntradas = formataNumeroSql(totalEntradas);
	totalSaidas = formataNumeroSql(totalSaidas);
	totalSaldo = formataNumeroSql(totalSaldo);
	
	totalEntradas = totalEntradas - entrada;
	totalSaidas = totalSaidas - saida;
	totalSaldo = totalEntradas - totalSaidas;
	
	totalEntradas = formataNumero(totalEntradas, 2, false, false, "", " kg");
	totalSaidas = formataNumero(totalSaidas, 2, false, false, "", " kg");
	totalSaldo = formataNumero(totalSaldo, 2, false, false, "", " kg");
		
	$('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalEntradas").find('p').empty();

	$('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalEntradas").find('p').text(totalEntradas);
	
	$('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalSaidas").find('p').empty();

	$('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalSaidas").find('p').text(totalSaidas);
	
	$('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalSaldo").find('p').empty();

	$('#tfoottableLista' + nomeTabela)
		.find('#saldoRodape' + nomeTabela).find("#totalSaldo").find('p').text(totalSaldo);
	
}
