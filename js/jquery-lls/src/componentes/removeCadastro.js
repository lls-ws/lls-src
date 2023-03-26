/* =========================================================
 * removeCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function removeCadastro(id, nome, nomeTabela) {
	
	var titulo = eval('pegaNomeColunas' + nomeTabela + '(3)');
	
	var $textoMensagem = 'Deseja realmente excluir?' + '<br>' + nome;
	
	mostraDialogOpcao(
		$textoMensagem,
		'texto_cor_vermelho',
		this,
		tituloPainelCadastro(3, titulo),
		id,
		nomeTabela,
		"Remover"
	);
	
}
