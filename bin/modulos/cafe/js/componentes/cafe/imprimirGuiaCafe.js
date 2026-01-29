/* =========================================================
 * imprimirGuiaCafe.js
 * http://lls.net.br/
 * ========================================================= */

function imprimirGuiaCafe(dados, mensagem, tipo) {
	
	var msg = 'Deseja imprimir a ' + dados.tituloImprimi;
	
	if (mensagem == null) mensagem = msg + ': ' + dados.array.titulo;
	else {
		mensagem = mensagem.substring(0, mensagem.indexOf('!')) + "!" + '<br>' + msg + ': ' +
			mensagem.split('!').splice(-1);
	}
	
	var url = "guia" + dados.nomeTabela;;
	
	if (!$('#botaoAlterar' + dados.nomeTabela).is(':visible') && tipo == null) {
	
		url += "Fechada";
		
	}
	
	mostraDialogOpcao(
		mensagem,
		"texto_cor_verde",
		"table",
		tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)')),
		dados.id,
		dados.nomeTabela,
		"Imprimir",
		url
	);
	
}
