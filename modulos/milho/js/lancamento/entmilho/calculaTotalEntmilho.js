/* =========================================================
 * calculaTotalEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function calculaTotalEntmilho(nomeTabela) {
	
	var valorSecagem = formataNumeroSql($('#secagem' + nomeTabela).val());
	var valorLimpeza = formataNumeroSql($('#limpeza' + nomeTabela).val());
	var valorRecepcao = formataNumeroSql($('#recepcao' + nomeTabela).val());
	var valorCarga = formataNumeroSql($('#carga' + nomeTabela).val());
	
	var valorTotal = valorLimpeza + valorRecepcao + valorCarga + valorSecagem;
	
	$('#total' + nomeTabela).val(formataNumero(valorTotal, 2, false, true, "R$ ", ""));
	
}
