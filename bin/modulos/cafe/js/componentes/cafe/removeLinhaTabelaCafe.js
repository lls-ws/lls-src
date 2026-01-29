/* =========================================================
 * removeLinhaTabelaCafe.js
 * http://lls.net.br/
 * ========================================================= */

function removeLinhaTabelaCafe(id, fechado, nomeTabela) {
	
	var tipo = $("#tipo" + nomeTabela).val();
	
	if (fechado == 'Sim' && tipo != 2) {
		
		var idLinha = '#' + nomeTabela.toLowerCase() + '_' + id;
		
		eval ("removeTotalTabela" + nomeTabela+ "('" + idLinha + "', '" + nomeTabela + "')");
		
		$('#tbodyLista' + nomeTabela).find(idLinha).remove();
		
	}
	
}
