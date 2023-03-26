/* =========================================================
 * campoSqlProcuraNumero.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraNumero(
		nomeTabela,
		nomeTabelaProcura,
		textoLabel,
		tamanhoCampo,
		tamanhoLabel,
		scale,
		precision,
		allowNegative,
		allowZero,
		prefix,
		suffix,
		enabled) {
	
	var id = 'numeroProcuraCadastro' + nomeTabela + nomeTabelaProcura;
	
	if (scale > 0) {
		
		var $input = campoNumero(id, scale, precision, allowNegative, allowZero, prefix, suffix);
		
	}
	else {
		
		var $input = campoNumeroInteiro(id);
		
	}
	
	if (enabled == "disabled") {
		
		$input.attr("disabled", "enabled");
		
	}
	
	$input.css("font-weight","Bold").css("font-size","15px");
	
	return campoSqlProcura(textoLabel, nomeTabela, nomeTabelaProcura, tamanhoCampo, tamanhoLabel, $input, id, 7);
	
}
