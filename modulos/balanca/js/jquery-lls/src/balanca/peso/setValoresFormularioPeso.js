/* =========================================================
 * setValoresFormularioPeso.js
 * http://lls.net.br/
 * ========================================================= */

function setValoresFormularioPeso(dados, formulario) {
	
	if (dados.array.idProdutor == 0) {
			
		formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
			.val(0);
			
		formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor2')
			.val(0);
		
		formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
			.attr('disabled', 'enabled');
			
		formulario.find('#nome' + dados.nomeTabela + 'FazendaProdutorMensagem')
			.hide();
			
	}
	else {
		
		formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
			.val(dados.array.idFazenda);
			
		formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor2')
			.val(dados.array.idProdutor);
		
		formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
			.attr('disabled', 'disabled');
					
		formulario.find('#nome' + dados.nomeTabela + 'FazendaProdutorMensagem')
			.show();
	
	}	
	
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
		.val(dados.array.produtor)
		
	formulario.find('#nome' + dados.nomeTabela + 'FazendaProdutorMensagem')
		.text(dados.array.fazenda)
	
	var tara = formataNumeroSql(dados.array.tara);
	
	if (tara == 0) formulario.find('#tipo' + dados.nomeTabela + "Bruto").attr('checked', 'checked');
	else {
		
		formulario.find('#tipo' + dados.nomeTabela + "Tara").attr('checked', 'checked');
		formulario.find('#sacas' + dados.nomeTabela).val(dados.array.qtd);
		
	}
	
}
