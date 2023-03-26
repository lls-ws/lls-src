#!/bin/bash
# Script para atualizar a data do ultimo faturamento do milho
#
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

comando_sql

$CMD_BASE -e "UPDATE Milho milho \
				SET milho.dataFaturamento = '2017-04-30' "
				
$CMD_BASE -e "select dataFaturamento from Milho"

$CMD_BASE -e "UPDATE Empresa empresa \
				SET empresa.dataMilho = '2017-04-30' "
				
$CMD_BASE -e "select dataMilho from Empresa"
