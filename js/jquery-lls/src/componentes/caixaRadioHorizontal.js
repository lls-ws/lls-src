/* =========================================================
 * caixaRadioHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function caixaRadioHorizontal(id, nomes) {
	
	var caixaRadio = $("<div/>")
		.attr('id', id + 'RadioFormGroup')
		.addClass('form-group has-feedback');
	
	jQuery.each( nomes, function( i, value ) {
	
		var caixaVerificacao = caixaVerificacaoHorizontal(
			id + value,
			value,
			'radio'
		).removeClass('help-block col-sm-6 col-sm-offset-4 col-md-3 col-md-offset-4 col-xs-6 col-xs-offset-4')
		.addClass('form-check-inline');
	
		caixaVerificacao.find('#' + id + value)
			.attr('name', id)
			.val(i);
		
		caixaRadio.append(caixaVerificacao);
		
	});
	
	var campoRadio = caixaVerificacaoHorizontal(
		id + 'Radio',
		'',
		'radio'
	).removeClass('help-block col-sm-6 col-sm-offset-4 col-md-3 col-md-offset-4 col-xs-6 col-xs-offset-4');
	
	campoRadio.find('#' + id + 'Radio').hide();
	
	caixaRadio.append(campoRadio);
	
	return caixaRadio;
	
}
