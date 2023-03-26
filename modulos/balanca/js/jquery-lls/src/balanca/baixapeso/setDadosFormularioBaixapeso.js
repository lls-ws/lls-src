/* =========================================================
 * setDadosFormularioBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioBaixapeso(dados) {
	
	setDadosFormularioCore(dados);
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	eval ('setValoresFormulario' + dados.nomeTabelaCadastro + '(dados, formulario)');
	
	var tipoPeso = $("input[name='tipo" + dados.nomeTabela + "']:checked").val();
	
	tipoPeso = tipoPeso.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	});
	
	var dataAtual = getJson("getData");
	
	var campoDataFinalizado = campoDataHorizontal(
		"dataFinalizado" + dados.nomeTabela, "Data",
		'col-xs-8 col-md-6', 'col-xs-4 col-md-6',
		true, "0", "0", formataData(dataAtual.data),
		'disabled'
	).removeClass("has-feedback");
	
	var divDataFinalizado = $("<div/>")
		.attr('id', 'dataFinalizadoDiv' + dados.nomeTabela)
		.addClass('col-xs-7 col-md-8')
		.append(campoDataFinalizado);
	
	$('#dataDiv' + dados.nomeTabela).hide();
	$('#ticketDiv' + dados.nomeTabela).before(divDataFinalizado);
	
	var campoPeso2 = campoNumeroHorizontal(
		"peso2" + dados.nomeTabela, tipoPeso,
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	);
	
	var campoLiquido = campoNumeroHorizontal(
		"liquido" + dados.nomeTabela, "Líquido",
		'col-xs-9 col-sm-6 col-lg-8', 'col-xs-3 col-sm-6 col-lg-4',
		2, 7, false, false, "", " kg", "disabled"
	);
	
	if (tipoPeso == "Tara") {
		
		$('#peso' + dados.nomeTabela).val(dados.array.bruto);
		$('#peso' + dados.nomeTabela + 'Label').text("Bruto");
		$('#peso' + dados.nomeTabela + 'FormGroup').before(campoPeso2);
		$('#peso' + dados.nomeTabela + 'FormGroup').after(campoLiquido);
		$('#peso2' + dados.nomeTabela).val(dados.array.tara);
		
		var min = formataNumeroSql(dados.array.tara) + 5;
		
		$('#peso' + dados.nomeTabela).rules('remove', "min");
		$('#peso' + dados.nomeTabela)	
			.rules('add', {
				min: min,
				messages: { 
					min: "Valor bruto menor que " +
						formataNumero(min, 2, false, true, "", " kg")
				}
		});
		
	}
	else {
		
		$('#peso' + dados.nomeTabela).val(dados.array.tara);
		$('#peso' + dados.nomeTabela + 'Label').text("Tara");
		$('#peso' + dados.nomeTabela + 'FormGroup').after(campoPeso2);
		$('#peso2' + dados.nomeTabela + 'FormGroup').after(campoLiquido);
		$('#peso2' + dados.nomeTabela).val(dados.array.bruto);
		
		var max = formataNumeroSql(dados.array.bruto) - 5;
		
		$('#peso' + dados.nomeTabela)	
			.rules('add', {
				max: max,
				messages: { 
					max: "Valor da tara maior que " +
						formataNumero(max, 2, false, true, "", " kg")
				}
		});
		
	}
	
	eval ('setEventosCamposCafe' + dados.nomeTabelaCadastro + '(dados, formulario)');
	
	$("#spanGroupSearch" + dados.nomeTabela + "FazendaProdutor")
		.unbind();
	
	$('#tipo' + dados.nomeTabela + 'RadioFormGroup').hide();
	
	$('#peso' + dados.nomeTabela).attr('disabled', 'disabled');
	$('#produto' + dados.nomeTabela + 'FormGroup').hide();
	$('#produto' + dados.nomeTabela).attr('disabled', 'disabled');
	$('#descricao' + dados.nomeTabela).prop('disabled', false);
	
	$('#peso' + dados.nomeTabela)
		.prop('disabled', false)
		.focus();
	
}
