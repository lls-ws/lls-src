#!/bin/bash
# Script para apagar dados nas tabelas da Balanca
#
# email: lls.homeoffice@gmail.com

apaga_tabelas()
{
	
	echo "Apagando as tabelas de balanca da base de dados: bd_lls"

	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; 	\
		drop table Ticket; 						\
		drop table Peso;						\
		drop table Entcafe_Peso; 				\
		SET FOREIGN_KEY_CHECKS=1;				\
		show tables;"
	
}

limpa_tabelas()
{
	
	echo "Limpando as tabelas de balanca da base de dados: bd_lls"
	
	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; 		\
		truncate table Ticket; 						\
		truncate table Peso;						\
		truncate table Entcafe_Peso; 				\
		SET FOREIGN_KEY_CHECKS=1;					\
		show tables;"
	
}

show_tabelas()
{
	
	echo "Mostrando os dados das tabelas balanca"

	$CMD_BASE -e "\
		show tables;							\
		select * from Ticket; 					\
		select * from Peso;						\
		select * from Entcafe_Peso;"
	
}

describe_tables()
{
	
	echo "Descrevendo as tabelas de Balanca:"
	
	$CMD_BASE -e "show tables; describe Peso;"
	
}

# Definindo o comando
CMD="mysql -u root --password=Aws#739200"

# Definindo a base de dados
BASE="bd_lls"

# Definindo a base de dados
BASE_OPT=$(echo "-D $BASE")

# Definindo o comando com a base de dados
CMD_BASE=$(echo "$CMD $BASE_OPT")

case $1 in
    apaga)
		apaga_tabelas
		;;
    limpa)
		limpa_tabelas
		;;
    show)
		show_tabelas
		;;
	describe)
		describe_tables
		;;
    *)
		echo "Use: $0 [apaga|limpa|show|describe]"
		exit 1;
		;;
esac
