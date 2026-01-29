/* =========================================================
 * limpaDadosFormularioCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioCafeFormacao(dados) {
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	var lote = eval ('pegaNomeColunas' + dados.nomeTabela + '(5)');
	
	jQuery.each( lote, function( i, value ) {
		
		if (i == dados.campoProcura.toLowerCase()) {
		
			limpaCampoSqlProcuraCore(dados, "nome");
			
		}
		else formulario.find('#' + i + dados.nomeTabela).val('');
		
	});
	
}
