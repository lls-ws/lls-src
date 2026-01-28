#!/bin/bash
# Script to Set Maven Project Functions
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_project()
{
	
	ARTIFACT_ID="$1"

	PROJECT_NAMES=(
		"app"
		"web"
		"cafe"
		"milho"
		"balanca"
	)

	if [[ " ${PROJECT_NAMES[*]} " =~ " ${ARTIFACT_ID} " ]]; then
	
		if [ "${ARTIFACT_ID}" = "web" ]; then
		
			ARCHE_TYPE="maven-archetype-${ARTIFACT_ID}app"
			
		else
		
			ARCHE_TYPE="maven-archetype-quickstart"
		
		fi
		
		ARTIFACT_ID="lls-${ARTIFACT_ID}"
		
		echo "Project: ${ARTIFACT_ID}"
		echo "Group: ${GROUP_ID}"
		echo "ArcheType: ${ARCHE_TYPE}"
		
	else
	
		echo "Project not found!"
		echo "Run: $0 [${PROJECT_NAMES[@]}]"
		exit 1
	
	fi
	
}

maven_set_jar()
{
	
	VERSION=`cat ${ARTIFACT_ID}/pom.xml | grep '<version>' | head -1 | cut -f 2 -d '>' | cut -f 1 -d '<'`
	
	JAR_NAME="${ARTIFACT_ID}-${VERSION}.jar"
	
	FILE_JAR="target/${JAR_NAME}"
	
	echo "${FILE_JAR}"
	
}

maven_check()
{
	
	MAVEN_OPT="$1"
	
	maven_project "$2"
	
	MAVEN_CMD="$3"
	
	MAVEN_TYPE="$4"
	
	LOG_CMD="--log-file ${LOG_FILE}"
	
	if [ -z "$3" ]; then
	
		MAVEN_CMD="${LOG_CMD}"
		
		maven_${MAVEN_OPT} && maven_log_show
	
	else
	
		if [ -z "$4" ]; then
	
			if [ "$3" = "clean" ]; then
			
				MAVEN_CMD="${LOG_CMD}"
				
				MAVEN_TYPE="$3"
				
				maven_${MAVEN_OPT}_${MAVEN_TYPE} && maven_log_show
				
			else
			
				if [ "$1" = "open" ]; then
				
					maven_${MAVEN_OPT}
				
				else
				
					MAVEN_CMD="${LOG_CMD} ${MAVEN_CMD}"
					
					maven_${MAVEN_OPT}  && maven_log_show
				
				fi
			
			fi
		
		else
		
			maven_${MAVEN_OPT}_${MAVEN_TYPE} && maven_log_show
			
		fi
			
	fi
	
	if [ "$1" != "open" ]; then
	
		maven_log_edit
		
	fi
	
}

maven_open()
{
	
	geany $(find ${ARTIFACT_ID}/src/main/java/br/net/lls/ -type f -name "*.${MAVEN_CMD}")
	
}

TXT_EDIT="featherpad"
GROUP_ID="br.net.lls"
LOG_FILE="/tmp/mvn.log"
LOG_ERROR_FILE="/tmp/mvn_error.log"
LOG_PACKAGE_ERROR_FILE="/tmp/mvn_package_error.log"
