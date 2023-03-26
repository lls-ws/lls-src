/* =========================================================
 * ul.js
 * http://lls.net.br/
 * ========================================================= */

function ul(classes, role) {
	
	var $ul = $("<ul/>").addClass(classes);
	
	$ul.attr("role", role);
	
	return $ul;
	
}
