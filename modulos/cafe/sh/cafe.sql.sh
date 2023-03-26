#!/bin/bash
# Script para apagar dados nas tabelas de Cafe
#
# email: lls.homeoffice@gmail.com

apaga_tabelas()
{
	
	echo "Apagando as tabelas de cafe da base de dados: bd_lls"

	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; 	\
		drop table Guia; 						\
		drop table Peneira;						\
		drop table Lote; 						\
		drop table Entcafe; 					\
		drop table Entcafe_Lote; 				\
		drop table Oscafe; 						\
		drop table Oscafe_Despejo; 				\
		drop table Oscafe_Lote; 				\
		drop table Saicafe;						\
		drop table Saicafe_Despejo; 			\
		drop table Tracafe; 					\
		drop table Tracafe_Despejo; 			\
		drop table Tracafe_Lote; 				\
		drop table Cafe; 						\
		drop table Fatcafe; 					\
		drop table Servcafe; 					\
		drop table Baixacafe; 					\
		drop table Entcafe_Servcafe;			\
		drop table Saicafe_Servcafe;			\
		drop table Oscafe_Servcafe;				\
		SET FOREIGN_KEY_CHECKS=1;				\
		show tables;"
	
}

limpa_tabelas()
{
	
	echo "Limpando as tabelas de cafe da base de dados: bd_lls"
	
	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; 		\
		truncate table Guia; 						\
		truncate table Peneira;						\
		truncate table Lote; 						\
		truncate table Entcafe; 					\
		truncate table Entcafe_Lote; 				\
		truncate table Oscafe; 						\
		truncate table Oscafe_Despejo; 				\
		truncate table Oscafe_Lote; 				\
		truncate table Saicafe;						\
		truncate table Saicafe_Despejo; 			\
		truncate table Tracafe; 					\
		truncate table Tracafe_Despejo; 			\
		truncate table Tracafe_Lote; 				\
		truncate table Cafe; 						\
		truncate table Fatcafe; 					\
		truncate table Servcafe; 					\
		truncate table Baixacafe; 					\
		truncate table Entcafe_Servcafe;			\
		truncate table Saicafe_Servcafe;			\
		truncate table Oscafe_Servcafe;				\
		SET FOREIGN_KEY_CHECKS=1;					\
		show tables;"
	
}

show_tabelas()
{
	
	echo "Mostrando os dados das tabelas cafe"

	$CMD_BASE -e "\
		show tables;							\
		select * from Guia; 					\
		select * from Peneira;					\
		select * from Lote;						\
		select * from Entcafe; 					\
		select * from Entcafe_Lote; 			\
		select * from Oscafe; 					\
		select * from Oscafe_Despejo; 			\
		select * from Oscafe_Lote; 				\
		select * from Saicafe; 					\
		select * from Saicafe_Despejo; 			\
		select * from Tracafe; 					\
		select * from Tracafe_Despejo; 			\
		select * from Tracafe_Lote; 			\
		select * from Cafe; 					\
		select * from Fatcafe; 					\
		select * from Servcafe; 				\
		select * from Baixacafe;				\
		select * from Entcafe_Servcafe;			\
		select * from Saicafe_Servcafe;			\
		select * from Oscafe_Servcafe;"
	
}

describe_tables()
{
	
	echo "Descrevendo as tabelas de Cafe:"
	
	$CMD_BASE -e "show tables; describe Lote;"
	
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
