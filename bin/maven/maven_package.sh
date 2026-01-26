#!/bin/bash
# Script to Package Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_package()
{
	
	
	
	echo "Build the Project"
	echo "Create packaged artifact JAR:"
	
	(cd ${ARTIFACT_ID}; mvn package)
	
	maven_show_jar
	
}

maven_clean_package()
{
	
	set_jar
	
	echo "Clean the Project"
	echo "Removing the target directory..."
	echo "Compiles the source code..."
	echo "Create packaged artifact JAR:"
	
	(cd ${ARTIFACT_ID}; mvn clean package)
	
	maven_show_jar
	
}

maven_show_jar()
{
	
	if [ -f ${ARTIFACT_ID}/${FILE_JAR} ]; then
	
		 ls -alh ${ARTIFACT_ID}/${FILE_JAR}
	
	fi
	
}
