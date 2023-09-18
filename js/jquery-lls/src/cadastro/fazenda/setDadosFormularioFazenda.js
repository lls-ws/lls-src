/* =========================================================
 * setDadosFormularioFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioFazenda(idFazenda, nomeTabela, tr, formulario) {
	
	var fazenda = pegaTabelaFazenda(tr, idFazenda);
	
	formataDadosFazenda(fazenda);
	
	formulario.find('#id' + nomeTabela).val(fazenda.id);
	formulario.find('#nome' + nomeTabela).val(fazenda.nome);
	formulario.find('#endereco' + nomeTabela).val(fazenda.endereco);
	formulario.find('#bairro' + nomeTabela).val(fazenda.bairro);
	formulario.find('#cidade' + nomeTabela).val(fazenda.cidade);
	formulario.find('#estado' + nomeTabela).val(fazenda.estado);
	formulario.find('#cep' + nomeTabela).val(fazenda.cep);
	formulario.find('#ie' + nomeTabela).val(fazenda.ie);
	formulario.find('#cpfcnpj' + nomeTabela).val(fazenda.cpfcnpj);
	
}
