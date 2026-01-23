#!/bin/bash
# Script to set on JSPs the path of LLS Jquery
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/lls.lib				|| exit 1
. lib/mysql.lib				|| exit 1
. lib/jsp.lib				|| exit 1
. lib/jsp_upload.lib		|| exit 1
. lib/tomcat.lib			|| exit 1

jsp_update()
{
	
	echo "Updating JSP..."
	
	echo "Removing JSP directory: ${DIR_TOMCAT_JSP}"
	rm -rf ${DIR_TOMCAT_JSP}
	
	echo "Coping JSP directory: ${DIR_CORE_JSP}"
	cp -rf ${DIR_CORE_JSP} ${DIR_TOMCAT_JSP}

	echo "Changing directory ownner to tomcat.tomcat..."
	chown -R tomcat:tomcat ${DIR_TOMCAT_JSP}
	
	ls -alh ${DIR_TOMCAT_JSP}
	
	du -hsc ${DIR_TOMCAT_JSP}
	
}

jsp_remove()
{
	
	set_type "cdn" "remove"
	
	set_type "local" "remove"
	
}

jsp_local_add()
{
	
	jsp_remove
	
	set_type "local" "add"
	
	jsp_update
	
}

jsp_cdn_add()
{
	
	jsp_remove
	
	set_type "cdn" "add"
	
	jsp_update
	
}

case "$1" in
	local)
		jsp_local_add
		;;
	cdn)
		jsp_cdn_add
		;;
	update)
		jsp_update
		;;
	upload)
		jsp_upload
		;;
	*)
		echo "Use: bash $0 {local|cdn|update|upload}"
		exit 1
		;;
esac
