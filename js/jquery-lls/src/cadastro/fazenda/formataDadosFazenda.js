/* =========================================================
 * formataDadosFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosFazenda(fazenda) {
	
	fazenda.nome = decodeURIComponent(fazenda.nome);
	fazenda.endereco = decodeURIComponent(fazenda.endereco);
	fazenda.bairro = decodeURIComponent(fazenda.bairro);
	fazenda.cidade = decodeURIComponent(fazenda.cidade);
	
	fazenda.estado = pegaValorCaixaCombinacao(fazenda.estado);
	
	fazenda.cep = pegaCepMascara(fazenda.cep);
	
	fazenda.cpfcnpj = pegaCpfCnpjMascara(fazenda.cpfcnpj);
	
}
