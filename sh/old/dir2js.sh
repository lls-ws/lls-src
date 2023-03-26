#!/bin/bash
# Script para criar um novo diretorio js
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="$1"

PROJETO_DESTINO="$2"

MODULO_ENTRADA="$3"

MODULO_SAIDA="$4"

NOME_ENTRADA="$5"

NOME_SAIDA="$6"

if [ -z "$NOME_PROJETO" -o -z "$PROJETO_DESTINO" -o -z "$MODULO_ENTRADA" -o -z "$MODULO_SAIDA" -o -z "$NOME_ENTRADA" -o -z "$NOME_SAIDA" ]; then
	
	echo "Use: $(basename $0) [NOME_PROJETO] [PROJETO_DESTINO] [MODULO_ENTRADA] [MODULO_SAIDA] [NOME_ENTRADA] [NOME_SAIDA]"
	echo "Exemplo: $(basename $0) milho cafe milho cafe entmilho entcafe"
	exit 1;
	
fi

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

DIR_ENTRADA="$DIR_JS_SRC/$MODULO_ENTRADA/$NOME_ENTRADA"

DIR_PROJETO_DESTINO="/home/projetos/$PROJETO_DESTINO"

DIR_MODULO_SAIDA="$DIR_PROJETO_DESTINO/js/jquery-lls/src/$MODULO_SAIDA"

DIR_SAIDA="$DIR_MODULO_SAIDA/$NOME_SAIDA"

TABELA_ENTRADA=`echo $NOME_ENTRADA | awk '{ print toupper(substr($NOME_ENTRADA, 1, 1)) substr($NOME_ENTRADA, 2) }'`

TABELA_SAIDA=`echo $NOME_SAIDA | awk '{ print toupper(substr($NOME_SAIDA, 1, 1)) substr($NOME_SAIDA, 2) }'`

DIR_SH_SAIDA="$DIR_PROJETO_DESTINO/sh"

ARQ_SH_SAIDA="$DIR_SH_SAIDA/jquery-lls-$NOME_SAIDA.sh"

ARQ_MODULO_SAIDA="$DIR_SH_SAIDA/jquery-lls-modulos.txt"

if [ ! -d "$DIR_PROJETO_DESTINO" ]; then

	echo "Projeto de destino nao encontrado!"
	exit 1;

fi

if [ ! -d "$DIR_MODULO_SAIDA" ]; then

	echo "Criando diretorio do modulo de saida..."
	mkdir -pv "$DIR_MODULO_SAIDA"

fi

if [ -d "$DIR_SAIDA" ]; then

	echo "Diretorio de saida ja existe!"
	exit 1;

else
	
	echo "Copiando diretorio de saida..."
	
	cp -rfv $DIR_ENTRADA $DIR_SAIDA
	
	for file in $DIR_SAIDA/*$TABELA_ENTRADA.js
	do
		
		mv -v "$file" "${file/$TABELA_ENTRADA.js/$TABELA_SAIDA.js}"
		
	done
	
	for file in $DIR_SAIDA/*.js;
	do
		
		sed -i 's/'$NOME_ENTRADA'/'$NOME_SAIDA'/g' $file
		
		sed -i 's/'$TABELA_ENTRADA'/'$TABELA_SAIDA'/g' $file
		
	done
	
	if [ -f "$ARQ_SH_SAIDA" ]; then
	
		rm -fv "$ARQ_SH_SAIDA"
	
	fi
	
	echo "Criando arquivos JS"
	
	cp -fv $DIR_SH/jquery-lls-$NOME_ENTRADA.sh $ARQ_SH_SAIDA
	
	sed -i 's/NOME_PROJETO="'$NOME_PROJETO'"/NOME_PROJETO="'$PROJETO_DESTINO'"/g' $ARQ_SH_SAIDA
	
	sed -i 's/MODULO="'$MODULO_ENTRADA'"/MODULO="'$MODULO_SAIDA'"/g' $ARQ_SH_SAIDA
	
	sed -i 's/'$NOME_ENTRADA'/'$NOME_SAIDA'/g' $ARQ_SH_SAIDA
		
	sed -i 's/'$TABELA_ENTRADA'/'$TABELA_SAIDA'/g' $ARQ_SH_SAIDA
	
	echo "Carregando modulo..."
	
	sed -i '/'$NOME_SAIDA'/d' $ARQ_MODULO_SAIDA
	
	echo "$NOME_SAIDA" >> $ARQ_MODULO_SAIDA

	echo "Modulo carregado!"

	cat $ARQ_MODULO_SAIDA

	du -hsc $DIR_SAIDA/* $ARQ_SH_SAIDA $ARQ_MODULO_SAIDA
	
fi
