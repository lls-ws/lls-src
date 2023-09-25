/* =========================================================
 * loginInicio.js
 * http://lls.net.br/
 * ========================================================= */

function loginInicio() {
	
	$.getScript("//cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js");
	carregaCss("//cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css");
	carregaCss("//cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap-theme.min.css");
	
	$.getScript("//code.jquery.com/ui/1.13.2/jquery-ui.min.js");
	carregaCss("//code.jquery.com/ui/1.13.2/themes/ui-darkness/jquery-ui.css");
	
	$.getScript("//cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js");
	
	carregaCss("//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/fontawesome.min.css");
	carregaCss("//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/v4-shims.min.css");
	carregaCss("//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/brands.min.css");
	carregaCss("//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/solid.min.css");

	carregaCss("//cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.2/style/jquery.jscrollpane.min.css");

	carregaCss("css/jquery-lls/jquery-lls.min.css");
	
	head();
	
	container();
	
}
