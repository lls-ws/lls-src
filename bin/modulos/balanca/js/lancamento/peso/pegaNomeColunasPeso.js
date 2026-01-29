/* =========================================================
 * pegaNomeColunasPeso.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasPeso(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		data: "Data",
		ticket: "Ticket",
		placa: "Placa",
		produtor: "Produtor",
		fazenda: "Fazenda",
		produto: "Produto",
		tipo: "Tipo",
		tara: "Tara",
		bruto: "Bruto",
		liquido: "Líquido"
	};
	
	if (tipo == 3) nomesColunas = "Pesagem da Balança";
	
	return nomesColunas;
	
}
