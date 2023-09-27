#!/bin/bash
# Biblioteca para definir arquivos, diretórios e funções
#
# email: lls.homeoffice@gmail.com

limpa_tabela()
{
	
	echo "Limpando a tabela: ${TABELA}"
	
	${CMD_BASE} -e "SET FOREIGN_KEY_CHECKS=0; truncate ${TABELA}; SET FOREIGN_KEY_CHECKS=1;"
	
	echo "Inserindo dados na tabela: ${TABELA}"
	
}

mostra_tabela()
{
	
	comando_sql
	
	$CMD_BASE -e "select count(*) from $TABELA;"
	
}

formata_string()
{
	
	str="$1"
	res=""
	
	split=`echo $str | sed -e 's/ /\n/g'` # Split with space as delimiter
	
	for word in $split; do
		word=${word,,} # Lowercase
		
		if [ "$word" != "e" -a "$word" != "sa" -a "$word" != "s/a" -a "$word" != "outros" -a "$word" != "outro" -a "$word" != "outra" -a "$word" != "de" -a "$word" != "da" -a "$word" != "do" -a "$word" != "dos" -a "$word" != "a" ]; then
			
			word=${word^} # Uppercase first letter
			
		fi
		
		res=$res$word" " # Concatenate result
	done
	
	echo "$res" | sed 's/\x27/\./g' | xargs
	
}

converte_data_sql()
{
	
	DATA_SQL="$1"
	
	echo "$DATA_SQL" | tr -d '\r' | awk -v FS=/ -v OFS=- '{print $3,$2,$1}'
	
}

testes()
{
	
	comando_sql
	
	# Mostrando os campos da tabela
	#$CMD_BASE -e "DESCRIBE Saimilho;"
	
	# Atualizando uma coluna da tabela
	#$CMD_BASE -e "update Saimilho set destino = obs;"
	#$CMD_BASE -e "select obs, destino from Saimilho where id = (select max(id)-50 from Saimilho);"
	
	# Excluindo uma coluna da tabela
	#$MD_BASE -e "ALTER TABLE Saimilho DROP COLUMN destino;"
	
	# Mostrando os campos da tabela
	#$CMD_BASE -e "DESCRIBE Saimilho;"
	
	#$CMD_BASE -e "SELECT id, nome FROM Empresa"
	
	#iconv -t utf-8 -c dataflex/TXT/FAZENDA.TXT | grep -A8 -i 746[[:space:]] | head -8
	
	#echo "Show lls database..."		   
	#${CMD_BASE} -e "SELECT @@character_set_database; \
					 #SHOW VARIABLES LIKE 'character_set_%'; \
					 #SHOW DATABASES; \
					 #SHOW TABLE STATUS;"
	
	#echo "Mostrando as colunas da tabela..."
	#${CMD_BASE} -e "SHOW FULL COLUMNS FROM FazendaProdutor;"
	
}

DIR_TXT="dataflex/TXT"

ARQ_MIGRA="$DIR_PROJETO/$DIR_TXT/MIGRA.TXT"

ARQ_LOG="$DIR_PROJETO/log/txt2sql_$NOME_PROJETO.log"

rm -fv $ARQ_LOG
