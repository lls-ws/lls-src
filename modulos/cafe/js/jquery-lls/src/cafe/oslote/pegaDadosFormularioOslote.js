/* =========================================================
 * pegaDadosFormularioOslote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioOslote(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		desdobras: $('#desdobras' + nomeTabela).val(),
		sacasDespejo: $('#sacasDespejo' + nomeTabela).val(),
		sacasQuebra: $('#sacasQuebra' + nomeTabela).val(),
		sacasAcrescimo: $('#sacasAcrescimo' + nomeTabela).val(),
		pesoDespejo: formataNumeroSql($('#pesoDespejo' + nomeTabela).val()),
		pesoQuebra: formataNumeroSql($('#pesoQuebra' + nomeTabela).val()),
		pesoAcrescimo: formataNumeroSql($('#pesoAcrescimo' + nomeTabela).val())		
	}
	
	return {
		cadastro: cadastro
	};
	
}
