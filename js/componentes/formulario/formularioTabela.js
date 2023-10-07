/* =========================================================
 * formularioTabela.js
 * http://lls.net.br/
 * ========================================================= */

function formularioTabela(nomeTabela) {
	
	var tbodyTabela = tbody('tbodyLista' + nomeTabela);
	
	var tabelaFormulario = tabela(
		'tableLista' + nomeTabela,
		eval('pegaNomeColunas' + nomeTabela + '(2)')
	).append(tbodyTabela);
	
	var formulario = formularioHorizontal(
		'formularioTabela' + nomeTabela,
		'form-table table-responsive'
	).append(tabelaFormulario);
	
	return formulario;
	
}
