/* =========================================================
 * verificaBrutoEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function verificaBrutoEntmilho(campoBruto, nomeTabela, precoEntmilho) {
	
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
