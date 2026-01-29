/* =========================================================
 * tabelaCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaCadastro(posicaoItemMenu, nomeTabela, textoLabel) {
	
	var formulario = formularioHorizontal('lista' + nomeTabela, 'formulario_cor');
	
	var $formularioProcura = formularioProcura(nomeTabela, textoLabel);
	
	var $formularioTabela = formularioTabela(nomeTabela);
	
	var $paginacao = paginacao(
		'paginaLista' + nomeTabela,
		'eventoLista' + nomeTabela,
		0, 0, nomeTabela
	);
	
	var titulo = $("<div/>").addClass('titulo_tabela')
		.text(tituloPainelCadastro(2, eval('pegaNomeColunas' + nomeTabela + '(3)')));
	
	var tituloTabela = $('<div/>')
		.addClass('input-group form-control formulario_cor')
		.append(titulo);
	
	formulario.append($formularioProcura)
		.append(tituloTabela)
		.append($formularioTabela)
		.append($paginacao);
	
	mudaPainel(formulario, posicaoItemMenu);
	
	$('#nomeProcura').focus();
	
}
