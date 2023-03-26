/* =========================================================
 * formataDadosProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosProdutor(produtor) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cep.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cpf.js", "js");
	
	produtor.nome = decodeURIComponent(produtor.nome);
	produtor.endereco = decodeURIComponent(produtor.endereco);
	produtor.bairro = decodeURIComponent(produtor.bairro);
	produtor.cidade = decodeURIComponent(produtor.cidade);
	produtor.observacao = decodeURIComponent(produtor.observacao);
	
	produtor.cpfcnpj = pegaCpfCnpjMascara(produtor.cpfcnpj);
	
	produtor.cep = pegaCepMascara(produtor.cep);
	
	produtor["alterar"] = 0;
	produtor["remover"] = 1;
	
	$('#nomeProcuraBotaoAdd').attr('title', 'Adicionar novo produtor!');
	
}
