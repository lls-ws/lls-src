/* =========================================================
 * pegaNomeColunasPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasPeneira(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		nome: "Nome"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Cadastro de Peneiras";
		
	}
	
	return nomesColunas;
	
}
