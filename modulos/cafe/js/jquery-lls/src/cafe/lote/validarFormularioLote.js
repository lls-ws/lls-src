/* =========================================================
 * validarFormularioLote.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioLote(dados, formulario) {
	
	validarFormularioCore(dados, formulario);
	
	validarIdCore(dados.nomeTabela, 'Peneira');
	
	jQuery.validator.addMethod('checkDesdobras' + dados.nomeTabela,
		function (value, element) { 		
			
			var desdobras = $('#desdobras' + dados.nomeTabelaCadastro).val();
			
			var totalSacasRecebido = getTotalRecebidoCafeFormacao("Sacas", dados.nomeTabelaCadastro);
				
			var totalPesoRecebido = getTotalRecebidoCafeFormacao("Peso", dados.nomeTabelaCadastro);
			
			var check = {
				msg: "",
				campo: "desdobras"
			}
			
			if (totalSacasRecebido == 0 || totalPesoRecebido == 0 || desdobras == 0) {
				
				if (totalSacasRecebido == 0 ) check.campo = "sacas";
				else if (totalPesoRecebido == 0 ) check.campo = "peso";
				
				check.msg = "É necessário informar a quantidade de " + check.campo;
				
			}
			else {
				
				var rowCount = jQuery($('#tbody' + dados.nomeTabela)).find('tr').length;
	
				var totalDesdobras = $('#' + check.campo + dados.nomeTabelaCadastro).val();
							
				var valorAltera = getValorAlteraCafeFormacao("Sacas", formulario, dados.nomeTabela);
							
				if (rowCount == totalDesdobras && valorAltera == 0) {
					
					check.msg = "Quantidade de " + check.campo + " excedidas!";
					
				}
				else return true;
				
			}
			
			$("#divDialogAltera" + dados.nomeTabela).dialog( "close" );
				
			$('#divDialogAltera' + dados.nomeTabelaCadastro)
				.find('#tab' + dados.nomeTabelaCadastro + '2').removeClass('in active');
				
			$('#divDialogAltera' + dados.nomeTabelaCadastro)
				.find('#linha_tab' + dados.nomeTabelaCadastro + '2').removeClass('active');
				
			$('#divDialogAltera' + dados.nomeTabelaCadastro)
				.find('#tab' + dados.nomeTabelaCadastro + '1').addClass('in active');
				
			$('#divDialogAltera' + dados.nomeTabelaCadastro)
				.find('#linha_tab' + dados.nomeTabelaCadastro + '1').addClass('active');
				
			$('#divDialogAltera' + dados.nomeTabelaCadastro)
				.find('#' + check.campo + dados.nomeTabelaCadastro).focus();
			
			mostraDialog(
				check.msg,
				'texto_cor_vermelho',
				'table',
				tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(4)'))
			);
			
			return false;
			
		}, ''
	);
	
}
