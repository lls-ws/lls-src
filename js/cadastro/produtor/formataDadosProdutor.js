/* =========================================================
 * formataDadosProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosProdutor(produtor) {
	
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
