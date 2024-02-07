/* =========================================================
 * checkValoresTralote.js
 * http://lls.net.br/
 * ========================================================= */

function checkValoresTralote(dados, formulario) {
	
	var cadastro = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	var campo = cadastro.cadastro;
	
	if (campo.desdobras == 0 || campo.sacas == 0 || campo.peso == 0) {
		formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[0]).hide();
	}
	else formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[0]).show();
	
}
