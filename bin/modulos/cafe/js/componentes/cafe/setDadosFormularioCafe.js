/* =========================================================
 * setDadosFormularioCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioCafe(dados) {
	
	eval ("formataDados" + dados.nomeTabela + "(dados.array)");
	
	var formulario = eval ("formulario" + dados.nomeTabela + "(dados)");
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(1, eval('pegaNomeColunas' + dados.nomeTabela + '(3)')),
		'Altera' + dados.nomeTabela
	);
	
	jQuery.each( dados.array, function( i, value ) {
		
		if (i == 'produtor') {
			
			formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
				.val(value)
				.attr('disabled', 'disabled');
				
		}
		else if (i == 'fazenda') {
			
			formulario.find('#nome' + dados.nomeTabela + 'FazendaProdutorMensagem')
				.text(value)
				.show();
			
		}
		else if (i == 'idProdutor') {
			
			formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor2')
				.val(value);
			
		}
		else if (i == 'idFazenda') {
			
			formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
				.val(value);
			
		}
		else formulario.find('#' + i + dados.nomeTabela).val(value);
		
	});
	
	formulario.find('#sacas' + dados.nomeTabela).focus();
	
}
