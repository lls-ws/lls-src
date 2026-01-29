/* =========================================================
 * setDadosFormularioRelatorio.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioRelatorio(dados) {
	
	$('#dataInicial' + dados.nomeTabela).datepicker( "option", "maxDate", dados.data );
	$('#dataInicial' + dados.nomeTabela).datepicker("setDate", dados.data);
	
	$('#dataFinal' + dados.nomeTabela).datepicker( "option", "minDate", dados.data );
	$('#dataFinal' + dados.nomeTabela).datepicker("setDate", dados.data);
	
	$('#idnomeProcura' + dados.nomeTabela + 'FazendaProdutor').val(0);
	$('#idnomeProcura' + dados.nomeTabela + 'FazendaProdutor2').val(0);
	
	$('#nomeProcura' + dados.nomeTabela + 'FazendaProdutor').removeAttr('disabled').val("");
	
	$('#spanIconClear' + dados.nomeTabela + 'FazendaProdutor')
		.removeClass('glyphicon-plus').addClass('glyphicon-minus');
	
	$('#nomeProcura' + dados.nomeTabela + 'FazendaProdutorDivInput')
		.find('.limpa').text('').hide();
	
	$("#divDialogAltera" + dados.nomeTabela).find(".limpa").text("").hide();

	$("#divDialogAltera" + dados.nomeTabela).empty().remove().dialog( "close" );

}
