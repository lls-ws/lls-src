/* =========================================================
 * pegaNomeColunasBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasBaixacafe(tipo) {
	
	var nomesColunas = { 
		visualizar: "Excluir",
		data: "Data",
		obs: "Observações",
		valor: "Valor"
	};
	
	if (tipo >= 3) nomesColunas = "Baixa de Café";
	
	return nomesColunas;
	
}
