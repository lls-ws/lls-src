/* =========================================================
 * caixaVerificacaoHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function caixaVerificacaoHorizontal(id, textoLabel, type) {
	
	if (type == null) type = 'checkbox';
	
	var inputCheckBox = input(
		id,
		type,
		'form-check-input col-xs-2 col-md-2 col-lg-2', '', false, ''
	);
	
	var labelCheckBox = label(id, textoLabel, 'form-check-label texto_label texto_grande');
	
	var caixaVerificacao = $("<div/>")
		.attr({id: id + "FormCheck"})
		.addClass('form-check help-block')
		.addClass('col-sm-6 col-sm-offset-4 col-md-3 col-md-offset-4 col-xs-6 col-xs-offset-4')
		.append(inputCheckBox)
		.append(labelCheckBox);
	
	return caixaVerificacao;
	
}
