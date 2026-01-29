/* =========================================================
 * getTotalRestanteCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function getTotalRestanteCafeFormacao(dados, formulario, campo, tipo) {
	
	var rowCount = jQuery($('#tbody' + dados.nomeTabela)).find('tr').length;
	
	var valorAltera = getValorAlteraCafeFormacao(campo, formulario, dados.nomeTabela);
	
	var totalDesdobra = 0;
	
	if (rowCount > 0) {
		
		var tfootTotal = $("#tfoottable" + dados.nomeTabela)
			.find("#nomeRodape" + dados.nomeTabela).find('#total' + campo).find('p');
		
		if (campo == "Sacas") totalDesdobra = formataNumeroSacasSql(tfootTotal.text());
		else totalDesdobra = formataNumeroSql(tfootTotal.text());
		
		totalDesdobra = totalDesdobra - valorAltera;
		
	}
	
	if (valorAltera > 0) rowCount--;
	
	var totalRecebido = getTotalRecebidoCafeFormacao(campo, dados.nomeTabelaCadastro);
	
	var totalRestante = totalRecebido - totalDesdobra;
	
	totalRestante = Math.round(totalRestante * 100) / 100;
	
	if (tipo == 1) {
	
		var qtdDesdobras = $('#desdobras' + dados.nomeTabelaCadastro).val();
		
		qtdDesdobras = qtdDesdobras - rowCount;
		
		if (qtdDesdobras <= 0) {
			if (totalRestante == 0) return {min: 1, max: 0};
			else return {min: 0, max: -1};
		}
		else {
			if (totalRestante == 0) return {min: 1, max: 0};
			else {
				if (qtdDesdobras == 1) return {min: totalRestante, max: totalRestante};
				else return {min: 1, max: totalRestante - qtdDesdobras + 1};
			}
		}

	}
	else {
		
		var valorSaldo = getTotalRecebidoCafeFormacao(campo, "Saldo" + dados.nomeTabela);
		
		if (valorAltera > 0) {
			
			valorSaldo = Number(valorSaldo) + Number(valorAltera);
			
			if (totalRestante > valorSaldo) totalRestante = valorSaldo;
			
		}
		else {
			
			if (valorSaldo == 0) totalRestante = 0;
			if (totalRestante > valorSaldo) totalRestante = valorSaldo;
			
		}
		
		totalRestante = Math.round(totalRestante * 100) / 100;
		
		if (totalRestante <= 0) return {min: 1, max: 0};
		else return {min: 1, max: totalRestante};
		
	}
	
}
