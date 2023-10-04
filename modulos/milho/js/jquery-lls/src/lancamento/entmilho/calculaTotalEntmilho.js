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

function pegaValoresEntmilho(nomeTabela, precoEntmilho) {
	
	var valorBruto = formataNumeroSql($('#bruto' + nomeTabela).val());
	
	var valorLimpeza = (valorBruto / 1000 ) * precoEntmilho.limpeza;
	var valorRecepcao = (valorBruto / 1000 ) * precoEntmilho.recepcao;
	var valorCarga = (valorBruto / 1000 ) * precoEntmilho.carga;
	
	$('#limpeza' + nomeTabela).val(formataNumero(valorLimpeza, 2, false, true, "R$ ", ""));
	$('#recepcao' + nomeTabela).val(formataNumero(valorRecepcao, 2, false, true, "R$ ", ""));
	$('#carga' + nomeTabela).val(formataNumero(valorCarga, 2, false, true, "R$ ", ""));
	
	calculaTotalEntmilho(nomeTabela);
	
}
