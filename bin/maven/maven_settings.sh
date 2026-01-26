#!/bin/bash
# Script to Set Maven Directories and Files Patch
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

check_id()
{
	
	ARTIFACT_ID="$1"
	GROUP_ID="$2"

	PROJECT_NAMES=(
		"app"
		"web"
		"cafe"
		"milho"
		"balanca"
	)

	if [[ " ${PROJECT_NAMES[*]} " =~ " ${ARTIFACT_ID} " ]]; then
	
		if [ -z "${GROUP_ID}" ]; then
		
			GROUP_ID="br.net.lls"
		
		fi
		
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

set_jar()
{
	
	VERSION=`cat ${ARTIFACT_ID}/pom.xml | grep '<version>' | head -1 | cut -f 2 -d '>' | cut -f 1 -d '<'`
	
	JAR_NAME="${ARTIFACT_ID}-${VERSION}.jar"
	
	FILE_JAR="target/${JAR_NAME}"
	
	echo "${FILE_JAR}"
	
}

maven_check()
{
	
	MAVEN_OPT="$1"
	
	check_id "$2"
	
	if [ -z "$3" ]; then
	
		maven_${MAVEN_OPT}
		
	else
	
		maven_clean_${MAVEN_OPT}
	
	fi
	
}
