/* =========================================================
 * addLinhaTabelaCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function addLinhaTabelaCadastro(cadastro) {
	
	var $nomeTabelaCadastro = $('#nomeTabela' + cadastro.nomeTabela).val();
	
	var $arrayColunaBotoes = pegaColunaBotoesTabela(cadastro.nomeTabela);
	
	var $tbody = $('#div' + cadastro.nomeTabela + ' #table' + cadastro.nomeTabela +
		' #tbody' + cadastro.nomeTabela);
	
	if (cadastro.tipoOperacao == 0) {
		
		var idCadastro = $('#id' + $nomeTabelaCadastro).val();
		
		if (idCadastro > 0 && cadastro.id == 0) {
			
			cadastro["idCadastro"] = idCadastro;
			
			eventoSalvarCadastroTabela(cadastro , $tbody, $arrayColunaBotoes);
			
		}
		else {
			
			eval ('setLinhaTabela' + cadastro.nomeTabela + '(cadastro, $tbody, $arrayColunaBotoes)');
			
		}
		
	}
	else {
		
		var $tr = $tbody.find('#' + cadastro.nomeTabela.toLowerCase() + '_' + cadastro.id);
		
		eval ('mudaLinhaTabela' + cadastro.nomeTabela + '(cadastro, $tr, $arrayColunaBotoes)');
		
	}
	
}
