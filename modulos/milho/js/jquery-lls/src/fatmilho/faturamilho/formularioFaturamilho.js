/* =========================================================
 * formularioFaturamilho.js
 * http://lls.net.br/
 * ========================================================= */

function formularioFaturamilho(idFaturamilho, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-botao.js", "js");
	
	var nomeTabelaProcura = "Milho";
	
	var nomeTabelas = nomeTabela + nomeTabelaProcura;
	
	var $formularioRelatorio = formularioRelatorioNomeData(
		nomeTabela,
		nomeTabelaProcura,
		"Produtor",
		"",
		""
	);
	
	var $formulario = formularioCadastro(idFaturamilho, nomeTabela, 3, 4, $formularioRelatorio);
	
	$formulario.find("#botaoFormGroup").find('div').addClass('col-md-2 col-md-offset-5');
	
	$formulario.submit(function(event) {
		
		event.preventDefault();
		
		eventoSalvarFaturamilho(1, nomeTabela);
		
	});
	
	$formularioRelatorio.find('#spanGroupClear' + nomeTabelas).hide();
	$formularioRelatorio.find('#spanGroupPrint' + nomeTabelas).hide();
	
	return $formulario;
	
}
