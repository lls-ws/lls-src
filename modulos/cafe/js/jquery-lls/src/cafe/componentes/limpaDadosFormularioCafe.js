/* =========================================================
 * limpaDadosFormularioCafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioCafe(nomeTabela) {
	
	var formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	var dados = eval ("pegaNomeColunas" + nomeTabela + "(1)");
	
	jQuery.each( dados, function( i, value ) {
		
		if (i == 'fazenda') limpaCampoSqlProcura("FazendaProdutor", "nome");
		else formulario.find('#' + i + nomeTabela).val('');
		
	});
	
	formulario.find('#observacao' + nomeTabela).val('');
	
	return formulario;
		
}
