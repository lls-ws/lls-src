/* =========================================================
 * setDadosTabelaCadastro.is
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaCadastro(cadastrosTabela, nomeTabela, nomeTabelaCadastro) {
	
	if (cadastrosTabela != null) {
	
		for(var i = 0; i < cadastrosTabela.length; i++) {
			
			cadastrosTabela[i]["tipoOperacao"] = 0;
			
			cadastrosTabela[i]["nomeTabela"] = nomeTabela;
			
			if (nomeTabelaCadastro != null) {
				
				cadastrosTabela[i]["nomeTabelaCadastro"] = nomeTabelaCadastro;
				
			}
			
			addLinhaTabelaCadastro(cadastrosTabela[i]);
			
		}
		
	}
	
}
