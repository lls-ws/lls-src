/* =========================================================
 * pegaNomeColunasServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasServicocafe(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		produtor: "Produtor",
		fazenda: "Fazenda",
		data: "Data",
		servico: "Serviço",
		total: "Total",
		pago: "Pago",
		valor: "Valor"
	};
	
	if (tipo == 3) nomesColunas = "Cobrança de Café";
	
	return nomesColunas;
	
}
