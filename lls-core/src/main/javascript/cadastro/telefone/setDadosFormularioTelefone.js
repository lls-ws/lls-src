/* =========================================================
 * setDadosFormularioTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioTelefone(idTelefone, nomeTabela, tr, formulario) {
	
	var telefone = pegaTabelaTelefone(tr, idTelefone);
	
	formataDadosTelefone(telefone);
	
	formulario.find('#id' + nomeTabela).val(telefone.id);
	formulario.find('#numero' + nomeTabela).val(telefone.numero);
	formulario.find('#responsavel' + nomeTabela).val(telefone.responsavel);
	formulario.find('#tipo' + nomeTabela).val(pegaValorCaixaCombinacao(telefone.tipo));
	
	if (telefone.tipo == 'CELULAR') {
		
		formulario.find('#operadora' + nomeTabela + 'FormGroup').show();
		
		formulario.find('#operadora' + nomeTabela).val(pegaValorCaixaCombinacao(telefone.operadora));
		
		if (telefone.operadora == null) {
		
			formulario.find('#operadora' + nomeTabela + 'FormGroup2').hide();
			formulario.find('#operadora' + nomeTabela + 'Imagem').attr('src', '');
			
		}
		else {
			
			var imagem = tr.find("#tdOperadora").find('img').attr('src');
			
			formulario.find('#operadora' + nomeTabela + 'FormGroup2').show();
			formulario.find('#operadora' + nomeTabela + 'Imagem').attr('src', imagem);
			
		}
		
	}
	
	formulario.find('#numero' + nomeTabela).focus();
	
}
