SETEMBRO(2023){

###### Semana 1 ######
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

###### Semana 2 ######
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

(19/09/2023){
 
// Não está salvando a senha do usuario
() Corrigir Autocomplete do Formulario de Login {

	() Arquivo: login/formularioLogin.js
	
}

}

}
