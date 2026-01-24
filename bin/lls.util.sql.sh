#!/bin/bash
# Script para corrigir dados nas tabelas do BD_LLS da funchal
#
# email: lls.homeoffice@gmail.com

# Caminho das bibliotecas
PATH=.:$(dirname $0):$PATH
. lib/mysql.lib		|| exit 1
. lib/tomcat.lib	|| exit 1
. lib/lls_util_corn.lib	|| exit 1

select_guide()
{
	
	GUIA_NUMBER=`${CMD_BASE} -sN -e "SELECT numero FROM Guia WHERE id = '1';"`
	
}

set_guide()
{

	select_guide
	
	echo "OLD NUMBER: ${GUIA_NUMBER}"
	
	let GUIA_NUMBER++
	
	${CMD_BASE} -e "UPDATE Guia SET numero = '"${GUIA_NUMBER}"' WHERE id = '1';"
	
	select_guide
	
	echo "NEW NUMBER: ${GUIA_NUMBER}"
	
}

get_database()
{
	
	sftp -i ${LLS_HOME}/.ssh/id_rsa lls@funchal.lls.net.br:${SQL_DIR}/${ZIP_FILE} ${LLS_HOME}
	
	if [ -f ${LLS_HOME}/${ZIP_FILE} ]; then
	
		echo -e "\nFile downloaded:"
		
		ls -al ${LLS_HOME}/${ZIP_FILE}
	
		du -hsc ${LLS_HOME}/${ZIP_FILE}
	
	else
	
		echo "File not download!"
		exit 1
	
	fi
	
}

user_add()
{
	
	TABLE_DB="Usuario"
	
	clean_table
	
	USER_EMAIL="lls.homeoffice@gmail.com"
	
	${CMD_BASE} -e "INSERT INTO $TABLE_DB \
			(email, senha, data) VALUE ('${USER_EMAIL}', '111111', '$(date "+%Y-%m-%d")');"
		
	show_table
	
	ls -al ${SQL_DIR}
	
}

clean_table()
{
	
	echo "Cleanning table: ${TABLE_DB}"
	
	${CMD_BASE} -e "SET FOREIGN_KEY_CHECKS=0; TRUNCATE ${TABLE_DB}; SET FOREIGN_KEY_CHECKS=1;"
	
	echo "Inserting data on table: ${TABLE_DB}"
	
}

show_table()
{
	
	${CMD_BASE} -e "SELECT * FROM ${TABLE_DB}"
	
}

check_lot()
{

	LOT_NUM="$1"
	
	if [ -z "${LOT_NUM}" ]; then
	
		echo "Lot not found!"
		echo "Run: $0 lotdate [LOT]"
		exit 1
	
	fi
	
	echo "Searching ID for LOT: ${LOT_NUM}"
	
}

update_lot_date()
{
	
	check_lot "$1"
	
	LOT_TYPE="${LOT_NUM:0:2}"
	LOT_NUM="${LOT_NUM:0:8}"
	
	TABLE_NAME="cafe"
	
	DATE_NOW=`date +%F`
	
	if [ "${LOT_TYPE}" = "GT" ]; then
	
		TABLE_NAME="Tra"${TABLE_NAME}
	
	elif [ "${LOT_TYPE}" = "GR" ]; then
	
		TABLE_NAME="Ent"${TABLE_NAME}
		
	elif [ "${LOT_TYPE}" = "GE" ]; then
	
		TABLE_NAME="Sai"${TABLE_NAME}
		
	else
	
		TABLE_NAME="OS"${TABLE_NAME}
	
	fi
	
	LOT_ID=`${CMD_BASE} -sN -e "SELECT id FROM ${TABLE_NAME} WHERE lote = '"${LOT_NUM}"';"`
	
	echo "TABLE: ${TABLE_NAME}"
	echo "TYPE: ${LOT_TYPE}"
	echo "DATE: ${DATE_NOW}"
	echo "LOT: ${LOT_NUM}"
	echo "ID: ${LOT_ID}"
	
	echo -e "\nShowing old date:"
	${CMD_BASE} -sN -e "SELECT id, lote, data FROM ${TABLE_NAME} WHERE id = '"${LOT_ID}"';"
	
	echo -e "\nUpdating Date for ${LOT_NUM} on ${TABLE_NAME}"
	${CMD_BASE} -e "UPDATE ${TABLE_NAME} SET data = '"${DATE_NOW}"' WHERE id = '"${LOT_ID}"';"
	
	echo -e "\nShowing new date:"
	${CMD_BASE} -sN -e "SELECT id, lote, data FROM ${TABLE_NAME} WHERE id = '"${LOT_ID}"';"
	
}

clear

LLS_HOME=`su ${USER} -c "realpath ~"`
LLS_WS="${LLS_HOME}/${USER}-ws"
LLS_DIR="/var/lib/tomcat9/webapps/${USER}"
SQL_DIR="${LLS_WS}/sql"
ZIP_FILE="${USER}_backup.zip"

if [ ! -L ${LLS_WS} ]; then
	
	su ${USER} -c "ln -sfv ${LLS_DIR} ${LLS_WS}; ls -al ${LLS_WS}"

fi

case $1 in
    guide_set)
		set_guide
		;;
    get_db)
		get_database
		;;
    user)
		user_add
		;;
	lotdate)
		update_lot_date "$2"
		;;
    balance)
		balance_update
		;;
    *)
		echo "Use: $0 [guide_set|get_db|user|lotdate|balance]"
		exit 1;
		;;
esac
