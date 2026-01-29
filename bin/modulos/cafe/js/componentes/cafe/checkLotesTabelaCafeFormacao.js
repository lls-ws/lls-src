/* =========================================================
 * checkLotesTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function checkLotesTabelaCafeFormacao(dados, formulario) {
	
	jQuery.validator.addMethod("checkLotes" + dados.nomeTabela,
		function(value, element) {
		
			var lote = {
				nomeTabela: dados.nomeTabelaCadastro,
				nomeTabelaCadastro: dados.nomeTabela
			}
			
			var rowCount = jQuery($('#tbody' + lote.nomeTabela)).find('tr').length;
			
			var msg = 'É necessário efetuar o despejo de lotes!';
			
			if (rowCount > 0) {
				
				var totalSacasRestante = getTotalRestanteCafeFormacao(lote, formulario, "Sacas", 1);
				
				if (totalSacasRestante.min == 1 && totalSacasRestante.max == 0) return true;
				else msg = "A quantidade das sacas informada e despejadas são diferentes!";
				
			}
			
			mostraDialog(
				msg,
				'texto_cor_vermelho',
				'table',
				tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
			);
			
			return false;
		
		}, ""
	);
	
}
