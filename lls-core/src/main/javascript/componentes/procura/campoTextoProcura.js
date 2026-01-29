/* =========================================================
 * campoTextoProcura.js
 * http://lls.net.br/
 * ========================================================= */

function campoTextoProcura(textoLabel, nomeTabela, urlSearch, urlAdd, tamanhoLabel) {
	
	var id = 'nomeProcura';
	
	var $campoHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $input = eval ('campoTextoProcura' + nomeTabela + '()');
	
	var $divGroup = $('<div />').addClass('input-group');
	
	var $spanGroupSearch = span('input-group-addon').attr('id', id + 'BotaoSearch');
	
	var $spanGroupAdd = span('input-group-addon').attr('id', id + 'BotaoAdd');
	
	var $spanIconSearch = span('glyphicon-search glyphicon');
	
	var $spanIconAdd = span('glyphicon-plus glyphicon');
	
	$spanGroupSearch.append($spanIconSearch);
	
	$spanGroupSearch.click(function(){
		
		eval(urlSearch);
		
		$input.focus();
		
    });
	
	$spanGroupAdd.append($spanIconAdd);
	
	$spanGroupAdd.click(function(){
		
		eval(urlAdd);
		
		$input.focus();
		
    });
	
	$divGroup.append($input);
	$divGroup.append($spanGroupSearch);
	$divGroup.append($spanGroupAdd);
	
	var $divInput = divInput(id, '5');
	
	$divInput.append($divGroup);
	
	$campoHorizontal.append($divInput);
	
	return $campoHorizontal;
	
}
