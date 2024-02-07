/* =========================================================
 * setTipoRelatorioCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setTipoRelatorioCafe(dados) {
	
	var tipo = $('#tipo' + dados.nomeTabelaCadastro).val();
	var qtdTipo = $('#tipo' + dados.nomeTabelaCadastro).find("option").length;
	
	if (tipo != null) {
	
		if (tipo <= qtdTipo - 2 ) {
			if (dados.indexStatus != null) $('#tipo' + dados.nomeTabelaCadastro).val(dados.indexStatus);
			else $('#tipo' + dados.nomeTabelaCadastro).val(0);
		}

	}
		
}
