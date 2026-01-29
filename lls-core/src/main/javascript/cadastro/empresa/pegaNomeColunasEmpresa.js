/* =========================================================
 * pegaNomeColunasEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasEmpresa(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		nome: "Nome",
		endereco: "Endereço",
		bairro: "Bairro",
		cidade: "Cidade",
		estado: "Estado",
		cep: "Cep",
		cpfcnpj: "CPF|CNPJ",
		ie: "Insc. Est.",
		email: "Email",
		site: "Site",
		telefone: "Telefone"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Empresa";
		
	}
	
	return nomesColunas;
	
}
