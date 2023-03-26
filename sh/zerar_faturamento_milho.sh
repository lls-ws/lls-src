#!/bin/bash
# Script para zerar os dados do ultimo faturamento do milho
#
# email: lls.homeoffice@gmail.com

show_baixamilho()
{
	
	echo "Mostrando Serviços Baixados após a data do Faturamento Errado: (Total = 4)"
	
	${CMD_BASE} -e "SELECT  baixaMilho.data AS DATA_PAGO, \
							servMilho.data AS DATA, \
							baixaMilho.valor AS VALOR \
								FROM Baixamilho baixaMilho \
									INNER JOIN Servmilho servMilho \
									ON servMilho.id = baixaMilho.servMilho_id \
									AND baixaMilho.data >= '"${DATA_FAT_ERRADO}"' \
									AND servMilho.data >= '"${DATA_FAT_ERRADO}"' \
										ORDER BY DATA_PAGO"

}

update_baixamilho()
{
	
	echo "Atualizando Serviços Baixados e Faturados Individualmente:"
	
	${CMD_BASE} -e "UPDATE Servmilho servMilho \
						INNER JOIN Baixamilho baixaMilho \
						ON servMilho.id = baixaMilho.servMilho_id \
							SET servMilho.data = (SELECT '"${DATA_FAT_ERRADO}"' - INTERVAL 1 DAY) \
								WHERE baixaMilho.data >= '"${DATA_FAT_ERRADO}"' \
								AND servMilho.data >= '"${DATA_FAT_ERRADO}"'"
								
	echo "Mostrando Serviços Baixados após a data do Faturamento Corrigidos: (Total = 4)"
	
	${CMD_BASE} -e "SELECT  baixaMilho.data AS DATA_PAGO, \
							servMilho.data AS DATA, \
							baixaMilho.valor AS VALOR \
								FROM Baixamilho baixaMilho \
									INNER JOIN Servmilho servMilho \
									ON servMilho.id = baixaMilho.servMilho_id \
									AND baixaMilho.data >= '"${DATA_FAT_ERRADO}"' \
									AND servMilho.data = (SELECT '"${DATA_FAT_ERRADO}"' - INTERVAL 1 DAY) \
										ORDER BY DATA_PAGO"
	
}

show_servmilho()
{
	
	echo "Mostrando o Total de Serviços Faturados com data Errada: (Total = 65)"
	
	${CMD_BASE} -e "SELECT COUNT(servMilho.data) AS TOTAL\
						FROM Servmilho servMilho \
							WHERE servMilho.data >= '"${DATA_FAT_ERRADO}"'"
	
}

delete_servmilho()
{
	
	echo "Excluindo Serviços Faturados com data Errada:"
	
	${CMD_BASE} -e "DELETE FROM Servmilho \
						WHERE data >= '"${DATA_FAT_ERRADO}"'"
						
	echo "Mostrando o Total de Serviços Faturados com data Errada: (Total = 0)"
	
	${CMD_BASE} -e "SELECT COUNT(servMilho.data) AS TOTAL\
						FROM Servmilho servMilho \
							WHERE servMilho.data >= '"${DATA_FAT_ERRADO}"'"
	
}

show_fatmilho()
{
	
	echo "Mostrando Faturamentos efetuados individualmente: (Total = 6)"
	
	${CMD_BASE} -e "SELECT COUNT(*) AS Individual, $TOTAL_FAT_INDIVIDUAL AS Total \
					FROM Fatmilho fatMilho \
						WHERE fatMilho.data > '"${DATA_FAT_ULTIMO}"' \
						AND fatMilho.data < '"${DATA_FAT_ERRADO}"'"
	
	echo "Mostrando Faturamentos efetuados mensalmente com data Errada: (Total = 31)"
	
	${CMD_BASE} -e "SELECT COUNT(*) AS Mensal, $TOTAL_FAT_MENSAL AS Total \
						FROM Fatmilho fatMilho \
							WHERE fatMilho.data >= '"${DATA_FAT_ERRADO}"'"

	echo "Mostrando Faturamentos baixados: (Total = 1)"

	${CMD_BASE} -e "SELECT 	produtor.nome AS PRODUTOR, \
							produtor.id AS ID_PRODUTOR, \
							fazendaProdutor.id AS ID_FAZENDA, \
							fazendaProdutor.nome AS FAZENDA, \
							servMilho.fazendaProdutor_id AS ID_FAZ \
						FROM Baixamilho baixaMilho \
							INNER JOIN Servmilho servMilho \
							ON servMilho.id = baixaMilho.servMilho_id \
							INNER JOIN FazendaProdutor fazendaProdutor \
							ON servMilho.fazendaProdutor_id = fazendaProdutor.id \
							INNER JOIN Produtor produtor \
							ON fazendaProdutor.produtor_id = produtor.id \
							AND baixaMilho.data >= '"${DATA_FAT_ERRADO}"' \
							AND servMilho.data = (SELECT '"${DATA_FAT_ERRADO}"' - INTERVAL 1 DAY) \
								GROUP BY ID_FAZ"

	echo "Mostrando IDs dos Faturamentos baixados: (Total = 1)"
							
	${CMD_BASE} -e "SELECT 	fatMilho.fazendaProdutor_id as ID, \
							fatMilho.data AS DATA, \
							fatMilho.total AS TOTAL \
						
						FROM Fatmilho fatMilho \
							
							LEFT JOIN ( \
										
								SELECT  servMilho.fazendaProdutor_id AS ID_FAZ, \
										baixaMilho.data AS DATA_PAGO, \
										servMilho.data AS DATA \
									FROM Baixamilho baixaMilho \
										INNER JOIN Servmilho servMilho \
										ON servMilho.id = baixaMilho.servMilho_id \
								
							) baixas \
							ON baixas.ID_FAZ = fatMilho.fazendaProdutor_id \
							WHERE fatMilho.data >= '"${DATA_FAT_ERRADO}"' \
							AND baixas.DATA_PAGO >= '"${DATA_FAT_ERRADO}"' \
							AND baixas.DATA = (SELECT '"${DATA_FAT_ERRADO}"' - INTERVAL 1 DAY) \
								GROUP BY ID"
	
}

update_fatmilho()
{
	
	echo "Atualizando Faturamentos Baixados efetuados Individualmente:"
	
	${CMD_BASE} -e "UPDATE Fatmilho fatMilho, \
						( \
						
							SELECT 	fatMilho.fazendaProdutor_id as ID, \
									fatMilho.data AS DATA \
								
								FROM Fatmilho fatMilho \
									
									LEFT JOIN ( \
												
										SELECT  servMilho.fazendaProdutor_id AS ID_FAZ, \
												baixaMilho.data AS DATA_PAGO, \
												servMilho.data AS DATA \
											FROM Baixamilho baixaMilho \
												INNER JOIN Servmilho servMilho \
												ON servMilho.id = baixaMilho.servMilho_id \
										
									) baixas \
									ON baixas.ID_FAZ = fatMilho.fazendaProdutor_id \
									WHERE fatMilho.data >= '"${DATA_FAT_ERRADO}"' \
									AND baixas.DATA_PAGO >= '"${DATA_FAT_ERRADO}"' \
									AND baixas.DATA = (SELECT '"${DATA_FAT_ERRADO}"' - INTERVAL 1 DAY) \
										GROUP BY ID \
						
						) AS Fatura \
						SET fatMilho.data = (SELECT '"${DATA_FAT_ERRADO}"' - INTERVAL 1 DAY) \
							WHERE fatMilho.data >= '"${DATA_FAT_ERRADO}"' \
							AND fatMilho.fazendaProdutor_id = Fatura.ID"
	
	let TOTAL_FAT_INDIVIDUAL++
	
	echo "Mostrando Faturamentos efetuados individualmente Corrigidos: (Total = 7)"
	
	${CMD_BASE} -e "SELECT fatMilho.data AS DATA \
						FROM Fatmilho fatMilho \
							WHERE fatMilho.data > '"${DATA_FAT_ULTIMO}"' \
							AND fatMilho.data < '"${DATA_FAT_ERRADO}"' \
								ORDER BY DATA"
	
}

delete_fatmilho()
{
	
	echo "Excluindo Faturamentos com data Errada:"
	
	${CMD_BASE} -e "DELETE FROM Fatmilho \
						WHERE data >= '"${DATA_FAT_ERRADO}"'"
						
	echo "Mostrando o Total de Faturamentos com data Errada: (Total = 0)"
	
	${CMD_BASE} -e "SELECT COUNT(fatMilho.data) AS TOTAL\
						FROM Fatmilho fatMilho \
							WHERE fatMilho.data >= '"${DATA_FAT_ERRADO}"'"
	
}

show_milho()
{
					
	echo "Mostrando Total de Fichas de Milho Faturadas: (Total = 246)"
	
	${CMD_BASE} -e "SELECT COUNT(milho.dataFaturamento) AS TOTAL \
						FROM Milho milho \
							WHERE milho.dataFaturamento >= '"${DATA_FAT_ERRADO}"'"
	
}

update_milho()
{

	echo "Atualizando Fichas de Milho Faturadas Erradas:"
	
	${CMD_BASE} -e "UPDATE Milho milho \
						SET milho.dataFaturamento = '"${DATA_FAT_ULTIMO}"'"
	
	echo "Atualizando Fichas de Milho Faturadas Individualmente:"
	
	${CMD_BASE} -e "UPDATE Milho milho, \
						( \
						
							SELECT 	fatMilho.fazendaProdutor_id as ID_FAZ, \
									fatMilho.data AS DATA \
								
								FROM Fatmilho fatMilho \
									
									WHERE fatMilho.data > '"${DATA_FAT_ULTIMO}"' 
										GROUP BY ID \
						
						) AS fatmilho \
						SET milho.dataFaturamento = fatmilho.data \
							WHERE milho.id = fatmilho.ID_FAZ"
	
	echo "Mostrando Fichas de Milho Faturadas Individualmente: (Total = 7)"
	
	${CMD_BASE} -e "SELECT milho.dataFaturamento AS DATA \
						FROM Milho milho \
							WHERE milho.dataFaturamento > '"${DATA_FAT_ULTIMO}"' \
							AND milho.dataFaturamento < '"${DATA_FAT_ERRADO}"' \
								ORDER BY DATA"
								
	echo "Mostrando Total de Fichas de Milho Faturadas Mensalmente Corrigidas: (Total = 239)"
	
	${CMD_BASE} -e "SELECT 	milho.dataFaturamento AS DATA, \
							COUNT(milho.dataFaturamento) AS TOTAL \
						FROM Milho milho \
							WHERE milho.dataFaturamento = '"${DATA_FAT_ULTIMO}"'"
	
}

show_empresa()
{
					
	echo "Mostrando a Data do Faturameto Mensal Errada: '"${DATA_FAT_ATUAL}"'"
	
	${CMD_BASE} -e "SELECT dataMilho AS DATA \
						FROM Empresa"

}

update_empresa()
{

	echo "Atualizando a Data do Faturameto Mensal Errada:"
	
	${CMD_BASE} -e "UPDATE Empresa empresa \
						SET empresa.dataMilho = '"${DATA_FAT_ULTIMO}"'"
						
	echo "Mostrando a Data do Faturameto Mensal Corrigida: '"${DATA_FAT_ULTIMO}"'"
	
	${CMD_BASE} -e "SELECT dataMilho AS DATA \
						FROM Empresa"
					

}

XML_FILE="/usr/share/tomcat/conf/tomcat-users.xml"

USER="`cat ${XML_FILE} | grep -i username | awk '{ print $2 }' | cut -f 2 -d '=' | cut -f 2 -d '"'`"
PASSWORD="`cat ${XML_FILE} | grep -i password | awk '{ print $3 }' | cut -f 2 -d '=' | cut -f 2 -d '"'`"
BD="bd_lls"
CMD="mysql -u ${USER} --password=${PASSWORD}"
BASE_OPT=$(echo "-D ${BD}")
CMD_BASE=$(echo "${CMD} ${BASE_OPT}")

DATA_FAT_ULTIMO="2021-04-30"
DATA_FAT_ERRADO="2021-05-26"
DATA_FAT_ATUAL="2021-05-30"

TOTAL_FAT_INDIVIDUAL="6"
TOTAL_FAT_MENSAL="31"

case "$1" in
	all)
		show_baixamilho
		update_baixamilho
		show_servmilho
		delete_servmilho
		show_fatmilho
		update_fatmilho
		delete_fatmilho
		show_milho
		update_milho
		show_empresa
		update_empresa
		;;
	baixamilho)
		show_baixamilho
		update_baixamilho
		;;
	servmilho)
		show_servmilho
		delete_servmilho
		;;
	fatmilho)
		show_fatmilho
		update_fatmilho
		delete_fatmilho
		;;
	milho)
		show_milho
		update_milho
		;;
	empresa)
		show_empresa
		update_empresa
		;;
	*)
		echo "Use: $(basename $0) [all|baixamilho|servmilho|fatmilho|milho|empresa]"
		exit 1
		;;
esac
