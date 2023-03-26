/* =========================================================
 * checkRemoveLinhaTabela.js
 * http://lls.net.br/
 * ========================================================= */

function checkRemoveLinhaTabela(dados) {
	
	var line = $('#tbody' + dados.nomeTabela)
		.find('#' + dados.nomeTabela.toLowerCase() + '_' + dados.id).index();
	
	var rowCount = jQuery($('#tbody' + dados.nomeTabela)).find('tr').length;
	
	if (rowCount == line + 1) removeCadastroTabelaCore(dados);
	else {
		
		mostraDialog(
			'Proibido remover!<br>Primeiro remova a última linha!',
			'texto_cor_vermelho',
			'table',
			tituloPainelCadastro(3, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
		);
		
	}
	
}
