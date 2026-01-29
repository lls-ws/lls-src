/* =========================================================
 * campoDataProcura.js
 * http://lls.net.br/
 * ========================================================= */

function campoDataProcura(textoLabel, nomeTabela, urlSearch, urlAdd, tamanhoLabel) {
	
	var id = 'dataProcura' + nomeTabela;
	var idDataInicial = 'dataInicial' + nomeTabela;
	var idDataFinal = 'dataFinal' + nomeTabela;
	
	var dataAtual =  new Date();
	
	var $campoHorizontal = campoHorizontal('dataInicial' + nomeTabela, textoLabel, tamanhoLabel);
	
	var $divGroup = $('<div />').addClass('input-group');
	
	var $spanGroupAdd = span('input-group-addon')
		.attr('id', id + 'BotaoAdd')
		.attr('title', "Adicionar novo registro");
		
	var $spanIconAdd = span('glyphicon-plus glyphicon');
	
	var $inputDataInicial = input(idDataInicial, 'text', 'form-control', 'Selecione a data', false, '10');
	var $inputDataFinal = input(idDataFinal, 'text', 'form-control', 'Selecione a data', false, '10');
	
	var $spanGroupDateInicial = span('input-group-addon ui-datepicker-trigger')
		.attr('title', "Selecionar a Data Inicial");
	
	var $spanIconDateInicial = span('glyphicon-calendar glyphicon');
	
	var $spanGroupDateFinal = span('input-group-addon ui-datepicker-trigger')
		.attr('title', "Selecionar a Data Final");
	
	var $spanIconDateFinal = span('glyphicon-calendar glyphicon');
	
	$campoHorizontal.removeClass("has-feedback");
	
	$inputDataInicial.attr("disabled","disabled")
		.css("font-weight","Bold")
		.css("font-size","15px");
	
	$inputDataFinal.attr("disabled","disabled")
		.css("font-weight","Bold")
		.css("font-size","15px");
	
	$spanGroupDateInicial.append($spanIconDateInicial);
	$spanGroupDateFinal.append($spanIconDateFinal);
	
	$spanGroupDateInicial.click(function(){
		
		$inputDataInicial.datepicker("show");
		
    });
	
	$spanGroupDateFinal.click(function(){
		
		$inputDataFinal.datepicker("show");
		
    });
	
	$spanGroupDateInicial.append($spanIconDateInicial);
	$spanGroupDateFinal.append($spanIconDateFinal);
	
	$spanGroupDateInicial.click(function(){
		
		$inputDataInicial.datepicker("show");
		
    });
	
	$spanGroupDateFinal.click(function(){
		
		$inputDataFinal.datepicker("show");
		
    });
	
	$spanGroupAdd.append($spanIconAdd);
	
	$spanGroupAdd.click(function(){
		
		eval(urlAdd);
		
    });
	
	$inputDataInicial.datepicker({
		modal: true,
		constrainInput: true,
		changeMonth: false,
        changeYear: false,
        showAnim: "slideDown",
        yearRange: "c-10:c+10",
        numberOfMonths: 1,
		dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        onSelect: function() {
            
            $inputDataFinal.datepicker( "option", "minDate", $inputDataInicial.datepicker("getDate") );
            
            eval(urlSearch);
            
        }
	}).datepicker('setDate', dataAtual);
	
	$inputDataFinal.datepicker({
		modal: true,
		constrainInput: true,
		minDate: dataAtual,
		changeMonth: false,
        changeYear: false,
        showAnim: "slideDown",
        yearRange: "c-10:c+10",
        numberOfMonths: 1,
		dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        onSelect: function() {
            
            $inputDataInicial.datepicker( "option", "maxDate", $inputDataFinal.datepicker("getDate") );
            
            eval(urlSearch);
            
        }
	}).datepicker('setDate', dataAtual);
	
	$divGroup.append($inputDataInicial);
	$divGroup.append($spanGroupDateInicial);
	$divGroup.append($inputDataFinal);
	$divGroup.append($spanGroupDateFinal);
	
	if (urlAdd != "") {
		
		$divGroup.append($spanGroupAdd);
		
	}
	
	if (urlSearch == "") {
		
		$inputDataInicial.css({
			"position": "relative",
			"z-index": 999999
		});
		
		$inputDataFinal.css({
			"position": "relative",
			"z-index": 999999
		});
		
	}
	
	var $divInput = divInput(id, 'col-xs-10 col-md-10');
	
	$divInput.append($divGroup);
	
	$campoHorizontal.append($divInput);
	
	return $campoHorizontal;
	
}
