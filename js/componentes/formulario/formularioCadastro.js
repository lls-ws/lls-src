/* =========================================================
 * formularioCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function formularioCadastro(idCadastro, nomeTabela, tipoTextoBotao, tamanhoBotao,
							objeto, tamanhoOffSet, nomeTabelaCadastro) {
	
	var $tipoOperacao = 0;
	
	if (idCadastro > 0) {
		
		$tipoOperacao = 1;
		
	}
	
	if (tamanhoOffSet == null) tamanhoOffSet = 4;
	
	var $campoOculto = campoOculto('id' + nomeTabela, idCadastro);
	
	var $botao = botaoHorizontal(
		'botao' + nomeTabela,
		textoBotao(tipoTextoBotao),
		'check',
		tamanhoBotao,
		tamanhoOffSet,
		'btn btn-block btn-success',
		'submit',
		''
	);
	
	$botao.find('div').addClass('col-xs-5 col-xs-offset-4');
	
	var $formulario = formularioHorizontal(nomeTabela.toLowerCase(), 'form-horizontal')
		.append(objeto)
		.append($botao)
		.append($campoOculto);
		
	eval('validarFormulario' + nomeTabela + '("' + $tipoOperacao + '", "' +
		nomeTabela + '", $formulario, "' + nomeTabelaCadastro + '")'
	);
	
	return $formulario;
	
}
