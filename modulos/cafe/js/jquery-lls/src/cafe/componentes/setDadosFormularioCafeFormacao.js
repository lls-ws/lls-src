/* =========================================================
 * setDadosFormularioCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioCafeFormacao(dados, formulario, tipo) {
	
	var lote = eval ('pegaTabela'+ dados.nomeTabela + '(dados)');
	
	lote["tipoOperacao"] = dados.tipoOperacao;
	lote["nomeTabela"] = dados.nomeTabela;
	lote["nomeTabelaCadastro"] =  dados.nomeTabelaCadastro;
	
	var campos = {
		sacas: "Sacas",
		peso: "Peso"
	}
	
	jQuery.each( campos, function( i, value ) {
		
		formulario.find('#' + i + 'Altera' + dados.nomeTabela).val(lote[i]);
		
	});
	
	setValoresCafeFormacao(lote, formulario, tipo);
	
	eval ('formataDados' + dados.nomeTabela + '(lote)');
	
	jQuery.each( lote, function( i, value ) {
		
		if (i == dados.campoProcura.toLowerCase()) {
		
			formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura)
					  .val(value).attr('disabled', true);
					  
		}
		else if (i == 'id' + dados.campoProcura) {
		
			formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura)
					  .val(value);
					  
		}
		else {
			
			if (i == 'peneira') {
				
				$('#nome' + dados.nomeTabela + dados.campoProcura + 'Mensagem')
					.text(value).show();
				
				$('#spanGroupSearch' + dados.nomeTabela + dados.campoProcura).unbind();
				
			}
			else formulario.find('#' + i + dados.nomeTabela).val(value).attr('disabled', false);
		}
		
	});
	
	if (dados.campoProcura == 'Lote') {
	
		jQuery.each( campos, function( i, value ) {
			
			var valor = lote[i + 'Saldo'];
			
			if (value == 'Peso') {
				
				valor = formataNumero(valor, 2, false, true, "", " kg");
				
				var media = lote[i + 'Media'];
				
				formulario.find('#' + i + dados.nomeTabela).val(lote.peso).attr('disabled', true);
				formulario.find('#' + i + "Media" + dados.nomeTabela).val(media).attr('disabled', true);
				
			}
			
			formulario.find('#' + i + 'Saldo' + dados.nomeTabela).val(valor).attr('disabled', true);
			
		});
		
		setValoresCafeFormacao(dados, formulario, tipo);

	}
	
	formulario.find('#sacas' + dados.nomeTabela).focus();
	
}
