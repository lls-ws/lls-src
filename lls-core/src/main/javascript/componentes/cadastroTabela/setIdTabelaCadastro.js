/* =========================================================
 * setIdTabelaCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function setIdTabelaCadastro(cadastro, tbody) {
	
	if (cadastro.id == 0) {
		
		var rowCount = tbody.find('tr').length;
		
		cadastro.id = cadastro.id + '_' + rowCount;
		
	}
	
	var idLinha = cadastro.nomeTabela.toLowerCase() + '_' + cadastro.id;
	
	var trCadastro = tr(idLinha, '');
	
	return trCadastro;
	
}
