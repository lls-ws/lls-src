/* =========================================================
 * campoSqlProcuraTexto.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraTexto(textoLabel, nomeTabela, nomeTabelaProcura, placeholder,
							  tamanhoCampo, tamanhoLabel, minChars, maxlength) {
	
	var id = 'nomeProcuraCadastro' + nomeTabela + nomeTabelaProcura;
	
	if (maxlength == null) maxlength = 50;
	
	var $input = input(id, "text", "form-control", placeholder, false, maxlength)
					.css("font-weight","Bold")
					.css("font-size","15px");
	
	if (minChars == null) minChars = 3;
	
	return campoSqlProcura(
		textoLabel,
		nomeTabela,
		nomeTabelaProcura,
		tamanhoCampo,
		tamanhoLabel,
		$input,
		id,
		minChars
	);
	
}
