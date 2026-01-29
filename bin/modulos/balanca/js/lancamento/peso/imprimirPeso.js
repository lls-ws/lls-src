/* =========================================================
 * imprimirPeso.js
 * http://lls.net.br/
 * ========================================================= */

function imprimirPeso(dados, mensagem) {
	
	dados.tituloImprimi = "Ticket de Peso";
	
	var msg = 'Deseja imprimir o ' + dados.tituloImprimi;
	
	if (mensagem == null) mensagem = msg + ': ' + dados.titulo;
	else {
		mensagem = mensagem.substring(0, mensagem.indexOf('!')) + "!" + '<br>' + msg + ': ' +
			mensagem.split('!').splice(-1);
	}
	
	var url = "imprimir" + dados.nomeTabela;
	
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
