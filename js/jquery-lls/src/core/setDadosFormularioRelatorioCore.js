/* =========================================================
 * setDadosFormularioRelatorioCore.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioRelatorioCore(dados) {
	
	dados.click = "click-off";
	dados.textoLabel = "Data";
	
	delete dados["array"];
	
	var tipo = $('#tipo' + dados.nomeTabela).val();
	var qtdTipo = $('#tipo' + dados.nomeTabela).find("option").length;
	
	novoFormularioCore(dados);
	
	if (tipo != null) {
		if (tipo < qtdTipo - 1) {
			if (dados.indexStatus != null) $('#tipo' + dados.nomeTabela).val(dados.indexStatus);
		}
		else $('#tipo' + dados.nomeTabela).val(tipo);
	}
	
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
	
	delete dados["data"];
	
	$('.ui-datepicker-current-day').click();
	
}
