/* =========================================================
 * pegaNomeColunasTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasTelefone(tipo) {
	
	var nomesColunas = { 
		acao: "Ações",
		numero: "Número",
		responsavel: "Contato",
		tipo: "Tipo",
		operadora: "Operadora"
	};
	
	switch (tipo) {
		case 1: 
			delete nomesColunas["acao"];
			break;
		case 3: 
			nomesColunas = "Telefone";
			break;
	}
	
	return nomesColunas;
	
}
