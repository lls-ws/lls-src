/* =========================================================
 * formularioCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioCadastroCore(dados, tabs) {
	
	dados["tipoTextoBotao"] = 2;
	dados["tamanhoBotao"] = 4;
	dados["tamanhoOffSet"] = 3;
	dados["tipoOperacao"] = 0;
		
	if (dados.id > 0) dados.tipoOperacao = 1;
	
	var campoId = campoOculto('id' + dados.nomeTabela, dados.id);
	
	var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
	
	var botao = botaoHorizontal(
		'botao' + dados.nomeTabela,
		textoBotao(dados.tipoTextoBotao),
		'fa-check',
		dados.tamanhoBotao,
		dados.tamanhoOffSet,
		'btn btn-block btn-success',
		'submit',
		''
	);
	
	botao.find('#botao').attr('title', 'Salvar ' + titulo);
	
	if (dados.id > 0) botao.find('#botao').attr('title', 'Salvar ' + titulo + ': ' + dados.array.titulo);
	
	botao.find('div').addClass('col-xs-5 col-xs-offset-4');
	
	var formulario = formularioHorizontal(dados.nomeTabela.toLowerCase(), 'form-horizontal')
		.append(tabs)
		.append(botao)
		.append(campoId);
	
	eval('validarFormulario' + dados.nomeTabela + '(dados, formulario)');
	
	return formulario;
	
}
