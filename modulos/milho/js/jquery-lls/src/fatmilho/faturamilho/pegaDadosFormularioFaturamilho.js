/* =========================================================
 * pegaDadosFormularioFaturamilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioFaturamilho(nomeTabela, tipoOperacao) {
	
	var dados = {
		nome: '',
		pagina: 0,
		linhas: 0,
		idProdutor: 0,
		idFazenda: $("#idnomeProcura" + nomeTabela + "Milho").val(),
		dataInicial: $("#dataInicial" + nomeTabela).datepicker("getDate"),
		dataFinal: $("#dataFinal" + nomeTabela).datepicker("getDate")
	}
	
	return dados;
	
	
}
