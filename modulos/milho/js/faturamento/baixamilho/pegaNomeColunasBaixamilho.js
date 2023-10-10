/* =========================================================
 * pegaNomeColunasBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasBaixamilho(tipo) {
	
	var nomesColunas = { 
		visualizar: "Excluir",
		data: "Data",
		valor: "Valor",
		obs: "Observações"
	};
	
	if (tipo == 3) {
		
		nomesColunas = "Baixa de Milho";
		
	}
	
	return nomesColunas;
	
}
