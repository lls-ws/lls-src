#!/bin/bash
# Script to Package Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_package()
{
	
	echo -e "\nBuild the Project"
	echo "Create packaged artifact JAR:"
	
	maven_package_run
	
}

maven_package_clean()
{
	
	echo -e "\nClean the Project"
	echo "Removing the target directory..."
	echo "Compiles the source code..."
	echo "Create packaged artifact JAR:"
	
	MAVEN_CMD="${LOG_CMD} ${CMD_SKIP}"
	
	maven_package_run
	
}

maven_package_install()
{
	
	echo -e "\nInstall the Project"
	echo "Maven install JAR in local repository:"
	
	MAVEN_OPT="${CMD_SKIP}"
	
	maven_package_run
	
}

maven_package_clean_install()
{

	echo -e "\nClean and Install the Project"
	echo "Removing, Compile, Create and Repository JAR:"
	
	MAVEN_OPT="${CMD_SKIP}"
	MAVEN_CMD=`echo "${MAVEN_TYPE}"| cut -d '_' -f 1`
	MAVEN_TYPE=`echo "${MAVEN_TYPE}"| cut -d '_' -f 2`
	
	maven_package_run
	
}

maven_package_run()
{
	
	(cd ${ARTIFACT_ID}; mvn ${MAVEN_CMD} ${MAVEN_TYPE} ${MAVEN_OPT})
	
	maven_show_jar
	
}

maven_show_jar()
{
	
	maven_set_jar
	
	if [ "${MAVEN_TYPE}" = "install" ]; then
	
		maven_set_repo_jar
		
		if [ -f ${FILE_REPO} ]; then
		
			ls -alh ${FILE_REPO}
			
			echo -e "\nFile JAR installed:"
			du -hsc ${FILE_REPO}
		
		fi
	
	else
	
		if [ -f ${ARTIFACT_ID}/${FILE_JAR} ]; then
		
			 ls -alh ${ARTIFACT_ID}/${FILE_JAR}
			 
			 echo -e "\nFile JAR created:"
			 du -hsc ${ARTIFACT_ID}/${FILE_JAR}
		
		fi
		
	fi
	
	echo ""
	
}
