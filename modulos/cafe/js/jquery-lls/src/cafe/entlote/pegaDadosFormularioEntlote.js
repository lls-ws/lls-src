/* =========================================================
 * pegaDadosFormularioEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioEntlote(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		sacas: $("#sacas" + nomeTabela).val(),
		peso: formataNumeroSql($("#peso" + nomeTabela).val()),
		desdobras: $("#desdobras" + nomeTabela).val(),
		cobrar: $("#cobrar" + nomeTabela).prop('checked')
	}
	
	return {
		cadastro: cadastro
	};
	
}
