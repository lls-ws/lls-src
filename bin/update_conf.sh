#!/bin/bash
# Script to update LLS-WS Cloud
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/tomcat.lib	|| exit 1

clear

update_2024()
{

	service tomcat9 stop

	echo "Copy htmlcompressor.jar"

	FILE_JAR="htmlcompressor-1.5.3.jar"

	FILE_URL="https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/htmlcompressor/${FILE_JAR}"

	sudo wget -P ${DIR_TOMCAT_LIB} ${FILE_URL}

	ls -al ${DIR_TOMCAT_LIB}/${FILE_JAR}

	sudo bash bin/jquery_conf.sh clear

	sudo bash bin/jquery_conf.sh jsp

	ls -al ${DIR_TOMCAT}

	service tomcat9 start

}

update_2025()
{
	
	FILE_CLOUD="${DIR_TOMCAT_LIB}/lib_cloud.txt"
	FILE_LOCAL="${DIR_TOMCAT_LIB}/lib_local.txt"
	
	FILE_DIFF="${DIR_TOMCAT_LIB}/lib_diff.txt"
	
	du -hsc ${FILE_CLOUD} ${FILE_LOCAL}
	
	if cmp -s ${FILE_CLOUD} ${FILE_LOCAL}; then
		
		echo "Files are identical!"
		
	else
		
		echo "Files are different!"
		
		echo "Checking diferrences, have in 2 and not in 1"
		join -v 1 <(sort ${FILE_LOCAL}) <(sort ${FILE_CLOUD}) > ${FILE_DIFF}
		
		echo "Showing differences:"
		cat ${FILE_DIFF}
		
		while IFS= read -r LINE; do
			
			echo "Removing: ${LINE}"
			sudo rm -fv ${DIR_TOMCAT_LIB}/${LINE}
			
		done < ${FILE_DIFF}
		
		echo "Upload ${FILE_LOCAL}"
		ls ${DIR_TOMCAT_LIB} > ${FILE_LOCAL}
		
		echo -e "\nChecking diferrences, have in 1 and not in 2"
		join -v 1 <(sort ${FILE_CLOUD}) <(sort ${FILE_LOCAL}) > ${FILE_DIFF}
		
		echo "Showing differences:"
		cat ${FILE_DIFF}
		
	fi
	
}

case $1 in
    2024)
		update_2024
		;;
    2025)
		update_2025
		;;
    *)
		echo "Use: $0 [2024|2025]"
		exit 1;
		;;
esac
