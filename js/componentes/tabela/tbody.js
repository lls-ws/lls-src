/* =========================================================
 * tbody.js
 * http://lls.net.br/
 * ========================================================= */

function tbody(idTbody, classes) {
	
	var $tbody = $('<tbody />');
	
	$tbody.attr('id', idTbody);
	
	$tbody.addClass(classes);
	
	return $tbody;
	
}
