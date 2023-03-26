#!/bin/bash
# Script para verificar a integridade das entradas, saidas e servicos de milho
#
# email: lls.homeoffice@gmail.com

verifica_integridade()
{

	TABELA="$1"
	
	comando_sql "SELECT COUNT(id) AS $TABELA \
					FROM $TABELA \
						WHERE fazendaProdutor_id not in (SELECT id FROM Milho)"

	comando_sql "SELECT COUNT(id) AS $TABELA \
					FROM $TABELA \
						WHERE fazendaProdutor_id in (SELECT id FROM Milho)"

	comando_sql "SELECT COUNT(id) AS $TABELA FROM $TABELA"

}

apaga_inconsistentes()
{

	TABELA="$1"
	
	echo "Apagando dados inconsistentes $TABELA"
	
	comando_sql "DELETE FROM $TABELA WHERE fazendaProdutor_id not in (SELECT id FROM Milho)"
	
}

TABELAS=(
	"Entmilho"
	"Saimilho"
	"Servmilho"
)

for TABELA in "${TABELAS[@]}"
do
	
	verifica_integridade "$TABELA"

	apaga_inconsistentes "$TABELA"

	verifica_integridade "$TABELA"
	
done
