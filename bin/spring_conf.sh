#!/bin/sh
# Script to Configure Spring on LLS Web Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

# Path Library
PATH=.:$(dirname $0):$PATH
. bin/maven/maven_settings.sh	|| exit 1
. bin/maven/maven_log.sh		|| exit 1
. bin/maven/maven_project.sh	|| exit 1

spring_run()
{
	
	maven_project "web"
	
	(cd ${ARTIFACT_ID}; google-chrome http://localhost:8080 && mvn spring-boot:run)
	
}

spring_clean()
{
	
	maven_project "web"
	
	MAVEN_TYPE="clean"
	
	maven_create_clean
	
}

case "$1" in
	run)
		spring_run
		;;
	clean)
		spring_clean
		;;
	
	*)
		echo "Use: $0 {run|clean}"
		exit 1
		;;
esac
