/* =========================================================
 * campoDataHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoDataHorizontal(id, textoLabel, tamanhoCampo,
							 tamanhoLabel, required, minDate,
							 maxDate, dataAtual, enabled) {
						      
	var $campoHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $input = input(id, 'text', 'form-control', 'Selecione a data', required, '10');
	
	var $divGroup = $('<div />').addClass('input-group');
	
	var $spanGroup = span('input-group-addon ui-datepicker-trigger');
	
	var $spanIcon = span('glyphicon-calendar glyphicon');
	
	$spanGroup.append($spanIcon);
	
	$input.attr("disabled","disabled")
		.css("font-weight","Bold")
		.css("font-size","15px");
	
	$spanGroup.click(function(){
		
		$input.datepicker("show");
		
    });
	
	if (enabled == "disabled") {
		
		$spanGroup.unbind("click");
		
	}
	
	$input.datepicker({
		modal: true,
		constrainInput: true,
		minDate: minDate,
		maxDate: maxDate,
		changeMonth: false,
		changeYear: false,
		showAnim: "slideDown",
        yearRange: "c-10:c+0",
        numberOfMonths: 1,
		dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        
        beforeShow: function(input, obj) {
			
			$(input).css({
				"position": "relative",
				"z-index": 999999
			});
			
		}
        
	}).datepicker('setDate', dataAtual);
	
	$divGroup.append($input);
	$divGroup.append($spanGroup);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	$divInput.append($divGroup);
	
	$campoHorizontal.append($divInput);
	
	return $campoHorizontal;
	
}
