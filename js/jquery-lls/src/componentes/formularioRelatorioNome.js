/* =========================================================
 * formularioRelatorioNome.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNome(nomeTabela, nomeTabelaProcura, nomeProcura, urlSearch) {
	
	var $placeholder = "Digite o nome do " + nomeProcura.toLowerCase();
	
	var $campoNomeProcura = campoSqlProcuraTextoRelatorio(
		nomeProcura,
		nomeTabela,
		nomeTabelaProcura,
		$placeholder,
		2
	);
	
	var $divProcuraNome = $('<div/>')
		.attr('id', 'inputGroup' + nomeTabela)
		.addClass('input-group form-control formulario_cor')
		.append($campoNomeProcura);
	
	formularioRelatorioNomeHide(nomeTabela, nomeTabelaProcura, urlSearch, $divProcuraNome);
	
	return $divProcuraNome;
	
}
