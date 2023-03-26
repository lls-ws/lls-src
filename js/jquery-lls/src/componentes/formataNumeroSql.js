/* =========================================================
 * formataNumeroSql.js
 * http://lls.net.br/
 * ========================================================= */

function formataNumeroSql(numero) {
	
	carregaCssJs("js/jquery.maskMoney.min.js", "js");
	
	var valor = input('formataNumero', 'text', 'form-control', '', false, null)
		.val(numero)
		.maskMoney('unmasked')[0];
	
	return valor;
	
}
