/* =========================================================
 * telaEndereco.js
 * http://lls.net.br/
 * ========================================================= */

function telaEndereco(nomeTabela) {
	
	var $idTela = 'divEndereco' + nomeTabela;
	
	var $divTela = $("<div/>").attr({id: $idTela}).addClass('form-horizontal');
	
	var $nomesCampos = nomeCamposEndereco(nomeTabela);
	
	var $tamanhoCampo = 9;
		
	var $tamanhoLabel = 2;
	
	var $placeholder = '';
	
	var $required = '';
	
	var $textoPlaceholder = 'Digite ';
	
	var $vogaltextoPlaceholder = '';
	
	jQuery.each( $nomesCampos, function(textoLabel, idCampo) {
		
		$required = false;
		
		$vogaltextoPlaceholder = 'o ';
		
		if (idCampo == "estado" + nomeTabela) {
			
			var $campo = caixaCombinacaoHorizontal(
				idCampo, textoLabel,
				'col-xs-9 col-md-7', 'col-xs-2', false, nomesEstados());
			
		}
		else if (idCampo == "cep" + nomeTabela) {
			
			var $campo = campoCepHorizontal(
				idCampo, textoLabel,
				'col-xs-9 col-md-7', 'col-xs-2', false
			);
			
		}
		else {
			
			if (idCampo == "nome" + nomeTabela) {
			
				$required = true;
				
			}
			else {
			
				if (idCampo == "cidade" + nomeTabela) {
					
					$vogaltextoPlaceholder = 'a ';
					
				}
				
			}
			
			$placeholder = $textoPlaceholder + $vogaltextoPlaceholder + textoLabel.toLowerCase();
			
			$placeholder = '';
			
			var $campo = campoTextoHorizontal(idCampo,
											  'text',
											  textoLabel,
											  $tamanhoCampo,
											  $tamanhoLabel,
											  $placeholder,
											  $required,
											  50);
			
		}
				
		$divTela.append($campo);
		
	});
	
	return $divTela;
	
}
