/* =========================================================
 * setEventosCamposPeso.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposPeso(dados, formulario) {
	
	formulario.find('#sacas' + dados.nomeTabela).prop('disabled', true);
	
	formulario.find('#lote' + dados.nomeTabela + 'FormGroup').hide();
	formulario.find('#sacas' + dados.nomeTabela + 'FormGroup').hide();
	formulario.find('#nota' + dados.nomeTabela + 'FormGroup').hide();
	formulario.find('#valor' + dados.nomeTabela + 'FormGroup').hide();
	
	formulario.find('#lote' + dados.nomeTabela)
		.css("font-weight", "Bold").css("font-size", "15px");
	
	formulario.find('#ticket' + dados.nomeTabela)
		.css("font-weight", "Bold").css("font-size", "15px");
	
	formulario.find('#tipo' + dados.nomeTabela + 'TaraFormCheck')
		.addClass('col-xs-5 col-xs-offset-3 col-md-6 col-md-offset-2');
	
	formulario.find('#tipo' + dados.nomeTabela + 'BrutoFormCheck')
		.addClass('col-xs-4 col-md-4');
	
	var rule = {};
	
	if (dados.nomeTabela == "Peso") rule = {checkTipoPeso: true};
	else rule = {checkTipoBaixapeso: true};
	
	formulario.find('#tipo' + dados.nomeTabela + 'Radio').rules('add', rule);
	
	if (dados.nomeTabela == "Peso") rule = {checkPlacaPeso: true};
	else rule = {checkPlacaBaixapeso: true};
	
	formulario.find('#placa' + dados.nomeTabela).rules('add', rule);
	
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutorDivInput span')
		.on('change', function() {
		
			setEventosCamposCafePeso(dados, formulario);
			
	});
	
	formulario.find('#nome' + dados.nomeTabela + 'FazendaProdutorMensagem')
		.on('change', function() {
			
			setEventosCamposCafePeso(dados, formulario);
			
	});
	
	formulario.find('input[type=radio][name=tipo' + dados.nomeTabela + ']').change(function() {
		
		$(this).valid();
		
		formulario.find('#tipo' + dados.nomeTabela + 'Radio')
			.prop('checked', true)
			.click();
		
		setEventosCamposCafePeso(dados, formulario);
		
	});
		
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'FazendaProdutor')
		.rules('add', {
			required: true,
			messages: { 
				required: "É necessário informar o produtor!"
			}
		});
	
	var campos = {
		peso: "Peso",
		placa: "Placa",
		sacas: "Sacas",
		produto: "Produto",
		descricao: "Descrição"
	}
	
	jQuery.each( campos, function( i, value ) {
	
		var texto = {
			min: 5,
			vogal: "o ",
			opcao: "selecionar "
		};
	
		var input = formulario.find('#' + i + dados.nomeTabela);
	
		if (i == "produto") {
			
			input.on('change', function() {

				$(this).valid();
				
				formulario.find('#sacas' + dados.nomeTabela).prop('disabled', true);
				
				formulario.find('#lote' + dados.nomeTabela + 'FormGroup').hide();
				formulario.find('#sacas' + dados.nomeTabela + 'FormGroup').hide();
				formulario.find('#nota' + dados.nomeTabela + 'FormGroup').hide();
				formulario.find('#valor' + dados.nomeTabela + 'FormGroup').hide();
				
				var fazendaProdutor_id = formulario.find("#idnomeProcuraCadastro" + dados.nomeTabela + "FazendaProdutor").val();
				
				var tipoPeso = $("input[name='tipo" + dados.nomeTabela + "']:checked").val();
				
				if(!$(this).find(":selected").val()) {
					
					formulario.find('#descricao' + dados.nomeTabela)
						.prop('disabled', true)
						.val('');
					
				}
				else {
					
					if($(this).find(":selected").val() == "OUTROS") {
						
						formulario.find('#descricao' + dados.nomeTabela).val('');
						
					}
					else {
						
						if($(this).find(":selected").val() == "CAFE" && fazendaProdutor_id > 0 && tipoPeso == "BRUTO") {
							
							formulario.find('#sacas' + dados.nomeTabela).prop('disabled', false);
							
							formulario.find('#lote' + dados.nomeTabela + 'FormGroup').show();
							formulario.find('#sacas' + dados.nomeTabela + 'FormGroup').show();
							formulario.find('#nota' + dados.nomeTabela + 'FormGroup').show();
							formulario.find('#valor' + dados.nomeTabela + 'FormGroup').show();
							
						}
						
						formulario.find('#descricao' + dados.nomeTabela)
							.val($(this).find(":selected").text())
							
					}
					
					if(tipoPeso == "TARA") formulario.find('#sacas' + dados.nomeTabela + 'FormGroup').show();
					
					if($(this).find(":selected").val() == "CAFE" && fazendaProdutor_id > 0 && tipoPeso == "BRUTO") {
					
						formulario.find('#sacas' + dados.nomeTabela)
							.focus()
							.valid();
							
					}
					else {
						
						formulario.find('#descricao' + dados.nomeTabela)
							.prop('disabled', false)
							.focus()
							.valid();
								
					}
					
				}
				
			});
			
		}
		else {
	
			input.css("font-weight", "Bold").css("font-size", "15px");
		
			input.bind("propertychange change click keyup input paste", function(event) {
				
				input.valid();
				
				if (i == "peso") {
					
					formulario.find('#' + dados.nomeTabela.toLowerCase() + 'Label')
						.text(input.val());
					
				}
				
			});
			
			if (i == "peso") {
				
				texto.valor = formataNumero(texto.min, 2, false, true, "", " kg")
				
				input.rules('add', {
					number: true,
					min: texto.min,
					messages: { 
						min: "Peso menor que " + texto.valor
					}
				});
				
			}
			else if (i == "sacas") {
				
				input.rules('add', {
					number: true,
					min: 1,
					messages: { 
						min: "Valor das sacas menor que 1!"
					}
				});
				
			}
			else texto.vogal = "a ";
			
			if (i == "descricao") i = value.toLowerCase() + " do produto";
			if (i == "sacas") i = " quantidade de " + value.toLowerCase();
			
			texto.opcao = "informar ";

		}
		
		input.rules('add', {
			required: true,
			messages: { 
				required: "É necessário " + texto.opcao + texto.vogal + i + "!"
			}
		});

	});
	
}
