/* =========================================================
 * pegaDadosTabelaCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosTabelaCadastro(nomeTabela) {
	
	var $tr = $('#div' + nomeTabela + ' #table' + nomeTabela + ' #tbody' + nomeTabela).find('tr');
	
	var $numeroLinhas = $tr.length;
	
	var cadastros = [];
	
	var nomeTabelaCadastro = $('#nomeTabela' + nomeTabela).val();
	
	if ($numeroLinhas == 0) {
		
		var cadastro = eval ('pega' + nomeTabela + '()');
		
		cadastro[nomeTabelaCadastro.toLowerCase()] = null;
		
		cadastros.push(cadastro);
		
	}
	else {
		
		$tr.each(function(){
			
			var $arrayIdsCadastro = $(this).attr('id').split('_');
			
			var cadastro = eval ('pegaTabela' + nomeTabela + '($(this), "' + $arrayIdsCadastro[1] + '")');
			
			cadastro[nomeTabelaCadastro.toLowerCase()] = null;
			
			cadastros.push(cadastro);
			
		});
		
	}
	
	return cadastros;
	
}
