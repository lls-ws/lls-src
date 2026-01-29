/* =========================================================
 * pegaDadosFormularioUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioUmidade(nomeTabela) {
	
	var dados = {
		id: $('#id' + nomeTabela).val(),
		codigo: formataNumeroSql($('#codigo' + nomeTabela).val()),
		desconto: formataNumeroSql($('#desconto' + nomeTabela).val()),
		valor: formataNumeroSql($('#valor' + nomeTabela).val())
	}
	
	return dados;
	
}
