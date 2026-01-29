/* =========================================================
 * pegaNomeColunasProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasProdutor(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		nome: "Nome",
		cpfcnpj: "CPF|CNPJ",
		endereco: "Endereço",
		bairro: "Bairro",
		cidade: "Cidade",
		estado: "Estado",
		cep: "Cep"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Produtor";
		
	}
	
	return nomesColunas;
	
}
