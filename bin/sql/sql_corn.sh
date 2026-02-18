#!/bin/bash
# Script to Update LLS Corn DataBase
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

balance_update()
{
	
	echo "Updating Corn Balance on ${URL_HOST}"
	
	ssh -i ${KEY_RSA} ${USER}@${URL_HOST} bash << 'EOF'
	sudo service tomcat9 stop
	git clone https://github.com/lls-ws/lls-src.git
	cd lls-src
	sudo bash modulos/milho/bin/atualiza_saldo_milho.sh update
	cd ~
	sudo rm -rf lls-src
	ls
	sudo service tomcat9 start
EOF

	echo "Corn Balance Updated!"

}

check_laudo()
{

	LAUDO_NUM="$1"
	
	if [ -z "${LAUDO_NUM}" ]; then
	
		echo "Laudo not found!"
		echo "Run: $0 laudodate [LAUDO]"
		exit 1
	
	fi
	
}

update_laudo_date()
{
	
	check_laudo "$1"
	
	TABLE_NAME="Entmilho"
	
	if [ -z "$2" ]; then
	
		DATE_NOW=`date +%F`
		
	else
	
		DATE_NOW="$2"
	
	fi
	
	LAUDO_ID=`${CMD_BASE} -sN -e "SELECT id FROM ${TABLE_NAME} WHERE laudo = '"${LAUDO_NUM}"';"`
	
	echo "TABLE: ${TABLE_NAME}"
	echo "DATE: ${DATE_NOW}"
	echo "LAUDO: ${LAUDO_NUM}"
	echo "ID: ${LAUDO_ID}"
	
	echo -e "\nShowing old date:"
	${CMD_BASE} -sN -e "SELECT id, laudo, data FROM ${TABLE_NAME} WHERE id = '"${LAUDO_ID}"';"
	
	echo -e "\nUpdating Date for ${LOT_NUM} on ${TABLE_NAME}"
	${CMD_BASE} -e "UPDATE ${TABLE_NAME} SET data = '"${DATE_NOW}"' WHERE id = '"${LAUDO_ID}"';"
	
	echo -e "\nShowing new date:"
	${CMD_BASE} -sN -e "SELECT id, laudo, data FROM ${TABLE_NAME} WHERE id = '"${LAUDO_ID}"';"
	
}
