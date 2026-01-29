/* =========================================================
 * pegaDadosFormularioCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioCafeFormacao(dados) {
	
	var lote = {
		id: $("#id" + dados.nomeTabela).val(),
		lote: $("#lote" + dados.nomeTabela).val(),
		sacas: $("#sacas" + dados.nomeTabela).val(),
		peso: formataNumeroSql($("#peso" + dados.nomeTabela).val()),
		pilha: $("#pilha" + dados.nomeTabela).val(),
		observacao: encodeURIComponent( unescape($("#observacao" + dados.nomeTabela).val()))
	}
	
	var idCampoProcura = {
		id: $("#idnomeProcuraCadastro" + dados.nomeTabela + dados.campoProcura).val()
	};
	
	var cafe = eval ("pegaDadosFormulario" + dados.nomeTabelaCadastro + "(dados.nomeTabelaCadastro)");
	
	return {
		lote: lote,
		cadastro: cafe.cadastro,
		idCampoProcura: idCampoProcura
	};
	
}
