/* =========================================================
 * li.js
 * http://lls.net.br/
 * ========================================================= */

function li(id, classes) {
	
	var $li = $('<li>').attr('id', id);
	
	$li.addClass(classes);
	
	return $li;
	
}
