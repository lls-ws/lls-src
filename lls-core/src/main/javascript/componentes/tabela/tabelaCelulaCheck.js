/* =========================================================
 * tabelaCelulaCheck.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaCelulaCheck(texto, checked, id) {
			
	var $td = td('alinhamento_vertical_meio').attr('id', id);

	var $div = $('<div/>').addClass('checkbox');

	var $label = $("<label>").attr('id', id + 'label').addClass('texto_label');

	var $input = $('<input>').attr({
		id: id + 'input',
		type: 'checkbox'
	});
	
	var $texto = $('<b>').attr('id', id + 'texto').append(texto);
	
	if (checked) {
	
		$input.attr('checked', 'checked');
		
		$texto.addClass('text-success');
	
	}
	else {
		
		$texto.addClass('text-danger');
		
	}
	
	$label.append($input);
	
	$label.append($texto);
	
	$div.append($label);
	
	$td.append($div);
	
	return $td;
	
}
