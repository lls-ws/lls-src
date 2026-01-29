/* =========================================================
 * pegaDadosFormularioUsuario.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioUsuario(nomeTabela) {
	
	var dados = {
		senhaAtual: $('#senhaAtual' + nomeTabela).val(),
		senhaNova: $('#senhaNova' + nomeTabela).val(),
		senhaConfirma: $('#senhaConfirma' + nomeTabela).val()
	}
	
	return dados;
	
}
