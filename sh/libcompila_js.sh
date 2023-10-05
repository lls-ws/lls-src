#!/bin/bash
# Biblioteca para manipular a compilação dos arquivos js
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

css_create()
{
	
	FILE_EXT="css"
	
	DIR_NAME="$1"
	
	file_create "${DIR_CORE}/css/jquery-lls/${DIR_NAME}"
	
	file_show
	
}

file_create()
{
	
	DIR_NAME="$1"
	
	if [ ! -d ${DIR_NAME} ]; then
	
		echo "Directory not found: ${DIR_NAME}"
		exit 1;
	
	fi
	
	if [ `find ${DIR_NAME} -iname *.${FILE_EXT} | wc -l` == 0 ]; then
	
		echo "Files JS not found in directory: ${DIR_NAME}"
		exit 1;
	
	fi
	
	echo "${DIR_NAME}"
	
	find ${DIR_NAME} -iname *.${FILE_EXT} |
	
	while read FILE
	do
		
		cat ${FILE} >> ${DIR_LLS_TEMP}/${FILE_NAME}.${FILE_EXT}
		
	done
	
}

file_show()
{
	
	du -hsc ${DIR_LLS_TEMP}/${FILE_NAME}.${FILE_EXT}
	
}

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
	
	find ${DIR_LLS_TEMP}/* -maxdepth 0 -iname '*.js' -o -iname '*.css' |
	
	while read file
	do
		
		cp -fv ${file} ${DIR_LLS}
		
	done
	
	chown -v lls.lls ${DIR_LLS}/*.js ${DIR_LLS}/*.css
	
	rm -rfv ${DIR_LLS_TEMP}
	
	echo "Arquivos criados com sucesso! Tamanho Total: `du -hsc ${DIR_LLS}/*.js ${DIR_LLS}/*.css | tail -1 | awk '{print $1}'`"
	
}

criar_arquivos_jquery()
{
	
	echo "Componentes: ${NOME_PROJETO}"
	
	for ARQ in "${COMPONENTES[@]}"
	do
		
		echo "Componente: ${ARQ}"
		
		cria_arq_${ARQ}
		
	done
	
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
	
	NOME_MENU=`echo ${NOME_PROJETO} | awk '{ print toupper(substr($/{NOME_PROJETO}/, 1, 1)) substr($/{NOME_PROJETO}/, 2) }'`
	
	MENU_PROJETO="${NOME_ARQ}${NOME_MENU}"
	
	MENU_CORE=${NOME_ARQ}"Opcoes"
	
	ARQ_MENU_PROJETO="${DIR_LLS_SRC}/componentes/menu/${MENU_PROJETO}.js"
	
	ARQ_MENU_CORE="${DIR_CORE_JS_MENU}/${MENU_CORE}.js"
	
	MENU_SIZE=`cat ${ARQ_MENU_PROJETO} | wc -l`
	
	sed -i '/jquery-lls-menu-'${NOME_PROJETO}'/d' ${ARQ_MENU_CORE}
	sed -i '/opcoesMenu = '${MENU_PROJETO}'/d' ${ARQ_MENU_CORE}
	
	sed -i '/function '${MENU_CORE}'/a \	opcoesMenu = '${MENU_PROJETO}'(nomesItensMenu, opcoesMenu);' ${ARQ_MENU_CORE}
	
	sed -i '/'${MENU_PROJETO}'.js/,+'${MENU_SIZE}'d' ${ARQ_MENU_CORE}
	
	echo "" >> ${ARQ_MENU_CORE}
	
	cat ${ARQ_MENU_PROJETO} >> ${ARQ_MENU_CORE}
	
	echo ${ARQ_MENU_PROJETO}
	echo ${ARQ_MENU_CORE}
	
}

jquery_update()
{
	
	rm -rfv ${DIR_LLS_TEMP} ${DIR_CORE_JS}/temp
	
	if [ `find ${DIR_LLS} -iname jquery-lls-*.js | wc -l` == 0 ]; then
	
		echo "File JS not found: ${DIR_LLS}"
		echo "Run command: bash sh compila_js.sh install"
		exit 1;

	fi
	
	jsp_update
	
	echo "Updating JS..."
	
	echo "Moving files to ${DIR_TOMCAT}"
	mv -v ${DIR_LLS}/*.css ${DIR_TOMCAT_CSS}
	mv -v ${DIR_LLS}/*.js ${DIR_TOMCAT_JS}

	echo "Changing directory ownner to tomcat.tomcat..."
	chown -R tomcat.tomcat ${DIR_TOMCAT_CSS}
	chown -R tomcat.tomcat ${DIR_TOMCAT_JS}
	
	du -hsc ${DIR_TOMCAT_CSS}/*.css ${DIR_TOMCAT_JS}/*.js
	
	echo "JS Files Compiled SucessFull: $(date '+%d/%m/%Y %H:%M:%S')"
	
}

jsp_update()
{
	echo "Updating JSP..."
	
	DIR_HOME_JSP="${DIR_HOME}/jsp"
	DIR_TOMCAT_JSP="${DIR_TOMCAT}/WEB-INF/jsp"
	
	echo "Removing JSP directory: ${DIR_TOMCAT_JSP}"
	rm -rf ${DIR_TOMCAT_JSP}
	
	echo "Coping JSP directory: ${DIR_HOME_JSP}"
	cp -rf ${DIR_HOME_JSP} ${DIR_TOMCAT_JSP}

	echo "Changing directory ownner to tomcat.tomcat..."
	chown -R tomcat.tomcat ${DIR_TOMCAT_JSP}
	
	du -hsc ${DIR_TOMCAT_JSP}/*.jsp
	
}

if [ -z "${NOME_PROJETO}" ]; then

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

DIR_TOMCAT_JS="${DIR_TOMCAT}/js"

DIR_TOMCAT_CSS="${DIR_TOMCAT}/css"

DIR_JS="${DIR_PROJETO}/js"
		
DIR_LLS="${DIR_JS}/jquery-lls"

DIR_LLS_TEMP="${DIR_LLS}/temp"

DIR_LLS_SRC="${DIR_LLS}/src"

DIR_CSS="${DIR_PROJETO}/css/jquery-lls"

DIR_SH="${DIR_PROJETO}/sh"

ARQ_MODULOS="${DIR_SH}/jquery-lls-modulos.txt"

NOME_CSS_MIN="jquery-lls.min.css"

ARQ_CSS_MIN="${DIR_CSS}/${NOME_CSS_MIN}"

ARQ_JAR="${DIR_TOMCAT}/WEB-INF/lib/yuicompressor-2.4.8.jar"

DIR_CORE_JS="${DIR_CORE}/js/jquery-lls"

DIR_CORE_JS_SRC="${DIR_CORE_JS}/src"

DIR_CORE_JS_MENU="${DIR_CORE_JS_SRC}/componentes/menu"

if [ ! -d ${DIR_LLS_TEMP} ]; then
	
	mkdir -v ${DIR_LLS_TEMP}

fi
