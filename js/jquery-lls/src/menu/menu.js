/* =========================================================
 * menu.js
 * http://lls.net.br/
 * ========================================================= */

function menu(tipo) {
	
	if (tipo == '1') loginInicio();
	
	carregaCssJs("js/mwheelIntent.js", "js");
	carregaCssJs("js/jquery.mousewheel.js", "js");
	carregaCssJs("js/jquery.jscrollpane.min.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-menuCore.js", "js");
	
	$('.scroll-pane').jScrollPane();
	
	$('.container').empty();
	
	$('.container').append(telaMenu());
	
	painel('');
	
	formularioMenu();
	
	//var dados = menuOpcoesCafe(3, 1); // Entcafe
	//var dados = menuOpcoesCafe(3, 2);	// Oscafe
	//var dados = menuOpcoesCafe(3, 3);	// Saicafe
	//var dados = menuOpcoesCafe(3, 4);	// Tracafe
	//var dados = menuOpcoesCafe(3, 5);	// Faturacafe
	//var dados = menuOpcoesCafe(3, 6);	// Servicocafe
	//var dados = menuOpcoesCafe(3, 7);	// Extratocafe
	//var dados = menuOpcoesCafe(3, 8);	// Saldocafe
	
	//var dados = menuOpcoesBalanca(4, 1); // Peso
	
	//dados.click = "click-off";
	//dados.textoLabel = "no-find";
	//novoFormularioCore(dados);
	
	//dados.click = "click";
	//novoCadastroCore(dados);
	
	window.history.replaceState('', '', "/");
	
}
