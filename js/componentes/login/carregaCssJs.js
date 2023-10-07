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
