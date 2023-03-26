/* =========================================================
 * textoBotao.js
 * http://lls.net.br/
 * ========================================================= */

function textoBotao(id) {
	
	if (id == 0) {
		
		return 'Adicionar';
		
	}
	else if (id == 1) {
		
		return 'Alterar';
		
	}
	else if (id == 2) {
	
		return 'Salvar';
	
	}
	else {
		
		return 'Confirmar';
		
	}
	
}
