#!/bin/bash
# Script com os metodos utilizados pelos relatorios de cafe
#
# email: lls.homeoffice@gmail.com

setCondicaoProdutor()
{
	
	if [ ${PRODUTOR_ID} -gt 0 ]; then
	
		CONDICAO_PRODUTOR="AND fazendaProdutor.produtor_id = ${PRODUTOR_ID} "
	
	else
	
		if [ ${FAZENDA_ID} -gt 0 ]; then
	
			CONDICAO_PRODUTOR="AND fazendaProdutor.id = ${FAZENDA_ID} "
		
		else
		
			CONDICAO_PRODUTOR=""
		
		fi
	
	fi
	
}

setCondicaoConsulta()
{
	
	TABELA="$1"
	
	TABELA_MIN=$(echo "${TABELA}" | tr '[:upper:]' '[:lower:]')
	
	# 0 = Dados | 1 = Totais
	TOTAL_CONSULTA="$2"
	
	# 0 = Lotes | 1 = Despejos
	TIPO_CONSULTA="$3"
	
	CONDICAO_FAZENDA="fazendaProdutor_id "
	
	CONDICAO_GROUP="GROUP BY id "
	
	if [ ${TIPO_CONSULTA} -eq 0 ]; then
		
		if [ ${COUNT} -eq 0 ]; then
	
			CONDICAO_STATUS="fechado = 'Y' "
		
		else
		
			CONDICAO_STATUS="status = 'FECHADA' "
			
			if [ ${COUNT} -eq 2 ]; then
	
				CONDICAO_FAZENDA="fazendaDestino_id "
			
			fi
		
		fi
	
	else
		
		if [ ${TOTAL_CONSULTA} -eq 1 ]; then
		
			CONDICAO_GROUP=""
			
		fi
		
		CONDICAO_STATUS="status != 'FECHADA' "
	
	fi
	
}

setCondicaoLote()
{
	
	# 0 = Abertos | 1 = Fechados | 2 = Todos
	TIPO_LOTE="$1"
	
	CONDICAO_SALDO=""
	
	case ${TIPO_LOTE} in
		0)
			CONDICAO_SALDO="AND lote.saldoSacas > 0"
			;; 
		1)
			CONDICAO_SALDO="AND lote.saldoSacas = 0 "
			;;
	esac
	
}

NOME_PROJETO="cafe"

PRODUTOR_ID=0
FAZENDA_ID=0

# Funchal
FAZENDA_ID=864

# Elena Mieco Fukuda 2 fazendas
#PRODUTOR_ID="366"
#FAZENDA_ID="430" # Fazenda Lote 65-padap-
#FAZENDA_ID="963" # Fazenda Vitoria

# 0 = Abertos | 1 = Fechados | 2 = Todos
TIPO_LOTE="$1"

if [ -z "${TIPO_LOTE}" ]; then

	TIPO_LOTE=0

fi
