/* =========================================================
 * setEventosCamposCafePeso.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposCafePeso(dados, formulario) {
	
	var fazendaProdutor_id = formulario.find("#idnomeProcuraCadastro" + dados.nomeTabela + "FazendaProdutor").val();
	
	var tipoProduto = formulario.find('#produto' + dados.nomeTabela).find(":selected").val();
	
	var tipoPeso = $("input[name='tipo" + dados.nomeTabela + "']:checked").val();
	
	if(tipoProduto == "CAFE" && fazendaProdutor_id > 0 && tipoPeso == "BRUTO") {
			
		formulario.find('#lote' + dados.nomeTabela + 'FormGroup').show();
		formulario.find('#sacas' + dados.nomeTabela + 'FormGroup').show();
		formulario.find('#nota' + dados.nomeTabela + 'FormGroup').show();
		formulario.find('#valor' + dados.nomeTabela + 'FormGroup').show();
		
		formulario.find('#sacas' + dados.nomeTabela)
			.prop('disabled', false)
			.focus()
			.valid();
		
	}
	else {
		
		if (tipoPeso == "TARA") {
			
			formulario.find('#lote' + dados.nomeTabela + 'FormGroup').hide();
			formulario.find('#nota' + dados.nomeTabela + 'FormGroup').hide();
			formulario.find('#valor' + dados.nomeTabela + 'FormGroup').hide();
			
			formulario.find('#sacas' + dados.nomeTabela).rules('remove', 'required');
			formulario.find('#sacas' + dados.nomeTabela).rules('remove', 'min');
			
			formulario.find('#sacas' + dados.nomeTabela + 'Label').text("Quantidade");
			
			formulario.find('#sacas' + dados.nomeTabela + 'FormGroup').show();
			
			formulario.find('#sacas' + dados.nomeTabela)
			.prop('disabled', false)
			.focus()
			.valid();
			
		}
		else {
			
			formulario.find('#sacas' + dados.nomeTabela).prop('disabled', true);
			
			formulario.find('#lote' + dados.nomeTabela + 'FormGroup').hide();	
			formulario.find('#sacas' + dados.nomeTabela + 'FormGroup').hide();
			formulario.find('#nota' + dados.nomeTabela + 'FormGroup').hide();
			formulario.find('#valor' + dados.nomeTabela + 'FormGroup').hide();
			
		}
		
	}
	
}
