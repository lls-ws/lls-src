/* =========================================================
 * caixaCombinacaoOperadoras.js
 * http://lls.net.br/
 * ========================================================= */

function caixaCombinacaoOperadoras(id, textoLabel, tamanhoCampo, tamanhoLabel, required, nomesOpcoes) {
	
	var $caixaCombinacao = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $idImagem = id + 'Imagem';
	
	var $select = $('<select />')
		.attr({id: id, name: id, required: required})
		.addClass('form-control');
	
	jQuery.each( nomesOpcoes, function( value, nomeOpcao ) {
	
		var $option = $('<option />').val(value).text(nomeOpcao);
	
		$select.append($option);
	
	});
	
	var $divGroup = $('<div />').addClass('input-group');
	
	var $idSpanGroup = id + 'FormGroup2';
	
	var $spanGroup = span('input-group-addon').attr('id', $idSpanGroup);
		
	var $idImagem = id + 'Imagem';
	
	var $imagem = imagem('', '', 20, 20);
	
	$imagem.attr('id', $idImagem);
	
	$spanGroup.hide();
	
	$spanGroup.append($imagem);
	
	$select.change(function(){
        
        var $urlImagem = 'imagens/operadoras/' + $select.val().toLowerCase() + '.png';
        
        if($select.val() == '') {
            
            $imagem.attr('src', '');
            
            $spanGroup.hide();
            
        }
        else {
            
            $imagem.attr('src', $urlImagem);
            
            $spanGroup.show();
            
        }
    });
	
	$divGroup.append($select);
	$divGroup.append($spanGroup);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	$divInput.append($divGroup);
	
	$caixaCombinacao.append($divInput);
	
	return $caixaCombinacao;
	
}
