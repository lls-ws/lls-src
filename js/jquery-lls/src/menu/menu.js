/* =========================================================
 * menu.js
 * http://lls.net.br/
 * ========================================================= */

function menu(tipo) {
	
	if (tipo == '1') loginInicio();
	
	//$.getScript('js/jquery-lls/jquery-lls-componente-formulario.js');
	//$.getScript("js/jquery-lls/jquery-lls-componente-titulo.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-procura.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-botao.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-tabela.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-campos.js");
	//$.getScript('js/jquery-lls/jquery-lls-componente-cadastro.js');
	//$.getScript("js/jquery-lls/jquery-lls-componente-cadastro-tabela.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-cep.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-cpf.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-endereco.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-sqlProcura.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-sqlProcuraPreco.js", "js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-sqlProcuraFazendaProdutor.js", "js");
	
	//$.getScript('js/jquery-lls/jquery-lls-menuCore.js');
	//$.getScript("js/jquery-lls/jquery-lls-componente-formularioCore.js");
	//$.getScript("js/jquery-lls/jquery-lls-componente-cadastroCore.js");
	
	//$.getScript("js/jquery-lls/jquery-lls-usuario.js");
	//$.getScript("js/jquery-lls/jquery-lls-empresa.js");
	//$.getScript("js/jquery-lls/jquery-lls-produtor.js");
	//$.getScript("js/jquery-lls/jquery-lls-preco.js");
	//$.getScript("js/jquery-lls/jquery-lls-fazenda.js");
	//$.getScript("js/jquery-lls/jquery-lls-telefone.js");
	
	$('.scroll-pane').jScrollPane();
	
	$('.container').empty();
	
	$('.container').append(telaMenu());
	
	painel('');
	
	formularioMenu();
	
	window.history.replaceState('', '', "/");
	
}
