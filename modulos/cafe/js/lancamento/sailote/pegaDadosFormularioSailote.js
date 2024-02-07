/* =========================================================
 * pegaDadosFormularioSailote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioSailote(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		ticket: $('#ticket' + nomeTabela).val(),
		sacas: $('#sacas' + nomeTabela).val(),
		peso: formataNumeroSql($('#peso' + nomeTabela).val()),
		sacasDespejo: $('#sacasDespejo' + nomeTabela).val(),
		pesoDespejo: formataNumeroSql($('#pesoDespejo' + nomeTabela).val()),
		cobrar: $("#cobrar" + nomeTabela).prop('checked'),
		observacao: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	return {
		cadastro: cadastro
	};
	
}
