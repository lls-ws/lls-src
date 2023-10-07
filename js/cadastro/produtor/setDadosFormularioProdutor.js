/* =========================================================
 * setDadosFormularioProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioProdutor(produtor) {
	
	formataDadosProdutor(produtor);
	
	$('#divDialogAlteraProdutor').empty();
	
	$('#divDialogAlteraProdutor').remove();
	
	var formulario = formularioProdutor(produtor.id, produtor.nomeTabela);
	
	mostraDialogAlterar(formulario, tituloPainelCadastro(1, produtor.nomeTabela), 'Altera' + produtor.nomeTabela);
	
	formulario.find('#idProdutor').val(produtor.id);
	formulario.find('#nomeProdutor').val(produtor.nome);
	formulario.find('#enderecoProdutor').val(produtor.endereco);
	formulario.find('#bairroProdutor').val(produtor.bairro);
	formulario.find('#cidadeProdutor').val(produtor.cidade);
	formulario.find('#estadoProdutor').val(produtor.estado);
	formulario.find('#cepProdutor').val(produtor.cep);
	formulario.find('#emailProdutor').val(produtor.email);
	formulario.find('#siteProdutor').val(produtor.site);
	formulario.find('#cpfcnpjProdutor').val(produtor.cpfcnpj);
	formulario.find('#observacaoProdutor').val(produtor.observacao);
	
	if (produtor.cpfcnpj.length == 18) {
		
		formulario.find('#cpfcnpjProdutorRadioCnpj').attr('checked', 'true');
		formulario.find('#cpfcnpjProdutor').mask("99.999.999/9999-99");
		formulario.find('#cpfcnpjProdutor').attr('placeholder', '__.___.___/____-__');
		formulario.find('#cpfcnpjProdutorLabel').text('CNPJ');
		
	}
	
	setDadosTabelaCadastro(produtor.fazendas, 'Fazenda');
	
	setDadosTabelaCadastro(produtor.telefones, 'Telefone');
	
}
