/* =========================================================
 * limpaDadosFormularioTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioTracafe(nomeTabela) {
	
	limpaDadosFormularioCafe(nomeTabela);
	
	$('#nomeProcuraCadastro' + nomeTabela + 'DestinoFazendaProdutor')
		.attr('disabled', false).val('');
			
	$('#nome' + nomeTabela + 'FazendaProdutorDestinoMensagem')
		.text('').show();
		
	$('#idnome' + 'ProcuraCadastro' + nomeTabela + 'DestinoFazendaProdutor2')
		.val(0);
		
	$('#idnome' + 'ProcuraCadastro' + nomeTabela + 'DestinoFazendaProdutor')
		.val(0);
	
}
