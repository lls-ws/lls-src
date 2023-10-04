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

function verificaBruto(campoBruto, nomeTabela, precoEntmilho) {
	
	var valorBruto = formataNumeroSql(campoBruto.find('#bruto' + nomeTabela).val());
		
	if (valorBruto > 0) {
		
		$('#impureza' + nomeTabela).removeAttr('disabled');
		$('#chocho' + nomeTabela).removeAttr('disabled');
		$('#quirela' + nomeTabela).removeAttr('disabled');
		
		$('#secagem' + nomeTabela).removeAttr('disabled');
		$('#limpeza' + nomeTabela).removeAttr('disabled');
		$('#carga' + nomeTabela).removeAttr('disabled');
		$('#recepcao' + nomeTabela).removeAttr('disabled');
		
		$('#liquido' + nomeTabela).attr('disabled', 'enabled').val('');
		
		calculaLiquidoEntmilho(nomeTabela);
		
		pegaValoresEntmilho(nomeTabela, precoEntmilho);
	
	}
	else {
		
		$('#impureza' + nomeTabela).attr('disabled', 'enabled').val('');
		$('#chocho' + nomeTabela).attr('disabled', 'enabled').val('');
		$('#quirela' + nomeTabela).attr('disabled', 'enabled').val('');
		
		$('#secagem' + nomeTabela).attr('disabled', 'enabled').val('');
		$('#limpeza' + nomeTabela).attr('disabled', 'enabled').val('');
		$('#carga' + nomeTabela).attr('disabled', 'enabled').val('');
		$('#recepcao' + nomeTabela).attr('disabled', 'enabled').val('');
		
		$('#total' + nomeTabela).val('');
		
		$('#liquido' + nomeTabela).removeAttr('disabled').val('');
		
	}
	
}

function verificaLiquido(nomeTabela) {
	
	var valorLiquido = formataNumeroSql($('#liquidoEntmilho').val());
		
	if (valorLiquido > 0) {
		
		$('#numeroProcuraCadastroEntmilhoUmidade').attr('disabled', 'enabled').val('13,10 %');
		$('#idnumeroProcuraCadastroEntmilhoUmidade').val(1);
		$('#nomeEntmilhoUmidadeMensagem').text('Desconto: 0,00 % | R$ 0,00');
		
		$('#bruto' + nomeTabela).attr('disabled', 'enabled').val('0,00 kg');
		$('#brutoEntmilho-error').text('');
		
		$('#numeroProcuraCadastroEntmilhoUmidade-error').text('');
		
		$('#numeroProcuraCadastroEntmilhoUmidadeFormGroup').removeClass('has-error');
		$('#brutoEntmilhoFormGroup').removeClass('has-error');
		
	}
	else {

		$('#numeroProcuraCadastroEntmilhoUmidade').removeAttr('disabled').val('');
		$('#idnumeroProcuraCadastroEntmilhoUmidade').val(0);
		$('#nomeEntmilhoUmidadeMensagem').text('');
		
		$('#numeroProcuraCadastroEntmilhoUmidadeFormGroup').addClass('has-error');
		$('#brutoEntmilhoFormGroup').addClass('has-error');
		
		$('#bruto' + nomeTabela).removeAttr('disabled').focus();
		
	}
	
}
