/* =========================================================
 * pegaDadosFormularioFaturacafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioFaturacafe(nomeTabela) {
	
	var dados = {
		nome: '',
		pagina: 0,
		linhas: 0,
		idProdutor: 0,
		idFazenda: $("#idnomeProcura" + nomeTabela + "FazendaProdutor").val(),
		dataInicial: $("#dataInicial" + nomeTabela).datepicker("getDate"),
		dataFinal: $("#dataFinal" + nomeTabela).datepicker("getDate")
	}
	
	return dados;
	
	
}
