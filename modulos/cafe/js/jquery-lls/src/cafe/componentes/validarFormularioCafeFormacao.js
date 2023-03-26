/* =========================================================
 * validarFormularioCoreFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioCoreFormacao(dados, formulario) {
	
	validarFormularioCore(dados, formulario);
	
	jQuery.validator.addMethod("checkLotes" + dados.nomeTabela,
		function(value, element) {
		
			var lote = {
				nomeTabela: dados.nomeTabelaLancamento[0],
				nomeTabelaCadastro: dados.nomeTabela
			}
			
			var rowCount = jQuery($('#tbody' + lote.nomeTabela)).find('tr').length;
			
			var msg = 'É necessário desdobrar o lote!';
			
			if (rowCount > 0) {
				
				var totalDesdobras = $('#desdobras' + dados.nomeTabela).val();
				
				if (rowCount == totalDesdobras) {
					
					var totalSacasRestante = getTotalRestanteCafeFormacao(lote, formulario, "Sacas", 1);
					
					if (totalSacasRestante.min == 1 && totalSacasRestante.max == 0) {
					
						var totalPesoRestante = getTotalRestanteCafeFormacao(lote, formulario, "Peso", 1);
						
						if (totalPesoRestante.min == 1 && totalPesoRestante.max == 0) return true;
						else msg = "Os valores dos pesos informado e desdobrados são diferentes!"; 
						
					}
					else msg = "Os valores das sacas informada e desdobradas são diferentes!";
						
				}
				else msg = "O número de desdobras informada e a quantidade desdobradas são diferentes!";
				
			}
			
			mostraDialog(
				msg,
				'texto_cor_vermelho',
				'table',
				tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(4)'))
			);
			
			return false;
		
		}, ""
	);
	
}
