/* =========================================================
 * removeCadastroTabelaCore.js
 * http://lls.net.br/
 * ========================================================= */

function removeCadastroTabelaCore(dados) {
	
	dados["textoMensagem"] = 'Deseja realmente excluir?<br>' + dados.titulo;
	dados["corTexto"] = 'texto_cor_vermelho';
	dados["opcao"] = "Remover";
	
	mostraDialogOpcaoCore(dados);
	
}
