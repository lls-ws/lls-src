/* =========================================================
 * pegaNomeColunasExtratocafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasExtratocafe(tipo) {
	
	var nomesColunas = { 
		data: "Data",
		lote: "Lote",
		produtor: "Produtor",
		fazenda: "Fazenda",
		peneira: "Peneira",
		pilha: "Pilha",
		observacao: "Observação",
		sacas: "Sacas",
		peso: "Peso"
	};
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Lotes de Café";
			break;
	}
	
	return nomesColunas;
	
}
