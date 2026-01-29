#!/bin/bash
# Script to Set Maven Project Functions
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_project()
{
	
	maven_log_remove
	
	ARTIFACT_ID="$1"

	PROJECT_NAMES=(
		"web"
		"core"
		"cafe"
		"milho"
		"balanca"
	)

	if [[ " ${PROJECT_NAMES[*]} " =~ " ${ARTIFACT_ID} " ]]; then
	
		if [ "${ARTIFACT_ID}" = "web" ]; then
		
			ARCHE_TYPE="maven-archetype-${ARTIFACT_ID}app"
			FILE_EXT="war"
			
		else
		
			ARCHE_TYPE="maven-archetype-quickstart"
			FILE_EXT="jar"
		
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
	
	if [[ "${FILE_EXT}" == "war" && "${MAVEN_OPT}" != "install" ]]; then
	
		VERSION=""
		JAR_NAME="${ARTIFACT_ID}.${FILE_EXT}"
	
	else
	
		VERSION=`cat ${ARTIFACT_ID}/pom.xml | grep '<version>' | head -1 | cut -f 2 -d '>' | cut -f 1 -d '<'`
		JAR_NAME="${ARTIFACT_ID}-${VERSION}.${FILE_EXT}"
		
	fi
	
	FILE_JAR="target/${JAR_NAME}"
	
	echo "${FILE_JAR}"
	
}

maven_check()
{
	
	MAVEN_OPT="$1"
	
	maven_project "$2"
	
	MAVEN_CMD="$3"
	
	MAVEN_TYPE="$4"
	
	if [ -z "$3" ]; then
	
		MAVEN_CMD="${LOG_CMD}"
		
		maven_${MAVEN_OPT} && maven_log_show
	
	else
	
		if [ -z "$4" ]; then
	
			case "$3" in
				clean|install|clean_install|show|jetty)
				
					MAVEN_CMD="${LOG_CMD}"
					
					MAVEN_TYPE="$3"
					
					maven_${MAVEN_OPT}_${MAVEN_TYPE} && maven_log_show
					;;
				*)
					if [ "$1" = "open" ]; then
					
						maven_${MAVEN_OPT}
					
					else
					
						MAVEN_CMD="${LOG_CMD} ${MAVEN_CMD}"
						
						if [ "${MAVEN_OPT}" = "compile" ]; then
						
							maven_${MAVEN_OPT}
							
						else
						
							maven_${MAVEN_OPT}  && maven_log_show
						
						fi
					
					fi
					;;
			esac
			
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

maven_set_repo_jar()
{
	
	FILE_REPO=~/${DIR_REPO}/`echo ${GROUP_ID} | sed 's#\.#/#g'`/${ARTIFACT_ID}/${VERSION}/${JAR_NAME}
	
	echo "${FILE_REPO}"
	
}

maven_repository_remove()
{
	
	du -hsc ~/${DIR_MAVEN}/*
	
	echo "Removing Local Repository..."
	rm -rf ~/${DIR_REPO}
	
	ls -alh ~/${DIR_MAVEN}
	
}

maven_run()
{
	
	echo -e "mvn ${MAVEN_CMD} ${MAVEN_TYPE} ${MAVEN_OPT}\n"
	
	(cd ${ARTIFACT_ID}; mvn ${MAVEN_CMD} ${MAVEN_TYPE} ${MAVEN_OPT})
	
}

DIR_MAVEN=".m2"
DIR_REPO="${DIR_MAVEN}/repository"
TXT_EDIT="featherpad"
GROUP_ID="br.net.lls"
LOG_FILE="/tmp/mvn.log"
LOG_ERROR_FILE="/tmp/mvn_error.log"
LOG_PACKAGE_ERROR_FILE="/tmp/mvn_package_error.log"
CMD_SKIP="-DskipTests"
LOG_CMD="--log-file ${LOG_FILE}"
