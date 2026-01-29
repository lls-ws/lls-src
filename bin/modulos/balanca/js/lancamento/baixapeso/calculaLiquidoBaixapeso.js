/* =========================================================
 * calculaLiquidoBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function calculaLiquidoBaixapeso(dados) {
	
	var peso = eval ('pegaValores' + dados.nomeTabela + '(dados)');
		
	$('#liquido' + dados.nomeTabela)
		.val(formataNumero(peso.liquido, 2, true, false, "", " kg"));
	
}
