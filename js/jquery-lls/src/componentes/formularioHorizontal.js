/* =========================================================
 * formularioHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function formularioHorizontal(id, classe) {
	
	var $idFormulario = id + 'Form';
	
	var $formulario = $("<form/>").attr('id', $idFormulario);
	
	$formulario.addClass(classe);
	$formulario.addClass('form');
	
	$formulario.attr('role', 'form');
	$formulario.attr('accept-charset', 'ISO-8859-1');
	
	return $formulario;
	
}
