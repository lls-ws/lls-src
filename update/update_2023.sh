SETEMBRO(2023){

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

(16/09/2023){

// Erro no Botao Visualizar das Listagem de Produtore e Preços
// O erro ocorre na abertura da Janela de Alteração de Senha
// Após a listagem de Produtores ou Preços

() Criar campo de Inscrição Municipal {
	
 () Alterar tela: Visualização de Produtor {
   () Arquivo: 
 }
 () Alterar tela: Alteração de Produtor, aba Fazendas {
   () Arquivo: 
 }
 () Alterar tela: Cadastro e Alteração de Fazenda {
   () Arquivo: 
 }
 () Alterar Salvamento dos dados da Fazenda {
   () Arquivo: 
 }
 () Alterar Seleção dos dados da Fazenda {
   () Arquivo: 
 }
 
 }

() Salvar Alterações no GitHub { 
 () git_upload_lls-src
 }

}

}
