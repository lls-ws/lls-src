/* =========================================================
 * removeTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function removeTelefone(idTelefone, numero) {
	
	removeCadastroTabela('Telefone', idTelefone, pegaTelefoneMascara(numero));
		
}
