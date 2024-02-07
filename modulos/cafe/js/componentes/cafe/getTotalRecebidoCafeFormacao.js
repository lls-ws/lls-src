/* =========================================================
 * getTotalRecebidoCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function getTotalRecebidoCafeFormacao(campo, nomeTabelaCadastro) {
	
	var totalRecebido = $("#" + campo.toLowerCase() + nomeTabelaCadastro).val();
	
	if (campo == "Peso") totalRecebido = formataNumeroSql(totalRecebido);
	
	return totalRecebido;
	
}
