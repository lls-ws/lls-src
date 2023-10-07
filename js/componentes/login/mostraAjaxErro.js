/* =========================================================
 * mostraAjaxErro.js
 * http://lls.net.br/
 * ========================================================= */

function mostraAjaxErro(textoMensagem, status) {
	
	if (status == "200") {
			
		login(0);
		
		
	}
	else if (status == "0") {
		
		mostraDialog(
			'Estabelecendo conexão...',
			'texto_cor_branco',
			'form',
			'Conexão'
		);
		
	}
	else {
		
		mostraDialog(
			textoMensagem,
			'texto_cor_branco',
			'form',
			'Apache-Tomcat'
		);
		
	}
	
}
