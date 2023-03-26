#!/bin/bash
# Script para ler arquivos txt e salvar no mysql
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="lls"

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. lib_config.sh		|| exit 1
. lib_txt2sql.sh	|| exit 1

pega_total()
{
	
	$CMD_BASE -e "select count(*) AS Total_Usuarios from Usuario;
		select count(*) AS Total_Empresa from Empresa; \
		select count(*) AS Total_Produtores from Produtor; \
		select count(*) AS Total_Fazendas from FazendaProdutor; \
		select count(*) AS Total_Telefones from TelefoneProdutor; \
		select count(*) AS Total_Preco from Preco;"
	
}

limpa_tabelas()
{
	
	echo "Limpando todas as tabelas do cadastro..."
	
	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; \
		TRUNCATE Usuario; \
		TRUNCATE Empresa; \
		TRUNCATE Preco; \
		TRUNCATE TelefoneProdutor; \
		TRUNCATE FazendaProdutor; \
		TRUNCATE Produtor; \
		SET FOREIGN_KEY_CHECKS=1; \
		SHOW TABLES;"
	
}

excluir_tabelas()
{
	
	echo "Excluindo as tabelas do cadastro..."
	
	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; \
		DROP TABLE Usuario; \
		DROP TABLE Empresa; \
		DROP TABLE Preco; \
		DROP TABLE TelefoneProdutor; \
		DROP TABLE FazendaProdutor; \
		DROP TABLE Produtor; \
		SET FOREIGN_KEY_CHECKS=1; \
		SHOW TABLES;"
	
}

inserir_empresa()
{
	
	NOME_TABELA="empresa"
	
	NOME_TABELA_UPPER=$(echo "$NOME_TABELA" | tr '[:lower:]' '[:upper:]')
	
	TABELA=`echo $NOME_TABELA | awk '{ print toupper(substr($NOME_TABELA, 1, 1)) substr($NOME_TABELA, 2) }'`
	
	limpa_tabela
	
	ARQ_EMPRESA="$DIR_PROJETO/dataflex/EMPRESA.TXT"
	
	ARQ_TXT="$DIR_PROJETO/$DIR_TXT/$NOME_TABELA_UPPER.TXT"
	
	if [ ! -f $ARQ_EMPRESA ]; then
	
		echo "Arquivo empresa nao encontrado!"
		
		exit 1;
	
	fi
	
	if [ -f $ARQ_TXT ]; then
	
		rm -fv $ARQ_TXT
		
	fi
	
	cp -fv $ARQ_EMPRESA $ARQ_TXT
	
	iconv -f utf-8 -t iso8859-1 -c $ARQ_TXT |
	
	while read linha
	do
		
		let TOTAL++
		
		case $TOTAL in
			1)
				
				ID=''
				
				ID=`echo $linha | xargs`
				
				#echo "ID:$ID" >> $ARQ_LOG
				
				;;
			2)
				
				NOME=''
				
				NOME=`formata_string "$linha"`
				
				echo "NOME:$NOME" >> $ARQ_LOG
				
				;;
			3)
				
				ENDERECO=''
				
				ENDERECO=`formata_string "$linha"`
				
				echo "ENDERECO:$ENDERECO" >> $ARQ_LOG
				
				;;
			4)
				
				BAIRRO=''
				
				BAIRRO=`formata_string "$linha"`
				
				echo "BAIRRO:$BAIRRO" >> $ARQ_LOG
				
				;;
			5)
				
				CIDADE=''
				
				CIDADE=`formata_string "$linha"`
				
				echo "CIDADE:$CIDADE" >> $ARQ_LOG
				
				;;
			6)
				
				ESTADO=''
				
				ESTADO=`echo $linha | tr '[:lower:]' '[:upper:]' | xargs`
				
				if [ -z "$ESTADO" ]; then
				
					ESTADO="MG"
				
				fi
				
				echo "ESTADO:$ESTADO" >> $ARQ_LOG
				
				;;
			7)
				
				CEP=''
				
				CEP=`echo $linha | xargs | tr -d '.' | tr -d '-'`
				
				echo "CEP:$CEP" >> $ARQ_LOG
				
				;;
			8)
				
				CPFCNPJ=''
				
				CPFCNPJ=`echo $linha | xargs | tr -d '.' | tr -d '-' | tr -d '/'`
				
				echo "CPF/CNPJ:$CPFCNPJ" >> $ARQ_LOG
				
				;;
			9)
				
				IE=''
				
				IE=`echo "$linha" | xargs`
				
				echo "IE:$IE" >> $ARQ_LOG
				
				;;
			10)
				
				EMAIL=''
				
				EMAIL=`echo "$linha" | xargs`
				
				echo "EMAIL:$EMAIL" >> $ARQ_LOG
				
				;;
			11)
				
				SITE=''
				
				SITE=`echo "$linha" | xargs`
				
				echo "SITE:$SITE" >> $ARQ_LOG
				
				;;
			12)
				
				TELEFONE=''
				
				TELEFONE=`echo "$linha" | xargs | tr -d '[[:space:]]' | tr -d '(' | tr -d ')' | tr -d '-' | tr -d '.'`
				
				echo "TELEFONE:$TELEFONE" >> $ARQ_LOG
				
				;;
			13)
				
				DATA_MILHO=''
				
				DATA_MILHO=`echo "$linha" | xargs`
				
				echo "DATA_MILHO:$DATA_MILHO" >> $ARQ_LOG
				
				$CMD_BASE -e "insert into $TABELA \
					(id, nome, endereco, bairro, cidade, estado, cep, cpfcnpj, ie, email, site, telefone, dataMilho) values \
					('$ID', '$NOME', '$ENDERECO', '$BAIRRO', '$CIDADE', '$ESTADO', '$CEP', '$CPFCNPJ', '$IE', '$EMAIL', '$SITE', '$TELEFONE', '$DATA_MILHO');" "bd_lls" "-N" "-B"
				
				RESPOSTA="$?"
				
				if [ $RESPOSTA -eq 0 ]; then
				
					echo "Empresa inserida com sucesso!" >> $ARQ_LOG
				
				else
				
					echo "Erro ao inserir a empresa: $NOME" >> $ARQ_LOG
					
					exit 1;
				
				fi
				
				TOTAL=0
				
				;;
		esac
		
	done
	
	$CMD_BASE -e "select * from $TABELA;"
	
}

inserir_empresa_lls()
{
	
	NOME="LLS Tecnologia"
	ENDERECO="Rua Coronel Antonio Alves Pereira, 1690"
	BAIRRO="Saraiva"
	CIDADE="Uberlandia"
	ESTADO="MG"
	CEP="38408370"
	CNPJ="34558487000144"
	TELEFONE="34999837314"
	EMAIL="lls.homeoffice@gmail.com"
	SITE="www.app.lls.net.br"
	IE="498.461-00"
	DATA_FAT="2020-03-31"
	
	TABELA="Empresa"
	
	limpa_tabela
	
	#${CMD_BASE} -e "TRUNCATE $TABELA;								\
	#				insert 	into $TABELA (nome, endereco, bairro, cidade, estado, cep, cpfcnpj, telefone, email, site, ie, dataMilho, dataCafe) 	\
	#						value ('$NOME', '$ENDERECO', '$BAIRRO', '$CIDADE', '$ESTADO', '$CEP', '$CNPJ', '$TELEFONE', '$EMAIL', '$SITE', '$IE', '$DATA_FAT', '$DATA_FAT'); 	\
	#				select * from $TABELA"
	
}

inserir_usuario()
{
	
	EMAIL="lls.homeoffice@gmail.com"
	SENHA="Home#12"
	
	TABELA="Usuario"
	
	limpa_tabela
	
	#${CMD_BASE} -e "insert into $TABELA (email, senha, data) \
	#					value ('$EMAIL', '$SENHA', '2020-04-02'); \
	#				select * from $TABELA"
	
}

ler_arquivo_tabela()
{
	
	NOME_TABELA="tabela"
	
	NOME_TABELA_UPPER=$(echo "$NOME_TABELA" | tr '[:lower:]' '[:upper:]')
	
	TABELA="Preco"
	
	ARQ_TXT="$DIR_PROJETO/$DIR_TXT/$NOME_TABELA_UPPER.TXT"
	
	TOTAL=0
	
	limpa_tabela
	
	iconv -f "windows-1251" -t "iso8859-1" -c "$ARQ_TXT" |
	
	while read linha
	do
		
		let TOTAL++
		
		if [ $TOTAL -eq 1 ]; then
		
			ID=`echo $linha`
		
			echo "ID: $ID" >> $ARQ_LOG
		
		fi
		
		if [ $TOTAL -eq 2 ]; then
			
			NOME=''
			
			NOME=`formata_string "$linha"`
			
			echo "NOME:$NOME" >> $ARQ_LOG
			
		fi
		
		if [ $TOTAL -eq 3 ]; then
			
			VALOR=`echo $linha`
			
			echo "VALOR: $VALOR" >> $ARQ_LOG
			
			$CMD_BASE -e "insert into Preco (id, nome, valor) values ('$ID', '$NOME', '$VALOR');"
			
			TOTAL=0
			
		fi
		
	done
	
	MSG=`cat $ARQ_MIGRA | head -1 | tail -1`
	
	echo "$MSG"
	echo "Leitura efetuada com sucesso!"
	
	echo "$MSG" >> $ARQ_LOG
	
	mostra_tabela
	
}

ler_arquivo_cliente()
{
	
	NOME_TABELA="cliente"
	
	NOME_TABELA_UPPER=$(echo "$NOME_TABELA" | tr '[:lower:]' '[:upper:]')
	
	TABELA="Produtor"
	
	ARQ_TXT="$DIR_PROJETO/$DIR_TXT/$NOME_TABELA_UPPER.TXT"
	
	TOTAL=0
	
	echo "Limpando as tabelas...$TABELA...Telefone$TABELA..."
	
	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; \
		truncate Telefone$TABELA; truncate $TABELA;	\
		SET FOREIGN_KEY_CHECKS=1;"
	
	echo "Gerando arquivo de log: $ARQ_LOG"
	
	iconv -f "windows-1251" -t "iso8859-1" -c "$ARQ_TXT" |
	
	while read linha
	do
		
		let TOTAL++
		
		case $TOTAL in
			1)
				
				ID=''
				
				ID=`echo $linha | xargs`
				
				echo "ID:$ID" >> $ARQ_LOG
				
				;;
			2)
				
				NOME=''
				
				NOME=`formata_string "$linha"`
				
				echo "NOME:$NOME" >> $ARQ_LOG
				
				;;
			3)
				
				ENDERECO=''
				
				ENDERECO=`formata_string "$linha"`
				
				echo "ENDERECO:$ENDERECO" >> $ARQ_LOG
				
				;;
			4)
				
				BAIRRO=''
				
				BAIRRO=`formata_string "$linha"`
				
				echo "BAIRRO:$BAIRRO" >> $ARQ_LOG
				
				;;
			5)
				
				CIDADE=''
				
				CIDADE=`formata_string "$linha"`
				
				echo "CIDADE:$CIDADE" >> $ARQ_LOG
				
				;;
			6)
				
				ESTADO=''
				
				ESTADO=`echo $linha | tr '[:lower:]' '[:upper:]' | xargs`
				
				if [ -z "$ESTADO" ]; then
				
					ESTADO="MG"
				
				fi
				
				echo "ESTADO:$ESTADO" >> $ARQ_LOG
				
				;;
			7)
				
				CEP=''
				
				CEP=`echo $linha | xargs | tr -d '.' | tr -d '-'`
				
				echo "CEP:$CEP" >> $ARQ_LOG
				
				;;
			8)
				
				EMAIL=''
				
				EMAIL=`echo $linha | xargs | tr '[:upper:]' '[:lower:]'`
				
				echo "EMAIL:$EMAIL" >> $ARQ_LOG
				
				;;
			9)
				
				SITE=''
				
				SITE=`echo $linha | xargs | tr '[:upper:]' '[:lower:]'`
				
				echo "SITE:$SITE" >> $ARQ_LOG
				
				;;
			10)
				
				CPFCNPJ=''
				
				CPFCNPJ=`echo $linha | xargs | tr -d '.' | tr -d '-' | tr -d '/'`
				
				echo "CPF/CNPJ:$CPFCNPJ" >> $ARQ_LOG
				
				;;
			11)
				
				OBS=''
				
				IE=''
				
				IE=`echo "$linha" | xargs`
				
				if [ -n "$IE" ]; then
					
					OBS=`echo "$IE"`
					
				fi
				
				;;
			12)
				
				if [ -n "$linha" ]; then
					
					OBS+=$(echo -e "\n`formata_string "$linha"`")
					
				fi
				
				;;
			13)
				
				if [ -n "$linha" ]; then
					
					OBS+=$(echo -e "\n`formata_string "$linha"`")
					
				fi
				
				;;
			14)
				
				if [ -n "$linha" ]; then
					
					OBS+=$(echo -e "\n`formata_string "$linha"`")
					
				fi
				
				;;
			15)
				
				echo "OBS:$OBS" >> $ARQ_LOG
				
				if [ -z "$NOME" ]; then
				
					NOME="Produtor sem nome"
				
				fi
				
				inserir_produtor
				
				TOTAL=0
				
				;;
			*)
				break;
				;;
		esac
		
	done
	
	MSG=`cat $ARQ_MIGRA | head -2 | tail -1`
	
	echo "$MSG"
	echo "Leitura efetuada com sucesso!"
	
	echo "$MSG" >> $ARQ_LOG
	
	$CMD_BASE -e "select count(*) as Total_Produtores from $TABELA; \
		select count(*) as Total_Telefone from Telefone$TABELA;"
	
}

inserir_produtor()
{
	
	$CMD_BASE -e "insert into $TABELA \
		(id, nome, endereco, bairro, cidade, estado, cep, email, site, cpfcnpj, observacao) values \
		('$ID', '$NOME', '$ENDERECO', '$BAIRRO', '$CIDADE', '$ESTADO', '$CEP', '$EMAIL', '$SITE', '$CPFCNPJ', '$OBS');" "bd_lls" "-N" "-B"
	
	RESPOSTA="$?"
	
	if [ $RESPOSTA -eq 0 ]; then
		
		echo "Produtor inserido com sucesso!" >> $ARQ_LOG
		
		FONE=`echo "$linha" | xargs | tr -d '[[:space:]]' | tr -d '(' | tr -d ')' | tr -d '-' | tr -d '.'`
			
		if [ -n "$FONE" ]; then
				
			echo "FONE:$FONE" >> $ARQ_LOG
				
			inserir_telefone
				
		fi
	
	else
	
		echo "Erro ao inserir o produtor: $NOME"
		
		exit 1;
	
	fi
	
}

inserir_telefone()
{
	
	PRIMEIRO_NUMERO=${FONE:2:1}
	
	echo "PRIMEIRO_NUMERO: $PRIMEIRO_NUMERO" >> $ARQ_LOG
	
	if [ $PRIMEIRO_NUMERO -ge 8 ]; then
		
		TIPO="CELULAR"
		
	else 
		
		TIPO="FIXO"
		
	fi
	
	echo "Inserindo $FONE na tabela: Telefone$TABELA TIPO: $TIPO" >> $ARQ_LOG
	
	$CMD_BASE -e "insert into Telefone$TABELA \
		(numero, responsavel, tipo, produtor_id) values \
		('$FONE', '$NOME', '$TIPO', '$ID')"
	
	RESPOSTA="$?"
	
	if [ $RESPOSTA -eq 0 ]; then
		
		echo "Telefone inserido com sucesso!" >> $ARQ_LOG
		
	else
		
		echo "Erro ao inserir telefone: $FONE"
		
		exit 1;
		
	fi
	
}

ler_arquivo_fazendas()
{
	
	NOME_TABELA="fazenda"
	
	NOME_TABELA_UPPER=$(echo "$NOME_TABELA" | tr '[:lower:]' '[:upper:]')
	
	TABELA="FazendaProdutor"
	
	ARQ_TXT="$DIR_PROJETO/$DIR_TXT/$NOME_TABELA_UPPER.TXT"
	
	TOTAL=0
	
	limpa_tabela
	
	iconv -f "windows-1251" -t "iso8859-1" -c "$ARQ_TXT" |
	
	while read linha
	do
		
		let TOTAL++
		
		case $TOTAL in
			1)
				
				ID_PRODUTOR=''
				
				ID_PRODUTOR=`echo $linha | xargs`
				
				echo "ID_PRODUTOR:$ID_PRODUTOR" >> $ARQ_LOG
				
				;;
			2)
				
				ID_FAZ=''
				
				ID_FAZ=`echo $linha | xargs`
				
				echo "ID_FAZ:$ID_FAZ" >> $ARQ_LOG
				
				;;
			3)
				
				NOME_FAZ=''
				
				NOME_FAZ=`formata_string "$linha"`
				
				echo "NOME_FAZ:$NOME_FAZ" >> $ARQ_LOG
				
				;;
			4)
				
				ENDERECO_FAZ=''
				
				ENDERECO_FAZ=`formata_string "$linha"`
				
				echo "ENDERECO_FAZ:$ENDERECO_FAZ" >> $ARQ_LOG
				
				;;
			5)
				
				CIDADE_FAZ=''
				
				CIDADE_FAZ=`formata_string "$linha"`
				
				echo "CIDADE_FAZ:$CIDADE_FAZ" >> $ARQ_LOG
				
				;;
			6)
				
				ESTADO_FAZ=''
				
				ESTADO_FAZ=`echo $linha | tr '[:lower:]' '[:upper:]' | xargs`
				
				if [ -z "$ESTADO_FAZ" ]; then
				
					ESTADO_FAZ="MG"
				
				fi
				
				echo "ESTADO_FAZ:$ESTADO_FAZ" >> $ARQ_LOG
				
				;;
			7)
				
				CEP_FAZ=''
				
				CEP_FAZ=`echo $linha | xargs | tr -d '.' | tr -d '-'`
				
				echo "CEP_FAZ:$CEP_FAZ" >> $ARQ_LOG
				
				;;
			8)
				
				CPFCNPJ_FAZ=''
				
				CPFCNPJ_FAZ=`echo $linha | xargs | tr -d '.' | tr -d '-' | tr -d '/'`
				
				echo "CPF/CNPJ_FAZ:$CPFCNPJ_FAZ" >> $ARQ_LOG
				
				;;
			9)
				
				IE_FAZ=''
				
				IE_FAZ=`echo "$linha" | xargs`
				
				echo "IE_FAZ:$IE_FAZ" >> $ARQ_LOG
				
				$CMD_BASE -e "insert into $TABELA \
					(id, nome, endereco, cidade, bairro, estado, cep, cpfcnpj, ie, produtor_id) values \
					('$ID_FAZ', '$NOME_FAZ', '$ENDERECO_FAZ', '$CIDADE_FAZ', '', '$ESTADO_FAZ', '$CEP_FAZ', '$CPFCNPJ_FAZ', '$IE_FAZ', '$ID_PRODUTOR');" "bd_lls" "-N" "-B"
				
				RESPOSTA="$?"
				
				if [ $RESPOSTA -eq 0 ]; then
				
					echo "Fazenda inserida com sucesso!" >> $ARQ_LOG
				
				else
				
					echo "Erro ao inserir a fazenda: $NOME_FAZ" >> $ARQ_LOG
					
					exit 1;
				
				fi
				
				TOTAL=0
				
				;;
			*)
				
				break;
				
				;;
		esac
		
	done
	
	MSG=`cat $ARQ_MIGRA | head -3 | tail -1`
	
	echo "$MSG"
	echo "Leitura efetuada com sucesso!"
	
	echo "$MSG" >> $ARQ_LOG
	
	mostra_tabela
	
}

add_users()
{
	
	TABELA="Usuario"
	
	limpa_tabela
	
	#EMAILS=("lls.homeoffice@gmail.com"
	#	"renato.ribeiro@grupofunchal.com"
	#	"esteice.rubiana@grupofunchal.com.br"
	#	"gustavo.bicalho@grupofunchal.com.br"
	#	"rosilene.lima@grupofunchal.com.br"
	#	"funchal@grupofunchal.com.br")
	
	for EMAIL in "${EMAILS[@]}"
	do
		
		$CMD_BASE -e "insert into $TABELA \
			(email, senha, data) value ('${EMAIL}', 'Funchal#12', '2019-06-25');"
		
	done
	
	mostra_tabela
	
}

OPCAO="$1"

comando_sql

case "$OPCAO" in
	all)    	
		limpa_tabelas
		inserir_usuario
		inserir_empresa
		ler_arquivo_tabela
		ler_arquivo_cliente
		ler_arquivo_fazendas
		pega_total
		;; 
	clear)    	
		limpa_tabelas
		;; 
	remove)
		excluir_tabelas
		;;
	total)
		pega_total
		;;
	usuario)
		inserir_empresa_lls
		inserir_usuario
		#add_users
		;;
	empresa)
		inserir_usuario
		inserir_empresa_lls
		;;
	preco)
		ler_arquivo_tabela
		;;
	produtor)
		#ler_arquivo_cliente
		echo "Rodar o script: sh sh/produtor.sh para atualizar os novos produtores!"
		;;
	fazenda)
		#ler_arquivo_fazendas
		echo "Rodar o script: sh sh/produtor.sh para atualizar os novos produtores!"
		;;
	testes)
		testes
		;;
	*)
		echo "Use: $(basename $0) [clear|remove|total|usuario|empresa|preco|produtor|fazenda|testes|all]"
		exit 1
		;;
esac
