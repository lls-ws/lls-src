/* =========================================================
 * carregaCssJs.js
 * http://lls.net.br/
 * ========================================================= */

function carregaCssJs(filename, filetype) {
	
	if (filetype == "css") {
        
		carregaCss(filename);
		
    }
    else if (filetype == "js") {
		
		$.getScript(filename);
        
    }
        
}

function carregaCss(file) {
	
	$('<link/>', {
	   rel: 'stylesheet',
	   type: 'text/css',
	   href: file
	}).appendTo('head');
        
}
