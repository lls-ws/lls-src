/* =========================================================
 * calculaLiquidoEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function calculaLiquidoEntmilho(nomeTabela) {
	
	var valorBruto = formataNumeroSql($('#bruto' + nomeTabela).val());
	
	var valorImpureza = formataNumeroSql($('#impureza' + nomeTabela).val());
	var valorChocho = formataNumeroSql($('#chocho' + nomeTabela).val());
	var valorQuirela = formataNumeroSql($('#quirela' + nomeTabela).val());
	
	var idUmidade = $('#idnumeroProcuraCadastro' + nomeTabela + 'Umidade').val();
	
	if (idUmidade > 0) {
	
		var textoUmidade = $('#numeroProcuraCadastro' + nomeTabela + 'UmidadeDivInput span').text();
	
		var textoUmidadeArray = textoUmidade.split('|');
		
		var descontoUmidade = textoUmidadeArray[0].replace('Desconto: ', '')
												  .replace(' %', '');
		
		var valorUmidade = formataNumeroSql(descontoUmidade);
		
	}
	else {
		
		var valorUmidade = 0;
		
	}
	
	var valorDescontoImpureza = valorBruto * valorImpureza / 100;
	var valorDescontoChocho = valorBruto * valorChocho / 100;
	var valorDescontoQuirela = valorBruto * valorQuirela / 100;
	var valorDescontoUmidade = valorBruto * valorUmidade / 100;
	
	var totalDescontos = valorDescontoImpureza + valorDescontoChocho +
						 valorDescontoQuirela + valorDescontoUmidade;
	
	var valorLiquido = Math.round(valorBruto - totalDescontos);
	
	$('#liquido' + nomeTabela).val(formataNumero(valorLiquido, 2, false, false, "", " kg"));
	
	calculaCargaEntmilho(nomeTabela);
	
}
