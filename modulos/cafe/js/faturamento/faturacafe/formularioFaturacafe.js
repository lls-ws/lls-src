/* =========================================================
 * formularioFaturacafe.js
 * http://lls.net.br/
 * ========================================================= */

function formularioFaturacafe(dados) {
	
	dados["nomeTabelaExecuta"] = dados.nomeTabela + "Executa";
	
	var nomeTabelaProcura = "FazendaProdutor";
	
	var nomeTabelas = dados.nomeTabelaExecuta + nomeTabelaProcura;
	
	var formularioRelatorio = formularioRelatorioNomeData(
		dados.nomeTabelaExecuta,
		nomeTabelaProcura,
		"Produtor",
		"",
		""
	);
	
	var formulario = formularioCadastro(dados.id, dados.nomeTabela, 3, 4, formularioRelatorio);
	
	formulario.find("#botaoFormGroup").find('div').addClass('col-md-2 col-md-offset-5');
	
	formulario.submit(function(event) {
		
		event.preventDefault();
		
		eventoSalvarFaturacafe(dados);
		
	});
	
	formularioRelatorio.find('#spanGroupClear' + nomeTabelas).hide();
	formularioRelatorio.find('#spanGroupPrint' + nomeTabelas).hide();
	
	return formulario;
	
}
