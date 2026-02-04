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
	
}

update_lot_date()
{
	
	check_lot "$1"
	
	LOT_TYPE="${LOT_NUM:0:2}"
	LOT_NUM="${LOT_NUM:0:8}"
	
	TABLE_NAME="cafe"
	
	if [ -z "$2" ]; then
	
		DATE_NOW=`date +%F`
		
	else
	
		DATE_NOW="$2"
	
	fi
	
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
	
	check_lot "$1"
	
	TABLE_NAME="Lote"
	
	echo "Searching for Lot: ${LOT_NUM}"
	${CMD_BASE} -e "SELECT id, sacas, peso FROM ${TABLE_NAME} WHERE lote = '"${LOT_NUM}"';"
	
}

show_screens()
{
	
	TABLE_NAME="Peneira"
	
	echo "Showing all Screens:"
	${CMD_BASE} -e "SELECT * FROM ${TABLE_NAME};"
	
}

check_screen()
{

	SCREEN_NAME="$1"
	
	if [ -z "${SCREEN_NAME}" ]; then
	
		echo "Screen not found!"
		echo "Run: $0 lotscreen [LOT] [SCREEN]"
		exit 1
	
	fi
	
}

update_lot_screen()
{
	
	check_lot "$1"
	
	check_screen "$2"
	
	TABLE_NAME="Lote"
	TABLE_SCREEN="Peneira"
	
	LOT_ID=`${CMD_BASE} -sN -e "SELECT id FROM ${TABLE_NAME} WHERE lote = '"${LOT_NUM}"';"`
	
	SCREEN_ID=`${CMD_BASE} -sN -e "SELECT id FROM ${TABLE_SCREEN} WHERE nome = '"${SCREEN_NAME}"';"`
	
	echo "TABLE: ${TABLE_NAME}"
	echo "LOT: ${LOT_NUM}"
	echo "ID: ${LOT_ID}"
	echo "SCREEN: ${SCREEN_NAME}"
	echo "SCREEN_ID: ${SCREEN_ID}"
	
	check_screen "${SCREEN_ID}"
	
	show_lot_screen "Old"
	
	echo -e "\nUpdating Screen ${SCREEN_NAME} for ${LOT_NUM} on ${TABLE_NAME}"
	${CMD_BASE} -e "UPDATE ${TABLE_NAME} SET peneira_id = '"${SCREEN_ID}"' WHERE id = '"${LOT_ID}"';"
	
	show_lot_screen "New"
	
}

show_lot_screen()
{

	echo -e "\nShowing ${1} Screen:"
	${CMD_BASE} -sN -e "SELECT id, lote, peneira_id FROM ${TABLE_NAME} WHERE id = '"${LOT_ID}"';"

}
