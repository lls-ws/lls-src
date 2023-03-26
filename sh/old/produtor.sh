#!/bin/bash
# Script para ler arquivos txt e salvar novos produtores e fazendas no mysql
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="lls"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1
. lib_txt2sql.sh	|| exit 1

ler_arquivo_cliente()
{
	
	NOME_TABELA="cliente"
	
	NOME_TABELA_UPPER=$(echo "$NOME_TABELA" | tr '[:lower:]' '[:upper:]')
	
	TABELA="Produtor"
	
	ARQ_TXT="$DIR_PROJETO/$DIR_TXT/$NOME_TABELA_UPPER.TXT"
	
	TOTAL=0
	
	comando_sql
	
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
	
}

inserir_produtor()
{
	
	NOVO=$($CMD_BASE -e "select id from $TABELA where id = '$ID'" "bd_lls" "-N" "-B")
	
	#echo "NOVO: $NOVO"
	
	if [ -n "$NOVO" ]; then
	
		echo "Produtor encontrado! ID: $ID"
		
	else
	
		echo "Novo Produtor ID: $ID $NOME"
		
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
	
	comando_sql
	
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
				
				NOVA=$($CMD_BASE -e "select id from $TABELA where id = '$ID_FAZ'" "bd_lls" "-N" "-B")
	
				#echo "NOVA: $NOVA"
					
				if [ -n "$NOVA" ]; then
					
					echo "Fazenda encontrada! ID: $ID_FAZ"
					
				else
					
					echo "Nova Fazenda ID: $ID_FAZ $NOME_FAZ"
			
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

				fi
				
				TOTAL=0
				
				;;
			*)
				
				break;
				
				;;
		esac
		
	done
	
}

mostra_produtor_desconhecido()
{
	
	comando_sql
	
	$CMD_BASE -e "select id, nome from Produtor where id in (853,854,855,856,857)"
	
	$CMD_BASE -e "select id, nome from FazendaProdutor where id in (177,249,274,359,512)"
	
	$CMD_BASE -e "select id, data, liquido from Entmilho where fazendaProdutor_id in (177,249,274,359,512)"
	
	$CMD_BASE -e "select id, data, liquido from Saimilho where fazendaProdutor_id in (177,249,274,359,512)"
	
	$CMD_BASE -e "select id, data, valor, pago from Servmilho where fazendaProdutor_id in (177,249,274,359,512)"
	
}

apaga_produtor_desconhecido()
{
	
	comando_sql
	
	$CMD_BASE -e "delete from Entmilho where fazendaProdutor_id in (177,249,274,359,512)"
	
	$CMD_BASE -e "delete from Saimilho where fazendaProdutor_id in (177,249,274,359,512)"
	
	$CMD_BASE -e "delete from Servmilho where fazendaProdutor_id in (177,249,274,359,512)"
	
	$CMD_BASE -e "delete from FazendaProdutor where id in (177,249,274,359,512)"
	
	$CMD_BASE -e "delete from Produtor where id in (853,854,855,856,857)"
	
}

ARQ_LOG="$DIR_PROJETO/log/produtor.log"

rm -fv $ARQ_LOG

ler_arquivo_cliente
ler_arquivo_fazendas
