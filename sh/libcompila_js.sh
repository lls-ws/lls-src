#!/bin/bash
# Biblioteca para manipular a compilação dos arquivos js
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

criar_arquivos_css_mim()
{
	
	if [ -f ${ARQ_CSS_MIN} ]; then
	
		rm -fv ${ARQ_CSS_MIN}
	
	fi
	
	java -jar $ARQ_JAR ${DIR_LLS}/${NOME_CSS} -o ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN} --charset utf-8 -v
	
	rm -fv ${DIR_LLS}/${NOME_CSS}
	
	du -hsc ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN}
	
}

criar_arquivos_mim()
{
	
	find ${DIR_LLS}/* -maxdepth 0 -iname '*.js' |
	
	while read file
	do
		
		ARQ_JS=$(basename $file)
		
		echo ${ARQ_JS}
		
		java -jar ${ARQ_JAR} ${file} -o ${DIR_TOMCAT_JS}/${ARQ_JS} --charset utf-8 -v
		
		rm -fv ${file}
		
	done
	
	chown -R tomcat.tomcat ${DIR_TOMCAT_JS}
	
	echo "Arquivos criados com sucesso! Tamanho: `du -hsc ${DIR_TOMCAT_JS}/*.js | tail -1 | awk '{print $1}'`"
	
}

criar_arquivos_js()
{
	
	find ${DIR_LLS_TEMP}/* -maxdepth 0 -iname '*.js' |
	
	while read file
	do
		
		cp -fv $file ${DIR_LLS}
		
	done
	
	chown -R lls.lls ${DIR_LLS}
	
	rm -rfv ${DIR_LLS_TEMP}
	
	echo "Arquivos criados com sucesso! Tamanho Total: `du -hsc ${DIR_LLS}/*.js | tail -1 | awk '{print $1}'`"
	
}

criar_arquivos_jquery()
{
	
	echo "Componentes: $NOME_PROJETO"
	
	for ARQ in "${COMPONENTES[@]}"
	do
		
		cria_arq_$ARQ
		
	done
	
	while read linha
	do
		
		echo $linha
		
		bash $DIR_SH/jquery-lls-$linha.sh
		
	done < $ARQ_MODULOS
	
}

copia_arquivos_js_core()
{
	
	echo "Movendo arquivos para: ${DIR_TOMCAT_JS}"
	
	find $DIR_LLS/* -maxdepth 0 -iname '*.js' |
	
	while read file
	do
		
		ARQ_JS=$(basename $file)
		
		echo ${ARQ_JS}
		
		rm -f ${DIR_TOMCAT_JS}/${ARQ_JS}
		
		mv -v ${file} ${DIR_TOMCAT_JS}
		
		chown tomcat.tomcat ${DIR_TOMCAT_JS}/${ARQ_JS}
		
	done
	
	echo "Arquivos movidos com sucesso! Tamanho Total: `du -hsc ${DIR_TOMCAT_JS}/*.js | tail -1 | awk '{print $1}'`"
	
}

limpa_menu()
{
	
	MENU_CORE="$1"
	
	ARQ_MENU_CORE="$DIR_CORE_JS_MENU/$MENU_CORE.js"
	
	echo "Limpando $MENU_CORE"
	
	echo "/* ================ $MENU_CORE.js ===========================" 	> $ARQ_MENU_CORE
	echo " * http://lls.net.br/"											>> $ARQ_MENU_CORE
	echo " * ========================================================= */" 	>> $ARQ_MENU_CORE
	echo ""														 			>> $ARQ_MENU_CORE
	echo "function $MENU_CORE(nomesItensMenu, opcoesMenu) {"				>> $ARQ_MENU_CORE
	echo "	return opcoesMenu;"					 							>> $ARQ_MENU_CORE
	echo "}"														 		>> $ARQ_MENU_CORE
	
}

cria_menu_item()
{
	
	NOME_ARQ="$1"
	
	NOME_MENU=`echo $NOME_PROJETO | awk '{ print toupper(substr($NOME_PROJETO, 1, 1)) substr($NOME_PROJETO, 2) }'`
	
	MENU_PROJETO="$NOME_ARQ$NOME_MENU"
	
	MENU_CORE=$NOME_ARQ"Opcoes"
	
	ARQ_MENU_PROJETO="$DIR_LLS_SRC/menu/$MENU_PROJETO.js"
	
	ARQ_MENU_CORE="$DIR_CORE_JS_MENU/$MENU_CORE.js"
	
	MENU_SIZE=`cat $ARQ_MENU_PROJETO | wc -l`
	
	sed -i '/jquery-lls-menu-'$NOME_PROJETO'/d' $ARQ_MENU_CORE
	sed -i '/opcoesMenu = '$MENU_PROJETO'/d' $ARQ_MENU_CORE
	
	sed -i '/function '$MENU_CORE'/a \	opcoesMenu = '$MENU_PROJETO'(nomesItensMenu, opcoesMenu);' $ARQ_MENU_CORE
	sed -i '/function '$MENU_CORE'/a \	carregaCssJs("js/jquery-lls/jquery-lls-menu-'$NOME_PROJETO'.js", "js");' $ARQ_MENU_CORE
	
	sed -i '/'$MENU_PROJETO'.js/,+'$MENU_SIZE'd' $ARQ_MENU_CORE
	
	echo "" >> $ARQ_MENU_CORE
	
	cat $ARQ_MENU_PROJETO >> $ARQ_MENU_CORE
	
	atualiza_menu_core
	
}

atualiza_menu_core()
{
	
	defini_arq_menu
	
	for ARQUIVO in "${COMPONENTES[@]}"
	do
		
		cat $DIR_CORE_JS_SRC/$ARQUIVO >> $DIR_LLS_TEMP/$ARQ
		
	done
	
}

jquery_update()
{
	echo "Updating..."
	
	if [ ! -d ${DIR_TOMCAT_JS} ]; then

		mkdir -pv ${DIR_TOMCAT_JS}
		
	fi
	
	if [ ! -d ${DIR_TOMCAT_CSS} ]; then

		mkdir -pv ${DIR_TOMCAT_CSS}
		
	fi
	
	echo "Moving files to ${DIR_TOMCAT_JS}"
	mv ${DIR_LLS}/${NOME_CSS} ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN} 2> /dev/null
	mv ${DIR_LLS}/*.js ${DIR_TOMCAT_JS}

	echo "Removing files to ${DIR_LLS_TEMP}"
	rm -rf ${DIR_LLS_TEMP}

	echo "Changing files ownner to tomcat.tomcat..."
	chown -R tomcat.tomcat ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN}
	chown -R tomcat.tomcat ${DIR_TOMCAT_JS}
	
	du -hsc ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN} ${DIR_TOMCAT_JS}/*.js
	
	jsp_update
	
}

jsp_update()
{
	echo "Updating JSP..."
	
	DIR_HOME_JSP="${DIR_HOME}/jsp"
	DIR_TOMCAT_JSP="${DIR_TOMCAT}/WEB-INF/jsp"
	
	echo "Removing JSP directory: ${DIR_TOMCAT_JSP}"
	rm -rf ${DIR_TOMCAT_JSP}
	
	echo "Moving JSP directory: ${DIR_HOME_JSP}"
	cp -rf ${DIR_HOME_JSP} ${DIR_TOMCAT_JSP}

	echo "Changing directory ownner to tomcat.tomcat..."
	chown -R tomcat.tomcat ${DIR_TOMCAT_JSP}
	
	du -hsc ${DIR_TOMCAT_JSP}/*.jsp
	
	echo "JS Files Compiled SucessFull: $(date '+%d/%m/%Y %H:%M:%S')"
	
}

if [ -z "$NOME_PROJETO" ]; then

	echo "Informe o nome do projeto!"
	
	exit 1;
	
fi

DIR_HOME="/home/lls/lls-src"

DIR_PROJETO="${DIR_HOME}/modulos/${NOME_PROJETO}"

if [ ! -d ${DIR_PROJETO} ]; then

	DIR_PROJETO="${DIR_HOME}"
	
fi

DIR_CORE="${DIR_HOME}"

DIR_TOMCAT="/var/lib/tomcat9/webapps/lls"

DIR_TOMCAT_JS="${DIR_TOMCAT}/js/jquery-lls"

DIR_TOMCAT_CSS="${DIR_TOMCAT}/css/jquery-lls"

DIR_JS="$DIR_PROJETO/js"
		
DIR_LLS="$DIR_JS/jquery-lls"

DIR_LLS_TEMP="$DIR_LLS/temp"

DIR_LLS_SRC="$DIR_LLS/src"

DIR_CSS="$DIR_PROJETO/css"

DIR_SH="$DIR_PROJETO/sh"

ARQ_MODULOS="$DIR_SH/jquery-lls-modulos.txt"

NOME_CSS="jquery-lls.css"

NOME_CSS_MIN="jquery-lls.min.css"

ARQ_CSS_MIN="$DIR_CSS/$NOME_CSS_MIN"

ARQ_JAR="${DIR_TOMCAT}/WEB-INF/lib/yuicompressor-2.4.8.jar"

DIR_CORE_JS="$DIR_CORE/js/jquery-lls"

DIR_CORE_JS_SRC="$DIR_CORE_JS/src"

DIR_CORE_JS_MENU="$DIR_CORE_JS_SRC/menu"

if [ ! -d $DIR_LLS_TEMP ]; then
	
	mkdir -v $DIR_LLS_TEMP

fi
