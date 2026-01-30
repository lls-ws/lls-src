#!/bin/bash
# Script to Update LLS Coffe DataBase
#
# email: lls.homeoffice@gmail.com

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

search_lot()
{
	
	LOT_NUM="$1"
	
	TABLE_NAME="Lote"
	
	echo "Searching for Lot ID..."
	${CMD_BASE} -sN -e "SELECT id, sacas, peso, saldoSacas, saldoPeso FROM ${TABLE_NAME} WHERE lote = '"${LOT_NUM}"';"
	
}
