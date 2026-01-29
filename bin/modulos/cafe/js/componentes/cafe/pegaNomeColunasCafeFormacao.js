/* =========================================================
 * pegaNomeColunasCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasCafeFormacao(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ações",
		lote: "Lote",
		peneira: "Peneira",
		pilha: "Pilha",
		observacao: "Observação",
		sacas: "Sacas",
		peso: "Peso"
	};
	
	switch (tipo) {
		case 1: 
			nomesColunas.visualizar = "Excluir";
			break;
		case 5: 
			delete nomesColunas["visualizar"];
			nomesColunas["id"] = "";
			nomesColunas["sacasAltera"] = "";
			nomesColunas["pesoAltera"] = "";
			break;
	}
	
	return nomesColunas;
	
}
