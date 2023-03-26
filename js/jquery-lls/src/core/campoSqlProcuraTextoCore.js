/* =========================================================
 * campoSqlProcuraTextoCore.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraTextoCore(dados) {
	
	var id = 'nomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura;
	
	if (dados.maxlength == null) dados.maxlength = 50;
	
	var inputProcura = input(
		id, "text",
		"form-control",
		dados.placeholder,
		false,
		dados.maxlength
	).css("font-weight","Bold").css("font-size","15px");
	
	if (dados.minChars == null) dados.minChars = 3;
	
	return campoSqlProcuraCore(dados, inputProcura, id);
	
}
