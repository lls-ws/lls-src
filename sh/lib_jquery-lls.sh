#!/bin/bash
# Biblioteca para manipular a compilação dos arquivos js
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

file_show()
{
	
	du -hsc ${DIR_TEMP}/${FILE_NAME}.${FILE_EXT}
	
}

file_create()
{
	
	DIR_NAME="$1"
	
	if [ ! -d ${DIR_NAME} ]; then
	
		echo "Directory not found: ${DIR_NAME}"
		exit 1;
	
	fi
	
	if [ `find ${DIR_NAME} -iname *.${FILE_EXT} | wc -l` == 0 ]; then
	
		echo "Files ${FILE_EXT} not found in directory: ${DIR_NAME}"
		exit 1;
	
	fi
	
	echo "${DIR_NAME}"
	
	find ${DIR_NAME} -iname *.${FILE_EXT} |
	
	while read FILE
	do
		
		cat ${FILE} >> ${DIR_TEMP}/${FILE_NAME}.${FILE_EXT}
		
	done
	
}

css_create()
{
	
	FILE_EXT="css"
	
	DIR_NAME="$1"
	
	file_create "${DIR_CORE_CSS}/${DIR_NAME}"
	
	file_show
	
}

js_update()
{
	
	if [ `find ${DIR_TEMP} -iname jquery-lls-*.js | wc -l` == 0 ]; then
	
		echo "File JS not found: ${DIR_TEMP}"
		echo "Run command: bash sh compila_js.sh install"
		exit 1;

	fi
	
	jsp_update
	
	echo "Updating JS..."
	
	echo "Moving files to ${DIR_TOMCAT}"
	cp -v ${DIR_TEMP}/*.css ${DIR_TOMCAT_CSS}
	cp -v ${DIR_TEMP}/*.js ${DIR_TOMCAT_JS}

	echo "Changing directory ownner to tomcat.tomcat..."
	chown -R tomcat.tomcat ${DIR_TOMCAT_CSS} ${DIR_TOMCAT_JS}
	
	du -hsc ${DIR_TOMCAT_CSS}/*.css ${DIR_TOMCAT_JS}/*.js
	
	echo "JS, CSS and JSP files join sucessfull: $(date '+%d/%m/%Y %H:%M:%S')"
	
}

js_clear()
{
	
	rm -rfv ${DIR_TEMP} ${DIR_TOMCAT_JS} ${DIR_TOMCAT_CSS}
	
}

jsp_update()
{
	echo "Updating JSP..."
	
	DIR_CORE_JSP="${DIR_CORE}/jsp"
	
	DIR_TOMCAT_JSP="${DIR_TOMCAT}/WEB-INF/jsp"
	
	echo "Removing JSP directory: ${DIR_TOMCAT_JSP}"
	rm -rf ${DIR_TOMCAT_JSP}
	
	echo "Coping JSP directory: ${DIR_CORE_JSP}"
	cp -rf ${DIR_CORE_JSP} ${DIR_TOMCAT_JSP}

	echo "Changing directory ownner to tomcat.tomcat..."
	chown -R tomcat.tomcat ${DIR_TOMCAT_JSP}
	
	du -hsc ${DIR_TOMCAT_JSP}/*.jsp
	
}

modules_def()
{
	
	MODULE_NAME="$1"
	
	DIR_MODULE="${DIR_CORE}/modulos/${MODULE_NAME}"
	
	if [ ! -d ${DIR_MODULE} ]; then

		echo "Module not found: ${DIR_MODULE}"
		exit 1;
		
	fi
	
	DIR_MODULE_JS="${DIR_MODULE}/js"
	
}

DIR_TEMP="/tmp/jquery-lls"

DIR_CORE="/home/lls/lls-src"

DIR_CORE_CSS="${DIR_CORE}/css"

DIR_CORE_JS="${DIR_CORE}/js"

DIR_CORE_MENU="${DIR_CORE_JS}/componentes/menu"

DIR_TOMCAT="/var/lib/tomcat9/webapps/lls"

DIR_TOMCAT_JS="${DIR_TOMCAT}/js"

DIR_TOMCAT_CSS="${DIR_TOMCAT}/css"
