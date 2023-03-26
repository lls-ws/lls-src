/* =========================================================
 * limpaCampoSqlProcuraCore.js
 * http://lls.net.br/
 * ========================================================= */

function limpaCampoSqlProcuraCore(dados, tipo) {
	
	$('#' + tipo + 'ProcuraCadastro' + dados.nomeTabela + dados.campoProcura)
		.attr('disabled', false).val('');
			
	$('#' + tipo + dados.nomeTabela + dados.campoProcura + 'Mensagem')
		.text('').hide();
		
		
	$('#id'+ tipo + 'ProcuraCadastro' + dados.nomeTabela + dados.campoProcura + '2')
		.val(0);
		
	$('#id'+ tipo + 'ProcuraCadastro' + dados.nomeTabela + dados.campoProcura)
		.val(0);
	
}
