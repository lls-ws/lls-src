/* =========================================================
 * calculaLiquidoBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function calculaLiquidoBaixapeso(dados) {
	
	var peso = eval ('pegaValores' + dados.nomeTabela + '(dados)');
	
	$('#liquido' + dados.nomeTabela)
		.val(formataNumero(peso.liquido, 2, false, false, "", " kg"));
	
}
