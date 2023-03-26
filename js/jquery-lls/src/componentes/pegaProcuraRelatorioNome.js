/* =========================================================
 * pegaProcuraRelatorioNome.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraRelatorioNome(pagina, nomeTabela) {
	
	var idProdutor = 0;
	
	if (!$('#nomeProcura' + nomeTabela + 'FazendaProdutorFormGroup').find('.limpa').is(":visible")) {
		
		idProdutor = $('#idnomeProcura' + nomeTabela + 'FazendaProdutor2').val();
		
	}
	
	var dadosRelatorio = {
		pagina: pagina,
		linhas: 8,
		idProdutor: idProdutor,
		idFazenda: $('#idnomeProcura' + nomeTabela + 'FazendaProdutor').val(),
	}
	
	return dadosRelatorio;
	
}
