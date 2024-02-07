/* =========================================================
 * pegaTabelaDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaDespejo(dados) {

	var ids = {
		idLote : {id: dados.id},
		idCadastro: {id: dados.idCadastro}
	}
	
	var lote = getJsonCore("acha" + dados.nomeTabela + dados.nomeTabelaCadastro, ids);
	
	return lote;
	
}
