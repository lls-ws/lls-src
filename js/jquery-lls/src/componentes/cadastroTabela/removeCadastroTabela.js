/* =========================================================
 * removeCadastroTabela.js
 * http://lls.net.br/
 * ========================================================= */

function removeCadastroTabela(nomeTabela, idLinhaTabela, texto, url) {
	
	var $arrayIdsLinhaTabela = idLinhaTabela.split('_');
	
	var $idLinhaTabela = $arrayIdsLinhaTabela[0];
	
	if ($idLinhaTabela == 0) {
		
		var $textoMensagem = 'Deseja realmente excluir?<br>' + nomeTabela + ': ' + texto;
		
		mostraDialogRemoverLinha($textoMensagem,
						'texto_cor_vermelho',
						'table',
						tituloPainelCadastro(3, nomeTabela),
						idLinhaTabela,
						nomeTabela);
		
	}
	else {
		
		var textoMensagem = 'Deseja realmente excluir?<br>' + texto;
		
		var titulo = eval('pegaNomeColunas' + nomeTabela + '(3)');
		
		mostraDialogOpcao(
			textoMensagem,
			'texto_cor_vermelho',
			'table',
			tituloPainelCadastro(3, titulo),
			idLinhaTabela,
			nomeTabela,
			"Remover",
			url
		);
		
	}
	
}
