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

(25/09/2023){

() Retirar Metodo de Carregar Script  {
	() Arquivo: componentes/.js
}

() Corrigir ID do Elemento da Tela de Empresa {
	() Arquivo: componentes/campoDataHorizontal.js
}

}

}

}
