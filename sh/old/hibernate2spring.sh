#!/bin/bash
# Script para criar os arquivos do spring
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="$1"

NOME_PACOTE="$2"

NOME_JAVA="$3"

if [ -z "$NOME_PROJETO" -o -z "$NOME_PACOTE" -o -z "$NOME_JAVA" ]; then

	echo "Use: $(basename $0) [NOME_PROJETO] [NOME_PACOTE] [NOME_JAVA]"
	echo "Exemplo: $(basename $0) cafe cadastro peneira"
	exit 1;

fi

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh					|| exit 1
. lib_dataflex2hibernate.sh		|| exit 1

cria_arquivo_dao()
{
	
	cria_dirs
	
	cria_arquivos
	
	cria_arquivo "Dao"
	
	cria_arquivo "Dao" "Jpa"
	
	cria_arquivo "Controller"
	
	rm -fv $ARQ_JSON $ARQ_PROJECTIONS
	
}

cria_dirs()
{
	
	if [ ! -d $DIR_CONTROLLER ]; then

		mkdir -pv $DIR_CONTROLLER

	fi

	if [ ! -d $DIR_DAO ]; then

		mkdir -pv $DIR_DAO

	fi

	if [ -f $ARQ_JSON ]; then

		rm -fv $ARQ_JSON

	fi

	if [ -f $ARQ_PROJECTIONS ]; then

		rm -fv $ARQ_PROJECTIONS

	fi
	
}

cria_arquivos()
{
	
	while read linha
	do
		
		FIELD=`echo $linha | awk '{print $1}'`
		
		TYPE=`echo $linha | awk '{print $2}'`
		
		SIZE=`echo $linha | awk '{print $3}'`
		
		echo "$FIELD $TYPE $SIZE"
		
		cria_campo
		
	done < "$ARQ_CAMPOS"
		
}

cria_arquivo()
{
	
	NOME_CLASS="$1"
	
	NOME_CLASS_MIN=$(echo "$NOME_CLASS" | tr '[:upper:]' '[:lower:]')
	
	DIR_CADASTRO_DAO="$DIR_JAVA_CADASTRO/$NOME_CLASS_MIN"
	
	DIR_JAVA_DAO="$DIR_JAVA/$NOME_CLASS_MIN"
	
	if [ ! -z "$2" ]; then
		
		ARQUIVO_JAVA="Jpa"$NOME_JAVA
		
		ARQUIVO_CADASTRO="Jpa"$NOME_CADASTRO
		
	else
		
		ARQUIVO_JAVA=$NOME_JAVA
		
		ARQUIVO_CADASTRO=$NOME_CADASTRO
		
	fi
	
	ARQUIVO_JAVA_DAO=$DIR_JAVA_DAO/$ARQUIVO_JAVA$NOME_CLASS".java"
	
	echo "$ARQUIVO_JAVA_DAO"
	
	altera_arquivo_exemplo
	
}

tipo_calendar()
{
	
	echo '		'$NOME_JAVA_MIN'JSON.put("'$NOME_CAMPO'", '$NOME_JAVA_MIN'.get'$NOME_METODO'Text());' >> $ARQ_JSON
	
	echo '				.add(Projections.property("'$NOME_CAMPO'"), "'$NOME_CAMPO'")' >> $ARQ_PROJECTIONS
	
}

tipo_string()
{
	
	echo '		'$NOME_JAVA_MIN'JSON.put("'$NOME_CAMPO'", '$NOME_JAVA_MIN'.get'$NOME_METODO'());' >> $ARQ_JSON
	
	echo '				.add(Projections.property("'$NOME_CAMPO'"), "'$NOME_CAMPO'")' >> $ARQ_PROJECTIONS
	
}

tipo_numero()
{
	
	echo '		'$NOME_JAVA_MIN'JSON.put("'$NOME_CAMPO'", '$NOME_JAVA_MIN'.get'$NOME_METODO'());' >> $ARQ_JSON
	
	echo '				.add(Projections.property("'$NOME_CAMPO'"), "'$NOME_CAMPO'")' >> $ARQ_PROJECTIONS
	
}

altera_arquivo()
{
	
	echo "$DIR_CADASTRO_DAO/$ARQUIVO_CADASTRO$NOME_CLASS.java"
	
	cat $DIR_CADASTRO_DAO/$ARQUIVO_CADASTRO$NOME_CLASS".java" |
	iconv -f utf-8 -t iso-8859-1 |
	sed 's/'$NOME_CADASTRO'/'$NOME_JAVA'/g' |
	sed 's/'$NOME_CADASTRO_MIN'/'$NOME_JAVA_MIN'/g' |
	sed 's/cadastro/'$NOME_PACOTE'/g' > $ARQUIVO_JAVA_DAO
	
	sed -i 's/'$URL_PROJETO'.'$NOME_PACOTE'.componentes.Id/'$URL_PROJETO'.cadastro.componentes.Id/g' $ARQUIVO_JAVA_DAO
	
	sed -i '/'$NOME_JAVA_MIN'JSON.put("valor", '$NOME_JAVA_MIN'.getValor());/d' $ARQUIVO_JAVA_DAO
	sed -i '/'$NOME_JAVA_MIN'JSON.put("nome", '$NOME_JAVA_MIN'.getNome());/d' $ARQUIVO_JAVA_DAO
	sed -i '/'$NOME_JAVA_MIN'JSON.put("id", '$NOME_JAVA_MIN'.getId());/r '$ARQ_JSON $ARQUIVO_JAVA_DAO
	
	sed -i '/.add(Projections.property("valor"), "valor")/d' $ARQUIVO_JAVA_DAO
	sed -i 's/.add(Projections.property("nome"), "nome")//g' $ARQUIVO_JAVA_DAO
	sed -i '/.add(Projections.property("id"), "id")/r '$ARQ_PROJECTIONS $ARQUIVO_JAVA_DAO
	
	sed -i '/.add(Restrictions.ilike("nome", texto, MatchMode.ANYWHERE))/d' $ARQUIVO_JAVA_DAO
	sed -i '/.addOrder(Order.asc("nome"))/d' $ARQUIVO_JAVA_DAO
	sed -i '/criteriaCount.add(Restrictions.ilike("nome", texto, MatchMode.ANYWHERE));/d' $ARQUIVO_JAVA_DAO
	
	sed -i 's/boolean verificaExisteNome = '$NOME_JAVA_MIN'Dao.verificaExiste("nome", '$NOME_JAVA_MIN'.getNome());/boolean verificaExisteNome = false;/g' $ARQUIVO_JAVA_DAO
	
	sed -i '/'$NOME_JAVA' '$NOME_JAVA_MIN'Atual = '$NOME_JAVA_MIN'Dao.buscaPorId('$NOME_JAVA_MIN'.getId());/i \				   '$NOME_JAVA_MIN'Dao.altera('$NOME_JAVA_MIN');\n' $ARQUIVO_JAVA_DAO
	sed -i '/'$NOME_JAVA' '$NOME_JAVA_MIN'Atual = '$NOME_JAVA_MIN'Dao.buscaPorId('$NOME_JAVA_MIN'.getId());/i \				   status = "200";\n' $ARQUIVO_JAVA_DAO
	sed -i '/'$NOME_JAVA' '$NOME_JAVA_MIN'Atual = '$NOME_JAVA_MIN'Dao.buscaPorId('$NOME_JAVA_MIN'.getId());/i \				   mensagem = "Alterado com sucesso!";\n' $ARQUIVO_JAVA_DAO
	
	sed -i '/'$NOME_JAVA' '$NOME_JAVA_MIN'Atual = '$NOME_JAVA_MIN'Dao.buscaPorId('$NOME_JAVA_MIN'.getId());/,+20d' $ARQUIVO_JAVA_DAO
	
	sed -i 's/jsonList.put("'$NOME_PACOTE's", '$NOME_JAVA_MIN'sArray);/jsonList.put("cadastros", '$NOME_JAVA_MIN'sArray);/g' $ARQUIVO_JAVA_DAO
	
	cat $ARQUIVO_JAVA_DAO
	
	du -hsc $ARQUIVO_JAVA_DAO
	
}

altera_arquivo_exemplo()
{
	
	echo "$DIR_JAVA_CADASTRO/$ARQUIVO_CADASTRO$NOME_CLASS.txt"
	
	cp -fv "$DIR_JAVA_CADASTRO/$ARQUIVO_CADASTRO$NOME_CLASS.txt" $ARQUIVO_JAVA_DAO
	
	sed -i 's/pacote/'$NOME_PACOTE'/g' $ARQUIVO_JAVA_DAO
	
	sed -i 's/'$NOME_CADASTRO'/'$NOME_JAVA'/g' $ARQUIVO_JAVA_DAO
	
	sed -i 's/'$NOME_CADASTRO_MIN'/'$NOME_JAVA_MIN'/g' $ARQUIVO_JAVA_DAO
	
	cat $ARQUIVO_JAVA_DAO
	
	du -hsc $ARQUIVO_JAVA_DAO
	
}

cria_arquivo_dao
