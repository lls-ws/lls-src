/* =========================================================
 * setDadosFormularioServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioServicocafe(dados) {
	
	setDadosFormularioCafe(dados);

	$('#nomeProcuraCadastro' + dados.nomeTabela + 'Preco').val(dados.array.servico).attr('disabled', 'disabled');
	
	$('#nome' + dados.nomeTabela + 'PrecoMensagem').text(formataNumero(dados.array.valorServico, 2, true, true, "R$ ", "")).show();
		
	$('#idnomeProcuraCadastro' + dados.nomeTabela + 'Preco').val(dados.array.idServico);

	$('#sacas' + dados.nomeTabela).focus();

}
