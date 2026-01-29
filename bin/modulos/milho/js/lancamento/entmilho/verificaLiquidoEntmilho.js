/* =========================================================
 * verificaLiquidoEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function verificaLiquidoEntmilho(nomeTabela) {
	
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
