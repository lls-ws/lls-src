#!/bin/bash
# Script para corrigir dados nas tabelas do BD_LLS da funchal
#
# email: lls.homeoffice@gmail.com

# Caminho das bibliotecas
PATH=.:$(dirname $0):$PATH
. bin/conf/tomcat_settings.sh	|| exit 1
. bin/sql/sql_settings.sh		|| exit 1
. bin/sql/sql_coffe.sh			|| exit 1
. bin/sql/sql_corn.sh			|| exit 1

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

if [ ! -L ${LLS_WS} ]; then
	
	su ${USER} -c "ln -sfv ${DIR_TOMCAT} ${LLS_WS}; ls -al ${LLS_WS}"

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
    lot)
		search_lot "$2"
		;;
	*)
		echo "Use: $0 [guide_set|get_db|user|lotdate|balance|lot]"
		exit 1;
		;;
esac
