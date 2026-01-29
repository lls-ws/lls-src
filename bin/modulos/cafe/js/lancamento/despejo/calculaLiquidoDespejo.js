/* =========================================================
 * calculaLiquidoDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function calculaLiquidoDespejo(dados) {
	
	var valores = {
		peso: 0.00,
		sacas: Number($('#sacas' + dados.nomeTabela).val()),
		sacasTotal: Number($('#sacasTotal' + dados.nomeTabela).val()),
		pesoTotal: Number($('#pesoTotal' + dados.nomeTabela).val()),
		sacasSaldo: Number($('#sacasSaldo' + dados.nomeTabela).val()),
		pesoSaldo: formataNumeroSql($('#pesoSaldo' + dados.nomeTabela).val())
	}
	
	if (valores.sacas == valores.sacasSaldo) valores.peso = valores.pesoSaldo;
	else if (valores.sacas == valores.sacasTotal) valores.peso = valores.pesoTotal;
	else {
		
		valores.peso = valores.sacas * (valores.pesoTotal / valores.sacasTotal);
		
		arredondaPesoCafe(valores);
		
	}
	
	$('#peso' + dados.nomeTabela).val(formataNumero(valores.peso, 2, false, false, "", " kg"));
	
}
