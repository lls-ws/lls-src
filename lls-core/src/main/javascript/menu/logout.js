/* =========================================================
 * logout.js
 * http://lls.net.br/
 * ========================================================= */

function logout() {
	
	$.ajax({
		type: "POST",
		url: "logout",
		success: function(resposta) {
			
			login('0');
			
		},
		error: function(resposta) {
			
			alert(resposta);
			
		}
	  
	})
	
}
