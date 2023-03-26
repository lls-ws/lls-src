/* =========================================================
 * calculaLiquidoCafe.js
 * http://lls.net.br/
 * ========================================================= */

function calculaLiquidoCafe(nomeTabela) {
	
	var valorSacas = $('#sacas' + nomeTabela).val();
	
	var valorLiquido = valorSacas * 60.5;
	
	$('#peso' + nomeTabela).val(formataNumero(valorLiquido, 2, false, false, "", " kg"));
	
}
