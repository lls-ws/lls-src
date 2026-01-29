/* =========================================================
 * removeCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function removeCadastroCore(dados) {
	
	var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
	
	var textoMensagem = 'Deseja realmente excluir?<br>' +
		titulo + ': ' + dados.array.titulo;
	
	mostraDialogOpcao(
		textoMensagem,
		'texto_cor_vermelho',
		this,
		tituloPainelCadastro(3, titulo),
		dados.id,
		dados.nomeTabela,
		"Remover"
	);
	
}
