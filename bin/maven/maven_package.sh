#!/bin/bash
# Script to Package Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_package()
{
	
	echo "Build the Project"
	echo "Create packaged artifact JAR:"
	
	maven_package_run
	
}

maven_package_clean()
{
	
	echo "Clean the Project"
	echo "Removing the target directory..."
	echo "Compiles the source code..."
	echo "Create packaged artifact JAR:"
	
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
	
	if [ -f ${ARTIFACT_ID}/${FILE_JAR} ]; then
	
		 ls -alh ${ARTIFACT_ID}/${FILE_JAR}
		 
		 echo -e "\nFile JAR created:"
		 du -hsc ${ARTIFACT_ID}/${FILE_JAR}
		 echo ""
	
	fi
	
}
