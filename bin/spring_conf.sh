#!/bin/sh
# Script para configurar o Spring no LLS-WS
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/lls.lib				|| exit 1
. lib/tomcat.lib			|| exit 1

spring_update()
{	
	
	FILE_CONF="$1"
	DIR_COPY="$2"
	
	if [ ! -d ${DIR_COPY} ]; then
	
		sudo mkdir -pv ${DIR_COPY}
		
		sudo chown -Rv tomcat:tomcat ${DIR_COPY}
	
	fi
	
	sudo cp -fv ${FILE_CONF} ${DIR_COPY}
	
	FILE_CONF=${DIR_COPY}/$(basename "${FILE_CONF}")
	
	sudo chown -v tomcat:tomcat ${FILE_CONF}
	
	cat ${FILE_CONF}
	
	ls -al ${FILE_CONF}
	
}

spring_server()
{	
	
	FILE_CONF="server.xml"
	DIR_TOMCAT_CONF="/usr/share/tomcat/conf"
	
	spring_update ${DIR_CORE_XML}/${FILE_CONF} ${DIR_TOMCAT_CONF}
	
}

spring_persistence()
{	
	
	FILE_CONF="persistence.xml"
	
	spring_update ${DIR_CORE_XML}/${FILE_CONF} ${DIR_TOMCAT_CLASS}
	
}

spring_web()
{	
	
	FILE_CONF="web.xml"
	
	spring_update ${DIR_CORE_XML}/${FILE_CONF} ${DIR_TOMCAT_WEB}
	
}

spring_context()
{	
	
	FILE_CONF="spring-context.xml"
	
	spring_update ${DIR_CORE_XML}/${FILE_CONF} ${DIR_TOMCAT_CONF}
	
}

spring_message()
{	
	
	FILE_CONF="ValidationMessages.properties"
	
	spring_update ${DIR_CORE_PROPERTIES}/${FILE_CONF} ${DIR_TOMCAT_RESOURCES}
	
}

spring_log4j()
{	
	
	FILE_CONF="log4j.properties"
	
	spring_update ${DIR_CORE_PROPERTIES}/${FILE_CONF} ${DIR_TOMCAT_CLASS}
	
}

spring_password()
{	
	
	PASSWORD=`sudo git config user.password`
	
	if [ -z "${PASSWORD}" ]; then
	
		echo "Not found a user password!"
		echo "Use: sudo git_conf.sh password {PASSWORD}"
		exit 1
	
	fi
	
	spring_update ${DIR_CORE_PROPERTIES}/${FILE_CONF} ${DIR_TOMCAT_CLASS}
	
	sudo sed -i 's/mypassword/'${PASSWORD}'/g' ${FILE_CONF}
	
	cat ${FILE_CONF}
	
}

spring_app()
{	
	
	FILE_CONF="application.properties"
	
	spring_password
	
}

case "$1" in
	web)
		spring_web
		;;
	app)
		spring_app
		;;
	log4j)
		spring_log4j
		;;
	server)
		spring_server
		;;
	message)
		spring_message
		;;
	context)
		spring_context
		;;
	database)
		spring_database
		;;
	persistence)
		spring_persistence
		;;
	all)
		spring_web
		spring_mail
		spring_log4j
		spring_server
		spring_message
		spring_context
		spring_database
		spring_persistence
		;;
	*)
		echo "Use: $0 {all|web|app|log4j|server|message|context|persistence}"
		exit 1
		;;
esac
