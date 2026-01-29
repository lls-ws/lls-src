/* =========================================================
 * setDadosFormularioServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioServcafe(dados, formulario) {
	
	var servico = eval ('pegaTabela'+ dados.nomeTabela + '(dados)');
	
	servico["tipoOperacao"] = dados.tipoOperacao;
	servico["nomeTabela"] = dados.nomeTabela;
	servico["nomeTabelaCadastro"] =  dados.nomeTabelaCadastro;
	
	eval ("formataDados" + dados.nomeTabela + "(servico)");
	
	servico["array"] = {};
	servico.array["titulo"] = dados.titulo;
	
	jQuery.each( servico, function( i, value ) {
		
		if (i == 'servico') {
			
			formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'Preco')
				.val(value)
				.attr('disabled', 'disabled');
				
		}
		else if (i == 'valorServico') {
			
			formulario.find('#nome' + dados.nomeTabela + 'PrecoMensagem')
				.text(formataNumero(value, 2, true, true, "R$ ", ""))
				.show();
			
		}
		else if (i == 'idServico') {
			
			formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'Preco')
				.val(value);
			
		}
		else if (i == 'sacas') {
			
			var sacas = $('#sacas' + dados.nomeTabelaCadastro).val();
	
			formulario.find('#sacas' + dados.nomeTabela).val(sacas);
			
		}
		else formulario.find('#' + i + dados.nomeTabela).val(value);
		
	});
	
	calculaValorServicoCafe(servico);
	
	formulario.find('#valor' + dados.nomeTabela).focus();
	
}
