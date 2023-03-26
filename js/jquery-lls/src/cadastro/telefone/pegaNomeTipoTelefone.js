/* =========================================================
 * pegaNomeTipoTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeTipoTelefone(tipo) {
	
	var $caixaCombinacaoTipos = caixaCombinacaoHorizontal('pegaTipoTelefone', 'Tipo', 3, 4, false, pegaNomesTiposTelefones());
	
	var tipoTexto = $caixaCombinacaoTipos.find('#pegaTipoTelefone').val(tipo).find('option:selected').text();
	
	if (tipoTexto == "Selecione") {
		
		tipoTexto = "";
		
	}
	
	return tipoTexto;
	
}
