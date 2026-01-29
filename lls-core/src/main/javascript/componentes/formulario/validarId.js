/* =========================================================
 * validarId.js
 * http://lls.net.br/
 * ========================================================= */

function validarId(nomeTabela) {
	
	jQuery.validator.addMethod('checkIdMilho',
		function (value, element) { 		
			
			var id = $('#idnomeProcuraCadastro' + nomeTabela + 'Milho').val();
			
			if (id > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'É necessário selecionar o produtor!'
	);
	
	jQuery.validator.addMethod('checkIdFazendaProdutor',
		function (value, element) { 		
			
			var id = $('#idnomeProcuraCadastro' + nomeTabela + 'FazendaProdutor').val();
			
			if (id > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'É necessário selecionar o produtor!'
	);
	
	jQuery.validator.addMethod('checkIdUmidade',
		function (value, element) { 		
			
			var id = $('#idnumeroProcuraCadastro' + nomeTabela + 'Umidade').val();
			
			if (id > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'É necessário selecionar a umidade!'
	);
	
	jQuery.validator.addMethod('checkIdPreco',
		function (value, element) { 		
			
			var id = $('#idnumeroProcuraCadastro' + nomeTabela + 'Preco').val();
			
			if (id > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'É necessário selecionar o serviço!'
	);
	
}
