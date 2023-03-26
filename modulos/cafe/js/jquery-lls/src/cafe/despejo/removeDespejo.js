/* =========================================================
 * removeDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function removeDespejo(dados) {
	
	dados["idLote"] = {id: dados.id};
	dados["idCadastro"] = {id: dados.idCadastro};
	
	removeCadastroTabelaCore(dados);
	
}
