#!/bin/bash
# Script to Set SQL Command
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

clear

if [ "$EUID" -ne 0 ]; then
	
	echo "Run script with sudo command!"
	echo "Use: sudo `basename $0`"
	exit 1
  
fi

USER=`git config user.name`

if [ -z "${USER}" ]; then
		
	echo "Not found a user name!"
	echo "Use: git_conf.sh name {NAME}"
	exit 1
	
fi

PASSWORD=`git config user.password`

if [ -z "${PASSWORD}" ]; then
	
	echo "Not found a user password!"
	echo "Use: git_conf.sh password {PASSWORD}"
	exit 1
	
fi

LLS_HOME=`su ${USER} -c "realpath ~"`
LLS_WS="${LLS_HOME}/${USER}-ws"
SQL_DIR="${LLS_WS}/sql"
ZIP_FILE="${USER}_backup.zip"

CMD_BASE="mysql -u root --password=${PASSWORD} -D bd_${USER}"
