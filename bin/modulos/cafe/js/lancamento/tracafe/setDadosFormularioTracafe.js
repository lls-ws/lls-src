/* =========================================================
 * setDadosFormularioTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioTracafe(dados) {
	
	setDadosFormularioDespejoCafe(dados);
	
	$('#nomeProcuraCadastro' + dados.nomeTabela + 'DestinoFazendaProdutor')
		.val(dados.array.produtorDestino)
		.attr('disabled', 'disabled');
			
	$('#nome' + dados.nomeTabela + 'DestinoFazendaProdutorMensagem')
		.text(dados.array.fazendaDestino)
		.show();
		
	$('#idnomeProcuraCadastro' + dados.nomeTabela + 'DestinoFazendaProdutor2')
		.val(dados.array.idProdutorDestino);
		
	$('#idnomeProcuraCadastro' + dados.nomeTabela + 'DestinoFazendaProdutor')
		.val(dados.array.idFazendaDestino);
	
}
