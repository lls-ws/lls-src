/* =========================================================
 * campoSqlProcuraCore.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraCore(dados, input, id) {
	
	var nomeTabelas = dados.nomeTabela + dados.campoProcura;
	
	var $campoHorizontal = campoHorizontal(id, dados.textoLabel, dados.tamanhoLabel);
	
	var $idNomeTabela = campoOculto('id' + id, 0).attr("disabled", "enabled");
	
	var $idNomeTabela2 = campoOculto('id' + id + '2', 0).attr("disabled", "enabled");
	
	var $divGroup = $('<div />')
		.addClass('input-group')
		.addClass('autocomplete-suggestions')
		.attr('id', nomeTabelas + 'DivGroup');
	
	var $spanGroupSearch = span('input-group-addon')
		.attr('id', 'spanGroupSearch' + nomeTabelas)
		.attr('title', "Limpar");
	
	var $spanIconSearch = span('glyphicon-erase glyphicon');
	
	var $divInput = divInput(id, dados.tamanhoCampo);
	
	var $span = $('<span/>').attr('id', 'nome' + nomeTabelas + 'Mensagem')
							.hide()
							.addClass("limpa")
							.css("font-weight", "Bold")
							.css("font-style", "italic")
							.css("font-size", "15px");
	
	$campoHorizontal.removeClass("has-feedback");
	
	$divGroup.append(input);
	$divGroup.append($idNomeTabela);
	$divGroup.append($idNomeTabela2);
	$divGroup.append($spanGroupSearch);
	
	$divInput.append($divGroup);
	$divInput.append($span);
	
	$campoHorizontal.append($divInput);
	
	$spanGroupSearch.append($spanIconSearch);
	
	$spanGroupSearch.click(function(){
		
		$idNomeTabela.val(0);
		$idNomeTabela2.val(0);
		
		$span.text('').hide().trigger('change');
		
		input.removeAttr('disabled').val("").focus();
		
    });
	
	$span.on('change', function() {
		
		$('.autocomplete-suggestion').empty();
		
	});
	
	input.devbridgeAutocomplete({
		autoFocus: true,
		autoSelectFirst: true,
		minChars: dados.minChars,
		preserveInput: true,
		deferRequestBy: 3,
		lookup: function (query, done) {
			
			var dadosProcura = eval ('pegaDadosCampoSqlProcura' + dados.campoProcura + '(dados, id)');
			
			$.ajax({
				type: "POST",
				url: 'listaProcura' + dados.campoProcura,
				dataType: "json",
				contentType: 'application/json',
				mimeType: 'application/json',
				data: JSON.stringify(dadosProcura),
				success: function(resposta) {
					
					var result = {
						suggestions: eval ('pegaDadosSqlProcura' + dados.campoProcura + '(resposta)')
					};
					
					done(result);
					
				},
				error: function(jqXHR, exception) {
			
					mostraAjaxErro(
						exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
						jqXHR.status
						
					);
					
				}
			})
			
		},
		onSelect: function (suggestion) {
			
			var $suggestion = {
				data: eval ('campoSqlProcura' + dados.campoProcura + '(suggestion, 2)')
			};
			
			$('.autocomplete-suggestion').empty();
			
			$campoHorizontal.find('.help-block').empty();
			
			$campoHorizontal.removeClass('has-error has-feedback');
			
			$idNomeTabela.val(suggestion.data.id);
			
			$idNomeTabela2.val(suggestion.data.id2);
			
			input.val($suggestion.data.valor);
			
			$span.text($suggestion.data.texto).show().trigger('change');
			
			input.attr("disabled", "enabled");
			
		},
		formatResult: function (suggestion, currentValue) {
			
			return eval ('campoSqlProcura' + dados.campoProcura + '(suggestion, 1)');
			
		}
	});
	
	return $campoHorizontal;
	
}
