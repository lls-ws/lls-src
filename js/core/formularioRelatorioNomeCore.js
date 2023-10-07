/* =========================================================
 * formularioRelatorioNomeCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeCore(dados, nomeTabelaProcura, nomeProcura, urlSearch) {
	
	if (urlSearch == null) urlSearch = 'eventoListaCadastroCore(' + JSON.stringify(dados) + ')';
	
	var placeholder = "Digite o nome do " + nomeProcura.toLowerCase();
	
	var campoNomeProcura = campoSqlProcuraTextoRelatorioCore(
		dados,
		nomeProcura,
		nomeTabelaProcura,
		placeholder,
		2
	);
	
	var divProcuraNome = $('<div/>')
		.attr('id', 'inputGroup' + dados.nomeTabela)
		.addClass('input-group form-control formulario_cor')
		.append(campoNomeProcura);
	
	formularioRelatorioNomeHide(dados.nomeTabela, nomeTabelaProcura, urlSearch, divProcuraNome);
	
	return divProcuraNome;
	
}
