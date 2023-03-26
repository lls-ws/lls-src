#!/bin/bash
# Biblioteca para definir arquivos e diretórios
#
# email: lls.homeoffice@gmail.com

defini_nomes()
{
	
	URL_PROJETO="br.net.lls"
	
	NOME_JAVA=`echo $NOME_JAVA | awk '{ print toupper(substr($NOME_CADASTRO, 1, 1)) substr($NOME_CADASTRO, 2) }'`
	
	NOME_JAVA_MIN=$(echo "$NOME_JAVA" | tr '[:upper:]' '[:lower:]')
	
	TITULO_PACOTE="Cadastro de $NOME_JAVA"
	
	NOME_DEF=`echo $NOME_DEF | cut -f1 -d '.'`
	
	if [ "$NOME_PACOTE" = "cadastro" ]; then
	
		NOME_CADASTRO="Preco"
	
	else
	
		NOME_CADASTRO="Exemplo"
	
	fi
	
	NOME_CADASTRO_MIN=$(echo "$NOME_CADASTRO" | tr '[:upper:]' '[:lower:]')
	
}

defini_dirs()
{
	
	if [ -z "$NOME_PROJETO" ]; then

		echo "Informe o nome do projeto!"
		
		exit 1;
		
	fi

	if [ `hostname -a | awk '{print $1}'` = "dell" ]; then

		DIR_PROJETO="/home/$NOME_PROJETO/Projetos/lls-src"
		
	else
	
		DIR_PROJETO="/home/$NOME_PROJETO"
	
	fi
	
	DIR_CORE="/home/lls"

	DIR_DATAFLEX="/home/lls/dataflex"

	if [ ! -d $DIR_PROJETO ]; then

		DIR_PROJETO="/home/lls"

		DIR_DATAFLEX="/home/lls"

	fi
	
	DIR_LOG="$DIR_PROJETO/log"
	
	if [ ! -d $DIR_LOG ]; then
		
		mkdir -v $DIR_LOG
		
	fi
	
	DIR_SQL="$DIR_PROJETO/sql"
	
	if [ ! -d $DIR_SQL ]; then
		
		mkdir -v $DIR_SQL
		
	fi
	
	DIR_SH="$DIR_PROJETO/sh"
	
	DIR_SH_CORE="$DIR_CORE/sh"
	
	DIR_JAVA="$DIR_PROJETO/src/br/net/lls/$NOME_PACOTE"
	
	if [ "$NOME_PACOTE" = "cadastro" ]; then
	
		DIR_JAVA_CADASTRO="$DIR_CORE/src/br/net/lls/cadastro"
	
	else
	
		DIR_JAVA_CADASTRO="$DIR_CORE/src/br/net/lls/componentes"
	
	fi
	
	DIR_CONTROLLER="$DIR_JAVA/controller"
		
	DIR_DAO="$DIR_JAVA/dao"
	
	DIR_JS="$DIR_PROJETO/js/jquery-lls"
	
	DIR_JS_CORE="$DIR_CORE/js/jquery-lls"
	
	DIR_JS_SRC="$DIR_JS/src"
	
	DIR_JS_CADASTRO="$DIR_JS_CORE/src/$NOME_PACOTE/$NOME_CADASTRO_MIN"
	
	DIR_JS_PACOTE="$DIR_JS_SRC/$NOME_PACOTE/$NOME_JAVA_MIN"
	
}

defini_arqs()
{

	ARQ_VALIDATION="$DIR_PROJETO/src/ValidationMessages.properties"
	
	ARQ_XML="$DIR_PROJETO/src/persistence.xml"

	ARQ_DEF="$DIR_DATAFLEX/$NOME_DEF.def"

	ARQ_SH="$DIR_SH/jquery-lls-$NOME_JAVA_MIN.sh"
	
	ARQ_CAMPOS="$DIR_SH/$NOME_JAVA_MIN-campos.txt"

	ARQ_MODULOS="$DIR_SH/jquery-lls-modulos.txt"

	ARQ_JAVA="$DIR_JAVA/$NOME_JAVA.java"

	ARQ_IMPORT="$ARQ_JAVA.import"
		
	ARQ_METODOS="$ARQ_JAVA.metodos"
		
	ARQ_JSON="$ARQ_JAVA.json"
		
	ARQ_PROJECTIONS="$ARQ_JAVA.projections"
	
	ARQ_COLUNAS="$DIR_JS_PACOTE/$NOME_JAVA_MIN.colunas"
	
	ARQ_FORMATA="$DIR_JS_PACOTE/$NOME_JAVA_MIN.formata"
	
	ARQ_TABELA_ADD="$DIR_JS_PACOTE/$NOME_JAVA_MIN.tabela.add"
	
	ARQ_TABELA_ALTERA="$DIR_JS_PACOTE/$NOME_JAVA_MIN.tabela.altera"
	
	ARQ_LIMPA="$DIR_JS_PACOTE/$NOME_JAVA_MIN.limpa"
	
	ARQ_FORMULARIO="$DIR_JS_PACOTE/$NOME_JAVA_MIN.formulario"
	
	ARQ_DIALOG="$DIR_JS_PACOTE/$NOME_JAVA_MIN.dialog"
	
	ARQ_FORMULARIO_DADOS="$DIR_JS_PACOTE/$NOME_JAVA_MIN.formulario.dados"
	
	ARQ_FORMULARIO_CAMPOS="$DIR_JS_PACOTE/$NOME_JAVA_MIN.formulario.campos"
	
	ARQ_FORMULARIO_CAMPOS_ADD="$DIR_JS_PACOTE/$NOME_JAVA_MIN.formulario.campos.add"
	
}

comando_sql()
{
	
	USER="root"
	
	BD="bd_lls"
	
	PASSWORD=`cat ${DIR_PROJETO}/xml/spring-context.xml | grep 'password' | head -1 | cut -f4 -d '"'`
	
	# Definindo o comando
	CMD="mysql -u ${USER} --password=${PASSWORD} "
	
	# Definindo a base de dados
	BASE_OPT=$(echo "-D ${BD}")

	# Definindo o comando com a base de dados
	CMD_BASE=$(echo "${CMD} ${BASE_OPT}")

}

limpa_tabela()
{
	
	echo "Limpando a tabela: ${TABELA}"
	
	${CMD_BASE} -e "SET FOREIGN_KEY_CHECKS=0; truncate ${TABELA}; SET FOREIGN_KEY_CHECKS=1;"
	
	echo "Inserindo dados na tabela: ${TABELA}"
	
}

defini_nomes
defini_dirs
defini_arqs

comando_sql
