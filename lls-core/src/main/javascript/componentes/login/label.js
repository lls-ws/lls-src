/* =========================================================
 * label.js
 * http://lls.net.br/
 * ========================================================= */

function label(id, textoLabel, classes) {
	
	var $label = $("<label>").attr('for', id);
	
	$label.attr('id', id + 'Label');
	
	$label.addClass("text-center");
	
	$label.addClass(classes);
	
	$label.text(textoLabel);
	
	return $label;
}
