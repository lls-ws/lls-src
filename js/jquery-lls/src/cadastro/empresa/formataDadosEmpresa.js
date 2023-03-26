/* =========================================================
 * formataDadosEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosEmpresa(empresa) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cep.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cpf.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-telefone.js", "js");
	
	empresa.nome = decodeURIComponent(empresa.nome);
	empresa.endereco = decodeURIComponent(empresa.endereco);
	empresa.bairro = decodeURIComponent(empresa.bairro);
	empresa.cidade = decodeURIComponent(empresa.cidade);
	
	empresa.cpfcnpj = pegaCpfCnpjMascara(empresa.cpfcnpj);
	
	empresa.cep = pegaCepMascara(empresa.cep);
	
	empresa.telefone = pegaTelefoneMascara(empresa.telefone);
	
}
