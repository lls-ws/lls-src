#!/bin/bash
# Script to set directories path for Tomcat
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

tomcat_stop()
{
	
	echo "Stopping tomcat..."
	sudo service tomcat${TOMCAT_VERSION} stop
	
}

tomcat_start()
{
	
	echo "Starting tomcat..."
	sudo service tomcat${TOMCAT_VERSION} start
	
}

TOMCAT_VERSION="9"

DIR_TOMCAT="/var/lib/tomcat9/webapps/lls"

DIR_TOMCAT_BIN="/usr/share/tomcat9/bin"

DIR_TOMCAT_WEB="${DIR_TOMCAT}/WEB-INF"

DIR_TOMCAT_CSS="${DIR_TOMCAT}/css"

DIR_TOMCAT_JS="${DIR_TOMCAT}/js"

DIR_TOMCAT_JSP="${DIR_TOMCAT_WEB}/jsp"

DIR_TOMCAT_LIB="${DIR_TOMCAT_WEB}/lib"

DIR_TOMCAT_CLASS="${DIR_TOMCAT_WEB}/classes"

DIR_TOMCAT_CONF="${DIR_TOMCAT_WEB}/config"

DIR_TOMCAT_RESOURCES="${DIR_TOMCAT_WEB}/resources"

URL_HOST="funchal.lls.net.br"

KEY_RSA="/home/${USER}/.ssh/id_rsa"
