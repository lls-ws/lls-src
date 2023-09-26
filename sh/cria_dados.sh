#!/bin/bash
# Script para criar dados nas tabelas do banco de dados bd_lls
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="lls"

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. lib_config.sh					|| exit 1

apaga_tabelas()
{
	
	echo "Apagando as tabelas da base de dados: bd_lls"

	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; 	\
		drop table Preco; 					\
		drop table Produtor; 				\
		drop table FazendaProdutor; 		\
		drop table TelefoneProdutor; 		\
		SET FOREIGN_KEY_CHECKS=1;			\
		show tables;"
	
}

limpa_tabelas_produtor()
{
	
	echo "Limpando os dados das tabelas de cadastro do ${TABELA}..."
	
	$CMD_BASE -e "SET FOREIGN_KEY_CHECKS=0; \
		TRUNCATE ${TABELA}; \
		TRUNCATE Fazenda${TABELA}; \
		TRUNCATE Telefone${TABELA}; \
		SET FOREIGN_KEY_CHECKS=1; \
		SHOW TABLES;"
	
}

inserir_produtores()
{

	TABELA="Produtor"
	
	limpa_tabelas_produtor
	
	echo "Inserindo dados na tabela: $TABELA"

	max=50
	
	for i in `seq 1 $max`
	do
		
		cpfcnpj="34558487000144"
		
		if [ $i -lt 10 ]; then
		
			i="0$i"
			
			nome="Agropecuaria_$i"
			
		elif [ $i -lt 40 ]; then
		
			if [ $i -lt 20 ]; then
			
				nome="Cooperativa_$i"
				
			elif [ $i -lt 30 ]; then
			
				nome="Empresa_$i"
			
			else
				
				nome="Exportadora_$i"
			
			fi
		else
		
			nome=$TABELA"_"$i
			
			cpfcnpj="03531428675"
			
		fi
		
		echo "Inserindo o $TABELA: $nome"
		
		endereco="Rua $i"
		bairro="Bairro $i"
		cidade="Cidade $i"
		estado="MG"
		cep="38408370"
		email="$(echo "$nome" | tr '[:upper:]' '[:lower:]')@email.com"
		site="www.$(echo "$nome" | tr '[:upper:]' '[:lower:]').com"
		cpfcnpj=$cpfcnpj
		observacao="Teste do $nome"
		
		$CMD_BASE -e "insert into $TABELA \
			(id, nome, endereco, bairro, cidade, estado, cep, email, site, cpfcnpj, observacao) \
			values (null, '$nome', '$endereco', '$bairro', '$cidade', '$estado', '$cep', '$email', '$site', '$cpfcnpj', '$observacao')"
		
		ID_PRODUTOR=`$CMD_BASE -e "SELECT id FROM $TABELA ORDER BY id DESC LIMIT 1" "bd_lls" "-N" "-B"`
		
		inserir_fazendas "$ID_PRODUTOR" "$nome" "$TABELA"
		
		inserir_telefones "$ID_PRODUTOR" "$nome" "$TABELA"
		
	done

	echo "Total de Produtores: `$CMD_BASE -e "select count(*) from Produtor" "bd_lls" "-N" "-B"` \
		Total de Fazendas: `$CMD_BASE -e "select count(*) from FazendaProdutor" "bd_lls" "-N" "-B"` \
		Total de Telefones: `$CMD_BASE -e "select count(*) from TelefoneProdutor" "bd_lls" "-N" "-B"`"
	
}

inserir_fazendas()
{
	
	ID_PRODUTOR="$1"
	
	NOME_PRODUTOR="$2"
	
	TABELA_FAZENDA="Fazenda"$3

	echo "Inserindo dados na tabela: $TABELA_FAZENDA"

	max_faz=3
	
	for j in `seq 1 $max_faz`
	do
		
		if [ $j -lt 1 ]; then
		
			j="00$j"
			
			cpfcnpj="03531428675"
			
		fi
		
		if [ $j -lt 100 ]; then
		
			j="0$j"
			
			cpfcnpj="10216327000159"
			
		fi
		
		nomeFazenda="Fazenda $NOME_PRODUTOR $j"
		enderecoFazenda="Rua da Fazenda $NOME_PRODUTOR $j"
		bairroFazenda="Bairro da Fazenda $NOME_PRODUTOR $j"
		cidadeFazenda="Cidade da Fazenda $NOME_PRODUTOR $j"
		estadoFazenda="MG"
		cepFazenda="${cep}"
		cpfcnpjFazenda=$cpfcnpj
		ieFazenda="1111-2222/3333"
		
		echo "Inserindo a $TABELA_FAZENDA: $nomeFazenda"
		
		$CMD_BASE -e "insert into $TABELA_FAZENDA \
			(id, nome, endereco, bairro, cidade, estado, cep, cpfcnpj, ie, produtor_id) \
			values (null, '$nomeFazenda', '$enderecoFazenda', '$bairroFazenda', '$cidadeFazenda', '$estadoFazenda', '$cepFazenda', '$cpfcnpjFazenda', '$ieFazenda', '$ID_PRODUTOR')"
		
	done

}

inserir_telefones()
{
	
	ID_PRODUTOR="$1"
	
	NOME_PRODUTOR="$2"
	
	TABELA_TELEFONE="Telefone"$3

	echo "Inserindo dados na tabela: $TABELA_TELEFONE"

	max_tel=2
	
	for j in `seq 1 $max_tel`
	do
		
		if [ $j -le 1 ]; then
		
			numeroTelefone="3432346225"
			contatoTelefone="Contato $NOME_PRODUTOR 0$j"
			tipoTelefone="FIXO"
			operadoraTelefone=null
		
			echo "Inserindo a $TABELA_TELEFONE: $numeroTelefone"
			
			$CMD_BASE -e "insert into $TABELA_TELEFONE \
				(id, numero, responsavel, tipo, operadora, produtor_id) \
				values (null, '$numeroTelefone', '$contatoTelefone', '$tipoTelefone', \
					$operadoraTelefone, '$ID_PRODUTOR')"
			
			
		else 
			
			numeroTelefone="34999837314"
			contatoTelefone="Contato $NOME_PRODUTOR 0$j"
			tipoTelefone="CELULAR"
			operadoraTelefone="OI"
			
			echo "Inserindo a $TABELA_TELEFONE: $numeroTelefone"
			
			$CMD_BASE -e "insert into $TABELA_TELEFONE \
				(id, numero, responsavel, tipo, operadora, produtor_id) \
				values (null, '$numeroTelefone', '$contatoTelefone', '$tipoTelefone', \
					'$operadoraTelefone', '$ID_PRODUTOR')"
			
		fi
		
	done

}

inserir_peneiras()
{
	
	TABELA="Peneira"
	
	limpa_tabela
	
	${CMD_BASE} -e "INSERT INTO $TABELA VALUES (1,'Bc'),(2,'Escolha'),(3,'Fundo'),(4,'P-18'),(5,'P-17'),(6,'P-19'),(7,'P-16'),(8,'P-15'),(9,'P-17/18'),(10,'Palha'),(11,'Estrela'),(12,'P-13/16'),(13,'Mk'),(14,'P-12'),(15,'P/13 Abx'),(16,'Escolha Moreira'),(17,'P-14/17'),(18,'Cabeca'),(19,'Escolha Eletronica'),(20,'Cafe Coco'),(21,'P-14/16'),(22,'P-15/16'),(23,'Res/eletr'),(24,'P-14/19'),(25,'P-14/18'),(26,'P-16/18'),(27,'17/18/dec'),(28,'Esc Mesa'),(29,'Esc.decim'),(30,'P-13/18'),(31,'13/14'),(32,'Res. Mesa'),(33,'Rez.17/18'),(34,'14/15'),(35,'P13/15 Mk'),(36,'P-14/15'),(37,'P-14/15'),(38,'Rez/cd'),(39,'P-14'),(40,'P-13'),(41,'Rez-14/16'),(42,'P-16/19'),(43,'Residuo'),(44,'P-15/18'),(45,'14/15/mk'),(46,'Cd'),(47,'15/17'); select * from $TABELA"
	
}

inserir_precos()
{
	
	TABELA="Preco"
	
	limpa_tabela
	
	${CMD_BASE} -e "INSERT INTO $TABELA VALUES (1,'Rebeneficio Completo',8.90),(4,'Saida Cafe Granel',3.10),(5,'Beneficio de Cafe',12.50),(6,'Hora de Secador',90.00),(8,'Saida Caf Big Bag/base 60 Kgs',1.95),(9,'Virao/emb. a Granel',3.10),(10,'Liga Simples',3.70),(11,'Ensaque e Sac',7.50),(12,'Classif.peneiras/ventilacao',6.50),(13,'Beneficio Cafe Sac',16.30),(14,'Entrada Cafe Granel Base/60kgs',1.95),(15,'Envio de Amostras',50.00),(16,'Armazenagem  Cafe',1.00),(17,'Carga a Granel',3.10),(18,'Descarga Cafe Ensacado',1.30),(19,'Carga Cafe Ensacado',1.30),(20,'Armazenagem Milho',7.50),(21,'Limpeza Milho',3.25),(22,'Secagem Milho',0.00),(23,'Recepcao Milho',3.10),(24,'Carga Milho',3.10),(25,'Carga Caf Ensacado',1.30),(26,'Entrada Cafe Big/bag-base60kgs',1.95),(27,'Emisso Rec.de Deposito',50.00),(28,'Classificacao Peneiras',3.90),(29,'Ensaque',3.70),(30,'Liga Simples/viracao',3.70),(31,'Saida Cafe Ensacado P/granel',3.10),(32,'Rebeneficio/ventilacao',3.90),(33,'Ventilacao/catacao Eletronica',6.90),(34,'Remocao',2.50); select * from $TABELA"
	
}

inserir_umidades()
{
	
	TABELA="Umidade"
	
	limpa_tabela
	
	${CMD_BASE} -e "INSERT INTO $TABELA VALUES (1,13.10,0.00,0.00),(2,13.70,0.00,0.00),(3,13.20,0.00,0.00),(4,13.30,0.00,0.00),(5,13.40,0.00,0.00),(6,13.50,0.00,0.00),(7,13.60,0.00,0.00),(8,13.80,0.00,5.40),(9,13.90,0.00,5.40),(10,14.00,1.20,5.40),(11,20.00,8.40,20.70),(12,22.80,11.76,26.34),(13,24.20,13.44,30.98),(14,14.10,1.32,5.72),(15,14.20,1.44,5.72),(16,14.50,1.80,9.25),(17,14.40,1.68,5.72),(18,14.60,1.92,11.45),(19,14.70,2.04,11.45),(20,14.80,2.16,11.45),(21,14.90,2.28,11.45),(22,15.00,2.40,11.45),(23,15.10,2.52,11.67),(24,15.20,2.64,11.67),(25,15.30,2.76,11.67),(26,15.40,2.88,11.67),(27,15.50,3.00,11.67),(28,15.60,3.12,11.99),(29,15.70,3.24,11.99),(30,15.80,3.36,11.99),(31,15.90,3.48,11.99),(32,16.00,3.60,11.99),(33,16.10,3.72,14.76),(34,16.20,3.84,14.36),(35,16.30,3.96,14.36),(36,16.40,4.08,14.36),(37,16.50,4.20,14.36),(38,16.60,4.32,14.76),(39,16.70,4.44,14.76),(40,16.80,4.56,14.76),(41,16.90,4.68,14.76),(42,17.00,4.80,14.76),(43,17.10,4.92,15.90),(44,17.20,5.04,15.90),(45,17.30,5.16,15.90),(46,17.40,5.28,15.90),(47,17.50,5.40,15.90),(48,17.60,5.52,18.16),(49,17.70,5.64,18.16),(50,17.80,5.76,18.16),(51,17.90,5.88,18.16),(52,18.00,6.00,18.16),(53,18.10,6.12,18.94),(54,18.20,6.24,18.94),(55,18.30,6.36,18.94),(56,18.40,6.48,18.94),(57,18.50,6.60,18.94),(58,18.60,6.72,19.67),(59,18.70,6.84,19.67),(60,18.80,6.96,19.67),(61,18.90,7.08,19.67),(62,19.00,7.20,19.67),(63,19.10,7.32,19.90),(64,19.20,7.44,19.90),(65,19.30,7.56,19.90),(66,19.40,7.68,19.90),(67,19.50,7.80,19.90),(68,19.60,7.92,20.70),(69,19.70,8.04,20.70),(70,19.80,8.16,20.70),(71,19.90,8.28,20.70),(72,20.10,8.52,21.70),(73,20.20,8.64,21.70),(74,20.30,8.76,21.70),(75,20.40,8.88,21.70),(76,20.50,9.00,21.70),(77,20.60,9.12,22.59),(78,20.70,9.24,22.59),(79,20.80,9.36,22.59),(80,20.90,9.48,22.59),(81,21.00,9.60,22.59),(82,21.10,9.72,23.67),(83,21.20,9.84,23.67),(84,21.30,9.96,23.67),(85,21.40,10.08,23.67),(86,21.50,10.20,23.67),(87,21.60,10.32,25.26),(88,21.70,10.44,25.26),(89,21.80,10.56,25.26),(90,21.90,10.68,25.26),(91,22.00,10.80,25.26),(92,22.10,10.92,25.79),(93,22.20,11.04,25.79),(94,22.30,11.16,25.79),(95,22.40,11.28,25.79),(96,22.50,11.40,25.79),(97,22.60,11.52,26.34),(98,22.70,11.64,26.34),(99,22.90,11.88,26.34),(100,23.00,12.00,26.34),(101,23.10,12.12,27.89),(102,23.20,12.24,27.89),(103,23.30,12.36,27.89),(104,23.40,12.48,27.89),(105,23.50,12.60,27.89),(106,23.60,12.72,29.00),(107,23.70,12.84,29.00),(108,23.80,12.96,29.00),(109,23.90,13.08,29.00),(110,24.00,13.20,29.00),(111,24.10,13.32,30.98),(112,24.30,13.56,30.98),(113,24.40,13.68,30.98),(114,24.50,13.80,30.98),(115,24.60,13.92,31.64),(116,24.70,14.04,31.64),(117,24.80,14.16,31.64),(118,24.90,14.28,31.64),(119,25.00,14.40,31.64),(120,25.10,14.52,33.32),(121,25.20,14.64,33.32),(122,25.30,14.76,33.32),(123,25.40,14.88,33.32),(124,25.50,15.00,33.32),(125,25.60,15.12,34.86),(126,25.70,15.24,34.86),(127,25.80,15.36,34.86),(128,25.90,15.48,34.86),(129,26.00,15.60,34.86),(130,26.10,15.72,35.85),(131,26.20,15.84,35.85),(132,26.30,15.96,35.85),(133,26.40,16.08,35.85),(134,26.50,16.20,35.85),(135,26.60,16.32,38.50),(136,26.70,16.44,38.50),(137,26.80,16.56,38.50),(138,26.90,16.68,38.50),(139,27.00,16.80,38.50),(140,27.10,16.92,40.85),(141,27.20,17.04,40.85),(142,27.30,17.16,40.85),(143,27.40,17.28,40.85),(144,27.50,17.40,40.85),(145,27.60,17.52,42.73),(146,27.70,17.64,42.73),(147,27.80,17.76,42.73),(148,27.90,17.88,42.73),(149,28.00,18.00,42.73),(150,28.10,18.12,43.50),(151,28.20,18.24,43.50),(152,28.30,18.36,43.50),(153,28.40,18.48,43.50),(154,28.50,18.60,43.50),(155,28.60,18.72,44.50),(156,28.70,18.84,44.50),(157,28.80,18.96,44.50),(158,28.90,19.08,44.50),(159,29.00,19.20,44.50),(160,29.10,19.32,46.29),(161,29.20,19.44,46.29),(162,29.30,19.56,46.29),(163,29.40,19.68,46.29),(164,29.50,19.80,46.29),(165,29.60,19.92,47.29),(166,29.70,20.04,47.29),(167,29.80,20.16,47.29),(168,29.90,20.28,47.29),(169,30.00,20.40,47.29),(170,30.10,20.52,48.29),(171,30.20,20.64,48.29),(172,30.30,20.76,48.29),(173,30.40,20.88,48.29),(174,30.50,21.00,48.29),(175,30.60,21.12,49.50),(176,30.70,21.24,49.50),(177,30.80,21.36,49.50),(178,30.90,21.48,49.50),(179,31.00,21.60,49.50),(180,31.10,21.72,50.50),(181,31.20,21.84,50.50),(182,31.30,21.96,50.50),(183,31.40,22.08,50.50),(184,31.50,22.20,50.50),(185,31.60,22.32,52.40),(186,31.70,22.44,52.40),(187,31.80,22.56,52.40),(188,31.90,22.68,52.40),(189,32.00,22.80,52.40),(190,32.10,22.92,54.00),(191,32.20,23.04,54.00),(192,32.30,23.16,54.00),(193,32.40,23.28,54.00),(194,32.50,23.40,54.00),(195,32.60,23.52,57.18),(196,32.70,23.64,57.18),(197,32.80,23.76,57.18),(198,32.90,23.88,57.18),(199,33.00,24.00,57.18),(200,33.10,24.12,58.35),(201,33.20,24.24,58.35),(202,33.30,24.36,58.35),(203,33.40,24.48,58.35),(204,33.50,24.60,58.35),(205,33.60,24.72,64.65),(206,33.70,24.84,64.65),(207,33.80,24.96,64.65),(208,33.90,25.08,64.65),(209,34.00,25.20,64.65),(210,34.10,25.32,73.30),(211,34.20,25.44,73.30),(212,34.30,25.56,73.30),(213,34.40,25.68,73.30),(214,34.50,25.80,73.30),(215,34.60,25.92,78.00),(216,34.70,26.04,78.00),(217,34.80,26.16,78.00),(218,34.90,26.28,78.00),(219,35.00,26.40,78.00),(220,35.10,26.52,92.27),(221,35.20,26.64,92.27),(222,35.30,26.76,92.27),(223,35.40,26.88,92.27),(224,35.50,27.00,92.27),(225,35.60,27.12,98.20),(226,35.70,27.24,98.20),(227,35.80,27.36,98.20),(228,35.90,27.48,98.20),(229,36.00,27.60,98.20),(230,36.10,27.72,98.27),(231,36.20,27.84,98.27),(232,36.30,27.96,98.27),(233,36.40,28.08,98.27),(234,36.60,28.32,114.30),(235,36.70,28.44,114.30),(236,36.80,28.56,114.30),(237,36.90,28.68,114.30),(238,37.00,28.92,114.30),(239,40.00,32.40,138.14),(240,14.30,1.56,5.72),(241,38.00,30.00,135.00),(242,37.10,28.92,132.90),(243,37.20,29.04,132.90),(244,37.30,29.16,132.90),(245,37.40,29.28,132.90),(246,37.50,29.42,132.90),(247,37.60,29.52,135.00),(248,37.70,29.64,135.00),(249,37.80,29.76,135.00),(250,37.90,29.88,135.00),(251,36.50,28.20,98.27),(252,39.50,31.50,138.14); select * from $TABELA"
	
}

inserir_guias()
{
	
	TABELA="Guia"
	
	limpa_tabela
	
	${CMD_BASE} -e "INSERT INTO $TABELA VALUES (1,0),(2,0),(3,0),(4,0); select * from $TABELA"
	
}

inserir_laudo()
{
	
	TABELA="Laudo"
	
	limpa_tabela
	
	${CMD_BASE} -e "INSERT INTO $TABELA VALUES (1,1); select * from $TABELA"
	
}

inserir_ticket()
{
	
	TABELA="Ticket"
	
	limpa_tabela
	
	${CMD_BASE} -e "INSERT INTO $TABELA VALUES (1,0); select * from $TABELA"
	
}

mostra_tabela()
{
	
	#if [ "${TABELA}" = "Usuario" ]; then
	
	#	echo "Atualizado empresa dos usuarios..."
	#	${CMD_BASE} -e "UPDATE $TABELA SET empresa_id = 1"
	
	#fi
	
	${CMD_BASE} -e "SELECT * FROM $TABELA"
	
}

inserir_usuario()
{
	
	TABELA="Usuario"
	
	limpa_tabela
	
	EMAILS=("lls.homeoffice@gmail.com")
	
	for EMAIL in "${EMAILS[@]}"
	do
		
		${CMD_BASE} -e "insert into $TABELA \
			(email, senha, data) value ('${EMAIL}', '111111', '$(date "+%Y-%m-%d")');"
		
	done
	
	mostra_tabela
	
}

OPCAO="$1"

case "$OPCAO" in
	all)
		inserir_usuario
		#sh sh/txt2sql.sh "empresa"
		inserir_produtores
		inserir_peneiras
		inserir_precos
		inserir_umidades
		inserir_guias
		inserir_laudo
		inserir_ticket
		;; 
	usuario)
		inserir_usuario
		;;
	empresa)
		#sh sh/txt2sql.sh "${OPCAO}"
		mostra_tabela "Empresa"
		;;
	produtor)
		inserir_produtores
		;;
	peneira)
		inserir_peneiras
		;;
	preco)
		inserir_precos
		;;
	umidade)
		inserir_umidades
		;;
	guia)
		inserir_guias
		;;
	laudo)
		inserir_laudo
		;;
	ticket)
		inserir_ticket
		;;
	*)
		echo "Use: $(basename $0) [all|usuario|empresa|preco|produtor|peneira|preco|umidade|guia|laudo|ticket]"
		exit 1
		;;
esac
