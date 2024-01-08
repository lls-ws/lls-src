SETEMBRO(2023){

(Semana 1) {
	
(13/09/2023){

(OK) Conferir Compilação do JS {
  (OK) Alterar caminhos do LLS-SRC e TOMCAT {
	  (ok) Arquivo: sh/libcompila_js.sh
  }
  (OK) Limpar LLS-WS {
	  (ok) sudo bash sh/compila_js.sh clear
  }
  (OK) Compilar LLS-SRC {
	  (ok) sudo bash sh/compila_js.sh install core
  }
  (OK) Atualizar LLS-WS {
	  (ok) sudo bash sh/compila_js.sh update core
  }
}

(OK) Corrigir links direcionamentos JS {
  (ok) Arquivo: login/loginInicio.js
  }

}

(14/09/2023){

(OK) Criar Compilação sem Senha para o jQuery {
	
	(OK) Criar Script de Compilação do JS {
		(ok) Arquivo: desktop/scripts/js_compila.sh
	}
	(OK) Adicionar Script nos Utilitários do Desktop {
		(ok) Arquivo: desktop/bin/util_config.sh
	}
	(OK) Adicionar Permissão Sem Senha no Sudo {
		(ok) Arquivo: desktop/etc/sudoers.d/lls_sudoers
	}
	(OK) Adicionar Alias para Execução do Script {
		(ok) Arquivo: desktop/config/bash_aliases
	}
	
}

(OK) Alterar links direcionamentos jQuery {
	
	(OK) Adicionar JSP na Atualização do JS {
		(ok) Arquivo: sh/libcompila_js.sh
	}
	(OK) Alterar links direcionamentos JSP {
		(ok) Arquivo: jsp/login.jsp
		(ok) Arquivo: jsp/menu.jsp
		(ok) Arquivo: jsp/senha.jsp
		(ok) Arquivo: jsp/usuario.jsp
	}
	(OK) Alterar links direcionamentos JS {
		(ok) Arquivo: login/loginInicio.js
		(ok) Arquivo: menu/menu.js
		(ok) Arquivo: componentes/novoCadastro.js
		(ok) Arquivo: componentes/campoCep.js
		(ok) Arquivo: componentes/campoCpfCnpjHorizontal.js
		(ok) Arquivo: componentes/campoTelefone.js
		(ok) Arquivo: componentes/divTabs.js
		(ok) Arquivo: componentes/pegaCpfCnpjMascara.js
		(ok) Arquivo: componentes/pegaCepMascara.js
	}
	
}

}

(15/09/2023){

(OK) Alterar links direcionamentos JS {
	(ok) Arquivo: componentes/novoFormulario.js
	(ok) Arquivo: componentes/tabela.js
	(ok) Arquivo: componentes/formataNumero.js
	(ok) Arquivo: componentes/campoNumero.js
	(ok) Arquivo: componentes/formataNumeroSql.js
}

(OK) Corrigir Icones dos Botoes Font Awesome {

	(OK) Corrigir Botao Tabelas de Produtores e Precos {
		(ok) Arquivo: cadastro/produtor/setDadosTabelaProdutor.js
		(ok) Arquivo: cadastro/preco/setDadosTabelaPreco.js
	}
	(OK) Corrigir Botao Salvar Cadastros {
		(ok) Arquivo: componentes/formularioCadastro.js
	}
	
}

(OK) Colocar Icones Animados no Botao Salvar {

	(ok) Arquivo: cadastro/empresa/eventoSalvarEmpresa.js
	(ok) Arquivo: cadastro/produtor/eventoSalvarProdutor.js
	(ok) Arquivo: cadastro/preco/eventoSalvarPreco.js
	(ok) Arquivo: cadastro/usuario/eventoSalvarUsuario.js
	(ok) Arquivo: componentes/eventoInserirTabela.js
	(ok) Arquivo: componentes/eventoSalvarCadastroTabela.js
	
}

}

}

(Semana 2) {

(18/09/2023){

(OK) Corrigir ID Botao Visualizar das Listagem de Produtores e Preços {

	(ok) Arquivo: cadastro/produtor/setDadosTabelaProdutor.js
	(ok) Arquivo: cadastro/preco/setDadosTabelaPreco.js
	
}

(OK) Criar campo de Inscrição Municipal {
	
	(OK) Alterar tela: Visualização de Produtor {
		(ok) Arquivo: cadastro/fazenda/pegaNomeColunasFazenda.js
		(ok) Arquivo: cadastro/fazenda/formataDadosFazenda.js
	}
 
	(OK) Alterar tela: Cadastro e Alteração de Fazenda {
		(ok) Arquivo: cadastro/fazenda/setDadosFormularioFazenda.js
		(ok) Arquivo: cadastro/fazenda/pegaTabelaFazenda.js
		(ok) Arquivo: cadastro/fazenda/formularioFazenda.js
		(ok) Arquivo: cadastro/fazenda/telaEnderecoFazenda.js
	}
 
	(OK) Alterar Salvamento dos dados da Fazenda {
		(ok) Arquivo: cadastro/fazenda/pegaDadosFormularioFazenda.js
	}
	
}

(OK) Corrigir Quirks Mode e Include nas JSP {

	(ok) Arquivo: jsp/header.jsp
	(ok) Arquivo: jsp/login.jsp
	(ok) Arquivo: jsp/menu.jsp
	(ok) Arquivo: jsp/senha.jsp
	(ok) Arquivo: jsp/usuario.jsp
	
}

}

(22/09/2023){
 
(OK) Corrigir Autocomplete do Formulario de Login {
	(ok) Arquivo: login/formularioLogin.js
}

}

(24/09/2023){
 
(OK) Corrigir links direcionamentos das Imagens no Login {
	(ok) Arquivo: login/formularioLoginCore.js
	(ok) Arquivo: componentes/head.js
	(ok) Arquivo: menu/imagemMenu.js
	(ok) Arquivo: menu/formularioMenu.js
}

(OK) Corrigir Salvamento de Senha do Usuario {
	(ok) Arquivo: login/formularioLogin.js
}

(OK) Atualizar Biblioteca jQuery {
	(ok) Arquivo: jsp/header.jsp
	(ok) Arquivo: login/loginInicio.js
}

(OK) Corrigir Label For da Tela de Cadastro de Empresa {
	(ok) Arquivo: componentes/campoCpfCnpjHorizontal.js
}

(OK) Corrigir Label For da Lista de Produtores {
	(ok) Arquivo: componentes/tabelaCadastro.js
	(ok) Arquivo: componentes/tabelaRelatorio.js
}

(OK) Corrigir Inssues do Ajax  {
	(ok) Arquivo: menu/menu.js
	(ok) Arquivo: componentes/novoFormulario.js
	(ok) Arquivo: componentes/tabelaCadastro.js
	(ok) Arquivo: componentes/formularioCadastro.js
	(ok) Arquivo: componentes/formularioRelatorioNome.js
	(ok) Arquivo: componentes/novoCadastro.js
	(ok) Arquivo: componentes/pegaPlacaMascara.js
	(ok) Arquivo: componentes/setDadosDialogCadastro.js
	(ok) Arquivo: componentes/tabelaRelatorio.js
	(ok) Arquivo: componentes/campoNumeroInteiro.js
	(ok) Arquivo: componentes/campoPlaca.js
	(ok) Arquivo: componentes/campoSqlProcura.js
	(ok) Arquivo: componentes/formataDadosProdutor.js
	(ok) Arquivo: componentes/formularioProdutor.js
	(ok) Arquivo: componentes/setDadosDialogProdutor.js
	(ok) Arquivo: componentes/formataDadosEmpresa.js
	(ok) Arquivo: componentes/formularioEmpresa.js
	(ok) Arquivo: componentes/formataDadosPreco.js
	(ok) Arquivo: componentes/formularioPreco.js
	(ok) Arquivo: componentes/formularioUsuario.js
	(ok) Arquivo: componentes/campoSqlProcuraCore.js
	(ok) Arquivo: componentes/formularioCadastroCore.js
	(ok) Arquivo: componentes/formularioRelatorioNomeCore.js
	(ok) Arquivo: componentes/novoCadastroCore.js
	(ok) Arquivo: componentes/novoFormularioCore.js
	(ok) Arquivo: componentes/setDadosDialogCadastroCore.js
	(ok) Arquivo: componentes/setDadosTabelaLancamentoCore.js
	(ok) Arquivo: componentes/tabelaRelatorioCore.js
}

}

}

(Semana 3) {

(25/09/2023){

(OK) Corrigir Autocomplete da Tela de Usuario e Senha {
	(ok) Arquivo: login/formularioSenha.js
	(ok) Arquivo: login/formularioCadastroLogin.js
}

(OK) Corrigir Carregamento de Scripts no Login  {
	
	(ok) Arquivo: jsp/core/jquery.jsp
	(ok) Arquivo: jsp/login.jsp
	(ok) Arquivo: jsp/header/loginHeader.jsp
	(ok) Arquivo: login/loginInicio.js
	(ok) Arquivo: login/formularioCadastroLogin.js
	(ok) Arquivo: login/eventoFormularioLogin.js
	(ok) Arquivo: componentes/carregaCssJs.js
	
}

(OK) Corrigir Carregamento de Scripts no Menu  {
	
	(ok) Arquivo: jsp/header.jsp
	(ok) Arquivo: jsp/menu.jsp
	(ok) Arquivo: js/menu/menu.js
	
}

}

(26/09/2023){

(OK) Corrigir ID do Elemento da Tela de Empresa {
	(ok) Arquivo: componentes/formularioEmpresa.js
}

(OK) Alterar Senha do Usuario {
	(ok) Arquivo: sh/cria_dados.sh
	(ok) Arquivo: sh/lib_config.sh
	(ok) sudo bash sh/cria_dados.sh usuario
}

(OK) Corrigir Inssues do Ajax {
	(ok) Arquivo: componentes/formularioEmpresa.js
	(ok) Arquivo: componentes/eventoAcharEmpresa.js
	(ok) Arquivo: componentes/setDadosFormularioEmpresa.js
	(ok) Arquivo: sh/jquery-lls-empresa.sh
	
}

}

(27/09/2023){

(OK) Juntar Arquivos JS no Login {
	(ok) Arquivo: jsp/login.jsp
	(ok) Arquivo: jsp/header.jsp
	(ok) Arquivo: js/menu/menu.js
	(ok) Arquivo: js/login/loginInicio.js
	
	(ok) Arquivo: sh/compila_js.sh
	(ok) Arquivo: sh/libcompila_js.sh
	(ok) Arquivo: sh/jquery-lls-componentes.sh
}

}

(28/09/2023){
	
(OK) Criar um diretorio para cada componente do Login {
	(ok) Diretório: js/jquery-lls/login
	(ok) Diretório: js/jquery-lls/menu
	(ok) Diretório: js/jquery-lls/componentes/login
	(ok) Diretório: js/jquery-lls/componentes/telefone
}

}

(29/09/2023){
	
(OK) Criar um diretorio para cada componente do Menu {
	(ok) Diretório: js/jquery-lls/componentes/cep
	(ok) Diretório: js/jquery-lls/componentes/titulo
	(ok) Diretório: js/jquery-lls/componentes/cpf
	(ok) Diretório: js/jquery-lls/componentes/botao
	(ok) Diretório: js/jquery-lls/componentes/endereco
	(ok) Diretório: js/jquery-lls/componentes/tabela
	(ok) Diretório: js/jquery-lls/componentes/procura
	(ok) Diretório: js/jquery-lls/componentes/sqlProcura
	(ok) Diretório: js/jquery-lls/componentes/formulario
	(ok) Diretório: js/jquery-lls/componentes/campos
	(ok) Diretório: js/jquery-lls/componentes/cadastro
	(ok) Diretório: js/jquery-lls/componentes/cadastroTabela
	(ok) Diretório: js/jquery-lls/componentes/placa
}

(OK) Refazer toda a estrutura dos shell scripts separando por tipo {
	(ok) Arquivo: sh/jquery-lls-login.sh
	(ok) Arquivo: sh/jquery-lls-menu.sh
}

(OK) Excluir Arquivos {
	(ok) Arquivo: sh/jquery-lls-usuario.sh
	(ok) Arquivo: sh/jquery-lls-empresa.sh
	(ok) Arquivo: sh/jquery-lls-modulos.txt
	(ok) Arquivo: sh/jquery-lls-preco.sh
	(ok) Arquivo: sh/jquery-lls-componentes.sh
	(ok) Arquivo: sh/jquery-lls-produtor.sh
	(ok) Arquivo: js/componentes/telefone/pegaNomeTipoTelefone.js
	(ok) Arquivo: js/componentes/telefone/pegaDadosFormularioTabelaTelefone.js
}
	
(OK) Verificar o carregamento dos JS no servidor do Github {
	(ok) https://lls-ws.github.io/jquery-lls/jquery-lls.js
	(ok) https://lls-ws.github.io/jquery-lls/jquery-lls.css
	(ok) https://lls-ws.github.io/jquery-lls/jquery-menu.js
	(ok) https://lls-ws.github.io/jquery-lls/jquery-menu.css
	(ok) Arquivo: jsp/header.jsp
	(ok) Arquivo: jsp/menu.jsp
	(ok) Arquivo: js/menu/menu.js
	(ok) Arquivo: js/login/eventoFormularioLogin.js
}
	
(OK) Corrigir Inssues do Ajax  {
	(ok) Arquivo: login/formularioCadastroSenha.js
	(ok) Arquivo: login/eventoFormularioCadastroSenha.js
	(ok) Arquivo: login/setDadosTabelaLancamentoCore.js
}

}

}

}

OUTUBRO(2023){

(Semana 1) {

(04/10/2023){

(OK) Criar Arquivos Separados JS do Menu {
	
	(ok) Arquivo: js/menu/marcarMenu.js
	(ok) Arquivo: js/menu/pegaPosicaoItemMenu.js
	(ok) Arquivo: js/menu/getTotalItensMenu.js
	
}

}

(05/10/2023){

(OK) Criar Script para JS do Menu Dinâmico {
	
	(ok) Arquivo: sh/jquery-lls-menu.sh
	(ok) Arquivo: sh/compila_js.sh
	(ok) Arquivo: sh/libcompila_js.sh
	(ok) Arquivo: modulos/milho/sh/compila_milho_js.sh
	
	(ok) sudo bash sh/compila_js.sh install milho
	(ok) sudo bash sh/compila_js.sh update milho
	
}

}

}

(Semana 2) {

(10/10/2023){

(OK) Refazer Scripts com Novo Modelo de Modulos {
	
	(ok) Arquivo: sh/jquery-lls.sh
	(ok) Arquivo: sh/lib_jquery-lls.sh
	(ok) Arquivo: sh/jquery-lls-login.sh
	(ok) Arquivo: sh/jquery-lls-menu.sh
	
}

}

(11/10/2023){
	
(OK) Corrigir Script Git-Hub Desktop {

	(ok) /home/lls/.bash_aliases
	(ok) desktop/bin/util_config.sh
	(ok) desktop/scripts/jquery-lls.sh
	(ok) desktop/etc/sudoers.d/lls_sudoers
	
}

}

}

}
