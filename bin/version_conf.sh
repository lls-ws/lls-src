#!/bin/bash
# Script to Check Server Version on LLS-WS Cloud and Local
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/tomcat.lib	|| exit 1

clear

check_opt()
{

	if [ -n "${APP_OPT}" ]; then

		if [ "${APP_NAME}" = "java" ]; then

			APP_NAME="openjdk-11-jre"
			
		elif [ "${APP_NAME}" = "mariadb" ]; then

			SERVICE_NAME="${APP_NAME}"
			APP_NAME="mariadb-server"
			
		else

			APP_NAME="tomcat9"
			SERVICE_NAME="${APP_NAME}"

		fi

	fi

}

tomcat_version()
{
	
	APP_CMD="${DIR_TOMCAT_BIN}/version.sh"
	
	echo "Showing Cloud ${APP_NAME} version:"
	ssh -i ${KEY_RSA} ${USER}@${URL_HOST} "${APP_CMD}"
	
	echo -e "\nShowing Local ${APP_NAME} version:"
	${APP_CMD}
	
}

cloud_version()
{
	
	if [ "${APP_NAME}" = "tomcat" ]; then
	
		tomcat_version
	
	else
	
		APP_CMD="--version"
		
		echo "Showing Cloud ${APP_NAME} version:"
		ssh -i ${KEY_RSA} ${USER}@${URL_HOST} "${APP_NAME} ${APP_CMD}"
		
		echo -e "\nShowing Local ${APP_NAME} version:"
		${APP_NAME} ${APP_CMD}
		
	fi
	
}

check_update()
{
	
	APP_CMD="apt-cache policy"
	
	echo "Showing ${APP_NAME} ${APP_OPT} version:"
	
	cmd_run
	
}

app_update()
{

	APP_CMD="sudo apt-get -y --only-upgrade install"
	
	echo -e "\nUpgrading ${APP_NAME}:"
	
	cmd_run

}

cmd_run()
{
	
	if [ "${APP_OPT}" = "local" ]; then
	
		sudo service ${SERVICE_NAME} stop
		
		${APP_CMD} ${APP_NAME}
		
	else
	
		if [ "${APP_NAME}" != "tomcat" -o "${APP_NAME}" != "maria" ]; then
		
			ssh -i ${KEY_RSA} ${USER}@${URL_HOST} "${APP_CMD} ${APP_NAME}"
			
		else
		
			ssh -i ${KEY_RSA} ${USER}@${URL_HOST} "sudo service ${SERVICE_NAME} stop; ${APP_CMD} ${APP_NAME}; sudo service ${SERVICE_NAME} start"
		
		fi
	
	fi
	
}

cloud_opt()
{
	
	APP_NAME="$1"
	
	APP_CMD="sudo bash lls_update.sh cloud"
	
	cmd_run
	
}

APP_NAME="$2"
APP_OPT="$3"

check_opt

case "$1" in
    check)
		check_update
		;;
    update)
		app_update
		;;
	cloud)
		cloud_version
		;;
    version)
		cloud_opt "$1"
		;;
	upgrade)
		cloud_opt "$1"
		;;
	remove)
		cloud_opt "$1"
		;;
	*)
		echo "Use: $0 [check|update|cloud|version|upgrade|remove]"
		exit 1;
		;;
esac
