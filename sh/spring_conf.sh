#!/bin/sh
# Script para configurar o Spring no LLS-WS
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/tomcat.lib	|| exit 1

spring_update()
{	
	
	FILE_CONF="$1"
	DIR_COPY="$2"
	
	cp -fv ${DIR_CORE_XML}/${FILE_CONF} ${DIR_COPY}
	
	cat ${DIR_COPY}/${FILE_CONF}
	
}

spring_server()
{	
	
	FILE_CONF="server.xml"
	DIR_TOMCAT_CONF="/usr/share/tomcat/conf"
	
	spring_update ${FILE_CONF} ${DIR_TOMCAT_CONF}
	
}

spring_persistence()
{	
	
	FILE_CONF="persistence.xml"
	
	spring_update ${FILE_CONF} ${DIR_TOMCAT_CLASS}
	
}

spring_web()
{	
	
	FILE_CONF="web.xml"
	
	spring_update ${FILE_CONF} ${DIR_TOMCAT_WEB}
	
}

spring_context()
{	
	
	FILE_CONF="spring-context.xml"
	
	spring_update ${FILE_CONF} ${DIR_TOMCAT_CONF}
	
}

spring_message()
{	
	
	FILE_CONF="ValidationMessages.properties"
	
	spring_update ${FILE_CONF} ${DIR_TOMCAT_CLASS}
	
}

case "$1" in
	server)
		spring_server
		;;
	persistence)
		spring_persistence
		;;
	web)
		spring_web
		;;
	context)
		spring_context
		;;
	message)
		spring_message
		;;
	all)
		spring_server
		spring_persistence
		spring_web
		spring_context
		spring_message
		;;
	*)
		echo "Use: $0 {server|persistence|web|context|message|all}"
		exit 1
		;;
esac
