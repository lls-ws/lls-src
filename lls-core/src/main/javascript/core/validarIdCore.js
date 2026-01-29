/* =========================================================
 * validarIdCore.js
 * http://lls.net.br/
 * ========================================================= */

function validarIdCore(nomeTabela, campo) {
	
	var msg = campo.toLowerCase();
	
	if (msg == "fazendaprodutor") msg = "produtor";
	
	var lastChar = msg.substr(msg.length - 1);
	
	if (lastChar != 'a') lastChar = "o ";
	
	msg = lastChar + ' ' + msg + '!';
	
	jQuery.validator.addMethod('checkId' + nomeTabela + campo,
		function (value, element) { 		
			
			var id = $('#idnomeProcuraCadastro' + nomeTabela + campo).val();
			
			if (id > 0) return true;
			else return false;
			
		}, 'É necessário selecionar ' + msg
	);
	
}
