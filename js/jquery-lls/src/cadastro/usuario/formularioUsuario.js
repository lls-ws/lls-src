/* =========================================================
 * formularioUsuario.js
 * http://lls.net.br/
 * ========================================================= */

function formularioUsuario(idUsuario, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-botao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-tabela.js", "js");
	
	var $idTela = "div" + nomeTabela;
	
	var $formTela = $("<div/>").attr({id: $idTela}).addClass("form-horizontal");
	
	var $campoSenhaAtual = campoTextoHorizontal(
		'senhaAtual' + nomeTabela, 'password', 'Senha Atual', 9 , 2, 'Digite a senha atual', true, 10
	);
	
	var $campoSenhaNova = campoTextoHorizontal(
		'senhaNova' + nomeTabela, 'password', 'Nova Senha', 9 , 2, 'Digite a nova senha', true, 10
	);
	
	var $campoSenhaConfirma = campoTextoHorizontal(
		'senhaConfirma' + nomeTabela, 'password', 'Confirma Senha', 9 , 2, 'Confirme a nova senha', true, 10
	);
	
	$formTela.append($campoSenhaAtual);
	$formTela.append($campoSenhaNova);
	$formTela.append($campoSenhaConfirma);
	
	var $formulario = formularioCadastro(1, nomeTabela, 2, 4, $formTela);
	
	return $formulario;
	
}
