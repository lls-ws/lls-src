/* =========================================================
 * setEventosCamposDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposDespejo(dados, formulario) {
	
	setEventosCamposCafeFormacao(dados, formulario, 2);
	
	formulario.find('#sacas' + dados.nomeTabela)
		.bind("propertychange change click keyup input paste", function(event) {
		
			calculaLiquidoDespejo(dados);
		
	});
	
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura + 'DivInput span')
		.on('change', function() {
		
		var idLote = $('#idnomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura).val();
		
		var sacas = 0;
		var peso = 0;
		
		if (idLote > 0) {
		
			var textoLote = formulario.find('#nome' + dados.nomeTabela + dados.campoProcura + 'Mensagem').text();
			
			var textoLoteArray = textoLote.split('#');
			
			sacas = textoLoteArray[0];
			peso = textoLoteArray[1];
			sacasTotal = textoLoteArray[2];
			pesoTotal = textoLoteArray[3];
			observacao = textoLoteArray[4];
			pilha = textoLoteArray[5];
			
			formulario.find('#sacasSaldo' + dados.nomeTabela).val(sacas);
			formulario.find('#pesoSaldo' + dados.nomeTabela).val(peso);
			formulario.find('#sacasTotal' + dados.nomeTabela).val(sacasTotal);
			formulario.find('#pesoTotal' + dados.nomeTabela).val(pesoTotal);
			formulario.find('#observacao' + dados.nomeTabela).val(observacao);
			formulario.find('#pilha' + dados.nomeTabela).val(pilha);
			
			formulario.find('#sacas' + dados.nomeTabela).attr("disabled", false);
			
			formulario.find('#nome' + dados.nomeTabela + dados.campoProcura + 'Mensagem')
				.text(textoLoteArray[6]);
			
			setValoresCafeFormacao(dados, formulario, 2);
			
		}
		else {
			
			formulario.find('#sacasSaldo' + dados.nomeTabela).val('');
			formulario.find('#pesoSaldo' + dados.nomeTabela).val('');
			formulario.find('#sacasTotal' + dados.nomeTabela).val('');
			formulario.find('#pesoTotal' + dados.nomeTabela).val('');
			formulario.find('#observacao' + dados.nomeTabela).val('');
			formulario.find('#pilha' + dados.nomeTabela).val('');
			
			formulario.find('#sacas' + dados.nomeTabela).attr("disabled", true);
			
		}
		
	});
	
}
