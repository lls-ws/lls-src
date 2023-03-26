/* =========================================================
 * pegaNomeColunasServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasServcafe(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ações",
		data: "Data",
		servico: "Serviço",
		sacas: "Sacas",
		valor: "Valor"
	};
	
	switch (tipo) {
		case 1: 
			nomesColunas.visualizar = "Excluir";
			break;
		case 3: 
			nomesColunas = "Cobrança de Café";
			break;
		case 4: 
			nomesColunas = "Cobrança de Serviço de Café";
			break;
		case 5: 
			delete nomesColunas["visualizar"];
			nomesColunas["id"] = "";
			nomesColunas["valorAltera"] = "";
			break;
	}
	
	return nomesColunas;
	
}
