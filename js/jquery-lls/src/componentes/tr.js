/* =========================================================
 * tr.js
 * http://lls.net.br/
 * ========================================================= */

function tr(id, classes) {
	
	var $tr = $('<tr />').attr('id', id);
	
	$tr.addClass(classes);
	
	return $tr;
	
}
