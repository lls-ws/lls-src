/* =========================================================
 * criaLoteLote.js
 * http://lls.net.br/
 * ========================================================= */

function criaNumeroLote(nomeTabela, nomeTabelaCadastro) {
	
	var lote = $('#lote' + nomeTabelaCadastro).val();
	
	var rowCount = jQuery($('#tbody' + nomeTabela)).find('tr').length;
	
	var letra = colName(rowCount);
	
	return lote + '/' + letra.toUpperCase();
	
}

function colName(n) {
	var ordA = 'a'.charCodeAt(0);
	var ordZ = 'z'.charCodeAt(0);
	var len = ordZ - ordA + 1;
  
	var s = "";
	while(n >= 0) {
		s = String.fromCharCode(n % len + ordA) + s;
		n = Math.floor(n / len) - 1;
	}
	return s;
}
