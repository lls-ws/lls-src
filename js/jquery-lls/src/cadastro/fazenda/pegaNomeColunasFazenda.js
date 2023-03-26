/* =========================================================
 * pegaNomeColunasFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasFazenda(tipo) {
	
	var nomesColunas = { 
		acao: "Ações",
		nome: "Nome",
		ie: "Insc. Est.",
		cpfcnpj: "CPF|CNPJ",
		endereco: "Endereço",
		bairro: "Bairro",
		cidade: "Cidade",
		estado: "Estado",
		cep: "Cep"
	};
	
	switch (tipo) {
		case 1: 
			delete nomesColunas["acao"];
			break;
		case 3: 
			nomesColunas = "Fazenda";
			break;
	}
	
	return nomesColunas;
	
}
