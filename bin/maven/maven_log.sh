#!/bin/bash
# Script to Log Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_log_show()
{
	
	tail -F ${LOG_FILE} 2< /dev/null &
	
}

maven_log_edit()
{
	
	if [ ! -f ${LOG_FILE} ]; then
	
		exit 1;
	
	fi
	
	maven_log_error
	
}

maven_log_error()
{
	
	maven_log_package_error
	
	if [ -s ${LOG_PACKAGE_ERROR_FILE} ]; then
		
		echo "Openning Maven Package Error Log..."
		geany ${LOG_PACKAGE_ERROR_FILE} &
		
	else
	
		cat ${LOG_FILE} | grep "ERROR" > ${LOG_ERROR_FILE}
		
		if [ -s ${LOG_ERROR_FILE} ]; then
		
			echo "Openning Maven Error Log..."
			${TXT_EDIT} ${LOG_ERROR_FILE} &
	
		fi
		
	fi
	
	killall tail 2< /dev/null
	
}

maven_log_package_error()
{
	
	cat ${LOG_FILE} | grep "ERROR" | grep "does not exist" | rev | cut -d ']' -f 1 | rev | sed 's/package//' | sed 's/does not exist//' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'  | sort | uniq  > ${LOG_PACKAGE_ERROR_FILE}
	
}

maven_log_remove()
{
	
	rm -f ${LOG_FILE} ${LOG_ERROR_FILE} ${LOG_PACKAGE_ERROR_FILE} 2< /dev/null
	
}
