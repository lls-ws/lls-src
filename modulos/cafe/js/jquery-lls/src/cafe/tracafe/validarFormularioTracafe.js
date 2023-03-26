/* =========================================================
 * validarFormularioTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioTracafe(dados, formulario) {
	
	dados.campoProcura = "FazendaProdutor";
	
	validarFormularioDespejoCafe(dados, formulario);
	
	validarIdCore(dados.nomeTabela + "Destino", dados.campoProcura);
	
	jQuery.validator.addMethod('checkIdIgual' + dados.nomeTabela + "Destino" + dados.campoProcura,
		function (value, element) { 		
			
			var id = {
				origem: $('#idnomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura).val(),
				destino: $('#idnomeProcuraCadastro' + dados.nomeTabela + "Destino" + dados.campoProcura).val()
			}
			
			if (id.origem == 0 || id.destino == 0) return true;
			if (id.origem > 0 && id.origem != id.destino) return true;
			
			mostraDialog(
				'Produtor de destino igual ao produtor de origem!',
				'texto_cor_vermelho',
				'table',
				tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
			);
			
			$('#spanGroupSearch' + dados.nomeTabela + "Destino" + dados.campoProcura).click();
			
			return false;
			
		}, ''
	);
	
}
