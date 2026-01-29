/* =========================================================
 * setOperadoraImagem.js
 * http://lls.net.br/
 * ========================================================= */

function setOperadoraImagem(telefone) {
	
	var $tdOperadora = td('alinhamento_vertical_meio').attr('id', 'tdOperadora');
	
	if (telefone.tipo == 'CELULAR') {
			
		if (telefone.operadora == 'Selecione' || telefone.operadora == null || telefone.operadora == '') {
			
			$tdOperadora.append(paragrafo());
			
		}
		else {
			
			var $urlImagem = 'imagens/operadoras/' + telefone.operadora.toLowerCase() + '.png';
			
			var $imagemTabela = imagem($urlImagem, '', 22, 22);
			
			var operadora = telefone.operadora.toLowerCase().replace(/\b[a-z]/g, function(letter) {
				return letter.toUpperCase();
			});
			
			$tdOperadora.append(campoImagemHorizontal('id_telefone', operadora, 9, 2, $imagemTabela));
			
		}
		
	}
	else {
	
		$tdOperadora.append(paragrafo());
	
	}
	
	telefone["tdOperadora"] = $tdOperadora;
	
	return telefone;
	
}
