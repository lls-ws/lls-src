#!/bin/bash
# Script to Verify Maven Modules Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_verify()
{
	
	mvn verify
	
}

maven_verify_show()
{
	
	maven_set_jar
		
	jar tvf ${ARTIFACT_ID}/${FILE_JAR}
	
	echo "jar tvf ${ARTIFACT_ID}/${FILE_JAR}"
	
}

maven_verify_jetty()
{
	
	maven_set_jar
		
	(cd ${ARTIFACT_ID}; mvn jetty:run && google-chrome localhost:8080)
	
}
