#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

defini_dirs()
{
	
	NOME_DIR=`echo $NOME_PROJETO | cut -f2 -d '-'`
	
	if [ "$NOME_DIR" = "core" -o "$NOME_DIR" = "lls" ]; then
	
		NOME_DIR="lls"
		
		if [ `hostname -a | awk '{print $1}'` = "dell" ]; then

			DIR_PROJETO="/mnt/windows/Projetos/funchal"
		
		else
		
			DIR_PROJETO="/home/${NOME_DIR}"
			
		fi
		
		DIR_CORE="${DIR_PROJETO}"
		
	else
	
		if [ `hostname -a | awk '{print $1}'` = "dell" ]; then

			DIR_CORE="/mnt/windows/Projetos/funchal"
			
			DIR_PROJETO="${DIR_CORE}/modulos/${NOME_DIR}"
		
		else
		
			DIR_CORE="/home/lls"
			
			DIR_PROJETO="${DIR_CORE}/modulos/${NOME_DIR}"
			
		fi
		
	fi
	
	if [ ! -d ${DIR_PROJETO} ]; then
	
		echo "Projeto nao encontrado! $DIR_PROJETO"
		
		exit 1;
	
	else
	
		if [ "$NOME_DIR" != "lls" -a "$NOME_DIR" != "milho" -a "$NOME_DIR" != "cafe" -a "$NOME_DIR" != "balanca" ]; then
		
			echo "Projeto nao permitido!"
		
			exit 1;
		
		fi
	
	fi
	
	NOME_CORE="lls-core"
	
	DIR_TOMCAT="/usr/share/tomcat/webapps/lls/WEB-INF/lib"
	
	DIR_WEB="$DIR_CORE/WEB-INF"
	
	DIR_CLASS="$DIR_WEB/classes"
	
	DIR_SRC="$DIR_PROJETO/src"
	
	URL_PACOTE="br/net/lls"
	
	DIR_LIB="$DIR_WEB/lib"
	
	DIR_META_INF="$DIR_SRC/META-INF"
	
	defini_libs
	
}

defini_libs()
{
	
	echo "${DIR_LIB}"
	
	VERSAO_SPRING="4.1.6.RELEASE.jar"
	
	ARQ_LIB="/usr/share/tomcat/lib/servlet-api.jar"
	ARQ_LIB+=":$DIR_LIB/javax.servlet.jsp.jstl-1.2.1.jar"
	ARQ_LIB+=":$DIR_LIB/validation-api-2.0.1.Final.jar"
	ARQ_LIB+=":$DIR_LIB/javax.persistence-2.0.5.jar"
	ARQ_LIB+=":$DIR_LIB/javax.json-1.0.2.jar"
	ARQ_LIB+=":$DIR_LIB/javax.mail.jar"
	ARQ_LIB+=":$DIR_LIB/spring-context-$VERSAO_SPRING"
	ARQ_LIB+=":$DIR_LIB/spring-core-$VERSAO_SPRING"
	ARQ_LIB+=":$DIR_LIB/spring-webmvc-$VERSAO_SPRING"
	ARQ_LIB+=":$DIR_LIB/spring-web-$VERSAO_SPRING"
	ARQ_LIB+=":$DIR_LIB/spring-beans-$VERSAO_SPRING"
	ARQ_LIB+=":$DIR_LIB/spring-tx-$VERSAO_SPRING"
	ARQ_LIB+=":$DIR_LIB/spring-security-core-4.0.3.RELEASE.jar"
	ARQ_LIB+=":$DIR_LIB/jackson-core-2.1.4.jar"
	ARQ_LIB+=":$DIR_LIB/jackson-databind-2.1.4.jar"
	ARQ_LIB+=":$DIR_LIB/json-20160810.jar"
	ARQ_LIB+=":$DIR_LIB/joda-time-2.4.jar"
	ARQ_LIB+=":$DIR_LIB/jasperreports-5.6.0.jar"
	ARQ_LIB+=":$DIR_LIB/commons-io-2.5.jar"
	ARQ_LIB+=":$DIR_LIB/commons-dbcp-1.2.jar"
	ARQ_LIB+=":$DIR_LIB/commons-lang-2.6.jar"
	ARQ_LIB+=":$DIR_LIB/hibernate-core-4.3.10.Final.jar"
	ARQ_LIB+=":$DIR_LIB/hibernate-validator-5.1.3.Final.jar"
	
	ARQ_CORE="$(basename "`verifica_arquivo_projeto "$NOME_CORE"`")"
	
	if [ "$NOME_DIR" = "lls" ]; then
		
		ARQ_PROJETO="$ARQ_CORE"
	
	else
	
		echo "Arquivo core: $ARQ_CORE"
		
		ARQ_LIB+=":$DIR_LIB/$ARQ_CORE"
		
		ARQ_PROJETO="$(basename "`verifica_arquivo_projeto "$NOME_PROJETO"`")"
		
		if [ "$NOME_DIR" = "balanca" ]; then
			
			ARQ_CAFE="$(basename "`verifica_arquivo_projeto "lls-cafe"`")"
			
			ARQ_LIB+=":$DIR_LIB/$ARQ_CAFE"
		
		fi
		
		if [ "$NOME_DIR" = "cafe" ]; then
			
			ARQ_BALANCA="$(basename "`verifica_arquivo_projeto "lls-balanca"`")"
			
			ARQ_LIB+=":$DIR_LIB/$ARQ_BALANCA"
			
		fi
		
	fi
	
	ARQ_ATUAL="$ARQ_PROJETO"
	
	ARQ=${ARQ_ATUAL%.jar}
	
    cria_versao
    
    ARQ_JAR="$NOME_PROJETO-$VERSAO_NOVA.jar"
	
	echo "Versao nova: $ARQ_JAR"
	
}

verifica_arquivo_projeto()
{
	
	NOME_ARQUIVO="$1"
	
	ARQUIVO="$(ls $DIR_LIB/$NOME_ARQUIVO-*.jar 2> /dev/null)"
	
	if [ -z "$ARQUIVO" ]; then
	
		ARQUIVO="$DIR_LIB/$NOME_ARQUIVO-0.0.0.jar"
		
		touch "$ARQUIVO"
		
	fi
	
	echo "$ARQUIVO"
	
}

cria_versao()
{
	   
    VERSAO=$(echo $ARQ | rev | cut -f 1 -d '-' | rev)
    
    DIG1=$(echo $VERSAO | cut -f1 -d .)
    DIG2=$(echo $VERSAO | cut -f2 -d .)
    DIG3=$(echo $VERSAO | cut -f3 -d .)
    
    DIG3=$(( $DIG3 + 1 ))
    
    if [ "$DIG3" = "10" ]; then
	
	DIG3=0
	DIG2=$(( $DIG2 + 1 ))
	
	if [ "$DIG2" = "10" ]; then
	
	    DIG2=0
	    DIG1=$(( $DIG1 + 1 ))
	fi
	
    fi
    
    VERSAO_NOVA=$DIG1.$DIG2.$DIG3    
	
}

compila_projeto()
{
	
	defini_dirs
	
	remove_dir_class
	
	cria_dir_class
	
	echo "Compilando...$NOME_PROJETO"
	
	javac -Xlint:unchecked -verbose -cp "$ARQ_LIB" -d "$DIR_CLASS" \
		$DIR_SRC/$URL_PACOTE/*/*.java \
		$DIR_SRC/$URL_PACOTE/*/*/*.java
	
	ERROS=$?
	
	if [ ${ERROS} -eq 0 ]; then
	
		echo "Compilado com sucesso!"
	
		cria_pacote_jar
		
		echo "Starting tomcat..."
		service tomcat start
	
	else
	
		exit 1;
	
	fi
	
}

cria_dir_class()
{
	
	echo "Criando o diretorio das classes..."
	
	mkdir -p $DIR_CLASS
	
}

remove_dir_class()
{
	
	echo "Verificando se existe o diretorio das classes..."
	
	if [ -d $DIR_CLASS ]; then

		echo "Removendo o diretorio das classes..."
		rm -rf $DIR_CLASS

	fi
	
}

cria_pacote_jar()
{
				
	DIR_JASPER="$DIR_CLASS/jasper"
	
	DIR_JRXML="$DIR_PROJETO/jrxml"
	
	if [ -d $DIR_JRXML ]; then
	
		mkdir -v $DIR_JASPER
		
		# Copiando o JASPER
		cp -fv $DIR_JRXML/*.jasper $DIR_JASPER
	
	fi
	
	# Criando o pacote jar
	( cd $DIR_CLASS ; jar cvf $ARQ_JAR br/* *)
	
	# Verificando se foi criado o arquivo jar
	if [ -f $DIR_CLASS/$ARQ_JAR ]; then
	
		# Movendo o arquivo criado para o diretorio das libs do java
		sudo chown -v tomcat.tomcat "$DIR_CLASS/$ARQ_JAR"
		
		sudo cp -fv "$DIR_CLASS/$ARQ_JAR" "$DIR_LIB"
		sudo cp -fv "$DIR_CLASS/$ARQ_JAR" "${DIR_TOMCAT}"
		sudo cp -fv "$DIR_CLASS/$ARQ_JAR" "${DIR_CORE}/.dist"
		sudo cp -fv "$DIR_CLASS/$ARQ_JAR" "${DIR_CORE}/.dist/current"
		
		remove_dir_class
		
		# Removendo o pacote antigo $ARQ_ATUAL
		sudo rm -fv $DIR_LIB/$ARQ_ATUAL
		sudo rm -fv $DIR_TOMCAT/$ARQ_ATUAL
		sudo rm -fv ${DIR_CORE}/.dist/current/$ARQ_ATUAL
		
		cria_dir_class
		
		# Alterar para novos modulos
		#sudo sh sh/spring_conf.sh
		
		sudo du -hsc ${DIR_CORE}/.dist/current/${ARQ_JAR} ${DIR_TOMCAT}/${ARQ_JAR}
		
	fi
			
}

cria_arquivo_war()
{
	
	defini_dirs
	
	ARQ_WAR="$NOME_PROJETO-$VERSAO.war"
	
	echo "Criando o arquivo $ARQ_WAR"
	
	(
		cd $DIR_CORE ;
		
		jar -cvf $ARQ_WAR css/*.css css/images fonts/ imagens/ js/*.js js/jquery-lls/*.js style/ WEB-INF/ 
		
	)
	
	rm -fv $DIR_CORE/.dist/current/*.war
	
	cp -fv $DIR_CORE/$ARQ_WAR $DIR_CORE/.dist/$ARQ_WAR
	cp -fv $DIR_CORE/$ARQ_WAR $DIR_CORE/.dist/current/$ARQ_WAR
	
	rm -fv $DIR_CORE/$ARQ_WAR
	
	du -hsc $DIR_CORE/.dist/current/$ARQ_WAR
	
}

cria_link()
{
	
	defini_dirs
	
	DIR_SH="${DIR_PROJETO}/sh"
	
	CMD_JAVA="${DIR_SH}/compila_java.sh"
	CMD_LINK="/usr/bin/compila_java"
	
	rm -fv ${CMD_LINK} 2> /dev/null
	chmod +x -v ${CMD_JAVA}
	ln -sv ${CMD_JAVA} ${CMD_LINK}

}

libs_install()
{
	
	echo "Stopping tomcat..."
	sudo service tomcat stop
	
	defini_dirs
	
	NOME_TAR="$(basename $(ls .dist/current/lls-libjar-*.tar.gz))"
	
	echo "File: ${NOME_TAR}"
	echo "Libs: ${DIR_LIB}"
	
	ARQ_TAR="${NOME_TAR}"
	
	if [ -d ${DIR_LIB} ]; then
	
		echo "Removing old libs..."
		sudo rm -rf ${DIR_LIB}
	
	fi
	
	echo "Installing new libs..."
	sudo mkdir -v ${DIR_LIB}
	
	sudo tar -xvf ${DIR_PROJETO}/.dist/current/${ARQ_TAR} -C ${DIR_WEB}
	
	FILE_JAR="${DIR_WEB}/lib/*.jar"
	
	echo "Setting permissions..."
	sudo chown -Rv tomcat.tomcat ${FILE_JAR}
	
	sudo ls -al ${FILE_JAR}
	
	echo "Starting tomcat..."
	sudo service tomcat start
	
}
