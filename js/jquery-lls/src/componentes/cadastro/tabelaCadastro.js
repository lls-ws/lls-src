/* =========================================================
 * tabelaCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaCadastro(posicaoItemMenu, nomeTabela, textoLabel) {
	
	var $formulario = formularioHorizontal('lista' + nomeTabela, 'formulario_cor');
	
	var $formularioProcura = formularioProcura(nomeTabela, textoLabel);
	
	var $formularioTabela = formularioTabela(nomeTabela);
	
	var $paginacao = paginacao(
		'paginaLista' + nomeTabela,
		'eventoLista' + nomeTabela,
		0, 0, nomeTabela
	);
	
	var $divTitulo = $('<div/>').addClass('input-group form-control formulario_cor');
	
	var $titulo = label(
		'nomeProcura',
		tituloPainelCadastro(2, eval('pegaNomeColunas' + nomeTabela + '(3)')),
		'texto_label texto_grande'
	).addClass('col-md-12 col-xs-12');
	
	$divTitulo.append($titulo);
	
	$formulario.append($formularioProcura);
	$formulario.append($divTitulo);
	$formulario.append($formularioTabela);
	$formulario.append($paginacao);
	
	mudaPainel($formulario, posicaoItemMenu);
	
	$('#nomeProcura').focus();
	
}
