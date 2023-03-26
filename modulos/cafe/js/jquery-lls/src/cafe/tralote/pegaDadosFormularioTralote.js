/* =========================================================
 * pegaDadosFormularioTralote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioTralote(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		desdobras: $('#desdobras' + nomeTabela).val(),
		sacas: $('#sacas' + nomeTabela).val(),
		peso: formataNumeroSql($('#peso' + nomeTabela).val())		
	}
	
	return {
		cadastro: cadastro
	};
	
}
