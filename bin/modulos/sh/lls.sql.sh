#!/bin/bash
# Script para apagar dados nas tabelas do lls core
#
# email: lls.homeoffice@gmail.com

# Caminho das bibliotecas
PATH=.:$(dirname $0):$PATH
. cloud/lib/tomcat.lib		|| exit 1

apaga_tabelas()
{
	
	echo "Apagando as tabelas de cafe da base de dados: bd_lls"

	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; 	\
		drop table Empresa; 					\
		drop table FazendaProdutor;				\
		drop table Preco; 						\
		drop table Produtor; 					\
		drop table TelefoneProdutor; 			\
		drop table Usuario;						\
		SET FOREIGN_KEY_CHECKS=1;				\
		show tables;"
	
}

limpa_tabelas()
{
	
	echo "Limpando as tabelas de cafe da base de dados: bd_lls"
	
	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; 		\
		truncate table Empresa; 					\
		truncate table FazendaProdutor;				\
		truncate table Preco; 						\
		truncate table Produtor; 					\
		truncate table TelefoneProdutor; 			\
		truncate table Usuario; 					\
		SET FOREIGN_KEY_CHECKS=1;					\
		show tables;"
	
}

show_tabelas()
{
	
	echo "Mostrando os dados das tabelas cafe"

	$CMD_BASE -e "\
		show tables;							\
		select * from Empresa; 					\
		select * from FazendaProdutor;			\
		select * from Preco;					\
		select * from Produtor; 				\
		select * from TelefoneProdutor; 		\
		select * from Usuario;"
	
}

describe_tables()
{
	
	echo "Descrevendo as tabelas de Cafe:"
	
	$CMD_BASE -e "show tables; describe Lote;"
	
}

apaga_bd()
{
	echo "Apagando o banco de dados: ${BASE}"

	$CMD -e "show databases; 	\
		drop database ${BASE};	\
		show databases;"
}

cria_bd()
{
	echo "Criando o banco de dados: ${BASE}"

	$CMD -e "show databases; 		\
		create database ${BASE};	\
		show databases;"
}

show_bds()
{
	echo "Mostrando todos os bancos de dados:"

	$CMD -e "show databases;"
}

# Definindo o comando
CMD="mysql -u root --password=${PASSWORD}"

# Definindo a base de dados
BASE="bd_lls"

# Definindo a base de dados
BASE_OPT=$(echo "-D $BASE")

# Definindo o comando com a base de dados
CMD_BASE=$(echo "$CMD $BASE_OPT")

case $1 in
    show_bds)
		show_bds
		;;
    apaga)
		apaga_tabelas
		;;
	apaga_bd)
		apaga_bd
		;;
	cria_bd)
		cria_bd
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
		echo "Use: $0 [apaga|limpa|show|describe|apaga_bd|cria_bd|show_bds]"
		exit 1;
		;;
esac
