#!/bin/bash
# Script para criar um novo projeto
#
# email: lls.homeoffice@gmail.com

cria_dir_js()
{
	echo "Criando diretorio JS"

	DIR_JS_MENU="$DIR_PROJETO/js/jquery-lls/src/menu"
	
	DIR_JS_CORE="$DIR_CORE/js/jquery-lls/src/menu"

	mkdir -p "$DIR_JS_MENU"

	echo "Criando arquivos do menu..."
	cp -f "$DIR_JS_CORE/menuExemplo.txt" "$DIR_JS_MENU/menu$TABELA_PROJETO.js"
	cp -f "$DIR_JS_CORE/menuCadastrosExemplo.txt" "$DIR_JS_MENU/menuCadastros$TABELA_PROJETO.js"
	cp -f "$DIR_JS_CORE/menuRelatorioExemplo.txt" "$DIR_JS_MENU/menuRelatorio$TABELA_PROJETO.js"
	cp -f "$DIR_JS_CORE/telaMenuExemplo.txt" "$DIR_JS_MENU/telaMenu$TABELA_PROJETO.js"
	
	sed -i 's/exemplo/'$NOME_PROJETO'/g' "$DIR_JS_MENU/menu$TABELA_PROJETO.js"
	sed -i 's/Exemplo/'$TABELA_PROJETO'/g' "$DIR_JS_MENU/menu$TABELA_PROJETO.js"
	
	sed -i 's/exemplo/'$NOME_PROJETO'/g' "$DIR_JS_MENU/menuCadastros$TABELA_PROJETO.js"
	sed -i 's/Exemplo/'$TABELA_PROJETO'/g' "$DIR_JS_MENU/menuCadastros$TABELA_PROJETO.js"
	
	sed -i 's/exemplo/'$NOME_PROJETO'/g' "$DIR_JS_MENU/menuRelatorio$TABELA_PROJETO.js"
	sed -i 's/Exemplo/'$TABELA_PROJETO'/g' "$DIR_JS_MENU/menuRelatorio$TABELA_PROJETO.js"
	
	sed -i 's/exemplo/'$NOME_PROJETO'/g' "$DIR_JS_MENU/telaMenu$TABELA_PROJETO.js"
	sed -i 's/Exemplo/'$TABELA_PROJETO'/g' "$DIR_JS_MENU/telaMenu$TABELA_PROJETO.js"
	
	du -hsc $DIR_JS_MENU/*

}

cria_dir_java()
{
	
	echo "Criando diretorio Java src"
	
	DIR_JAVA_SRC="$DIR_PROJETO/src"
	
	DIR_JAVA_URL="$DIR_JAVA_SRC/br/net/lls"
	
	ARQ_XML="$DIR_JAVA_SRC/persistence.xml"
	
	mkdir -p "$DIR_JAVA_URL"
	
	echo "Copiando arquivo XML..."
	cp -f "$DIR_CORE/src/persistence.xml" "$ARQ_XML"
	
	sed -i 's/lls-core/lls-'$NOME_PROJETO'/g' "$ARQ_XML"
	
	sed -i '/<properties>/i \		<!-- entidades mapeadas '$NOME_PROJETO' -->' $ARQ_XML
	
	echo "Criando arquivo Properties..."
	touch "$DIR_JAVA_SRC/ValidationMessages.properties"
	
	du -hsc $DIR_JAVA_SRC/*
	
}

cria_dir_sh()
{
	
	echo "Criando diretorio SH"
	
	DIR_SH="$DIR_PROJETO/sh"
	
	ARQ_COMP="compila_"$NOME_PROJETO"_js.sh"
	
	ARQ_JQUERY="jquery-lls-componentes-$NOME_PROJETO.sh"
	
	mkdir -p "$DIR_SH"
	
	echo "Criando arquivo de Modulos..."
	touch "$DIR_SH/jquery-lls-modulos.txt"
	
	echo "Criando arquivo $ARQ_COMP"
	cp -f "$DIR_CORE/sh/exemplo_compila_js.txt" "$DIR_SH/$ARQ_COMP"
	
	sed -i 's/exemplo/'$NOME_PROJETO'/g' "$DIR_SH/$ARQ_COMP"
		
	sed -i 's/Exemplo/'$TABELA_PROJETO'/g' "$DIR_SH/$ARQ_COMP"
	
	echo "Criando arquivo $ARQ_JQUERY"
	cp -f "$DIR_CORE/sh/jquery-lls-componentes-exemplo.txt" "$DIR_SH/$ARQ_JQUERY"
	
	sed -i 's/exemplo/'$NOME_PROJETO'/g' "$DIR_SH/$ARQ_JQUERY"
		
	sed -i 's/Exemplo/'$TABELA_PROJETO'/g' "$DIR_SH/$ARQ_JQUERY"
	
	du -hsc $DIR_SH/*
	
}

NOME_PROJETO="$1"

if [ -z "$NOME_PROJETO" ]; then

	echo "Digite: $0 [NOME_PROJETO]"
	exit 1;

fi

NOME_PROJETO=$(echo "$NOME_PROJETO" | tr '[:upper:]' '[:lower:]')

TABELA_PROJETO=`echo $NOME_PROJETO | awk '{ print toupper(substr($NOME_PROJETO, 1, 1)) substr($NOME_PROJETO, 2) }'`

DIR_PROJETOS="/home/projetos"

DIR_CORE="$DIR_PROJETOS/lls"

DIR_PROJETO="$DIR_PROJETOS/$NOME_PROJETO"

if [ -d "$DIR_PROJETO" ]; then

	echo "Projeto ja existe!"
	exit 1;

else

	echo "Criando diretorio do projeto: $NOME_PROJETO"
	mkdir "$DIR_PROJETO"
	
	cria_dir_js
	cria_dir_java
	cria_dir_sh

	du -hsc $DIR_PROJETO/*
	
fi
