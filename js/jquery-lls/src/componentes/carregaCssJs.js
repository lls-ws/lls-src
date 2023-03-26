/* =========================================================
 * carregaCssJs.js
 * http://lls.net.br/
 * ========================================================= */

function carregaCssJs(filename, filetype) {
	
	if (filetype == "css") {
        
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
		
    }
    else if (filetype == "js") {
		
		var len = $('script').filter(function () {
			return ($(this).attr('src') == filename && $(this).attr('src') != null);
		}).length;
		
		if (len === 0) {
			
			var fileref = document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
							
		}
        
    }
    if (typeof fileref != "undefined")
        $("head").append(fileref);
        
}
