#!/bin/bash
# Script to Modules Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_modules()
{
	
	echo "Checking Modules Integrity..."
	mvn verify
	
}

maven_modules_install()
{
	
	echo "Instaling LLS Modules on Repository..."
	mvn install -U
		
	maven_set_repo
	
	maven_modules_find
	
}

maven_modules_clean()
{
	
	echo "Cleanning LLS Modules Targets..."
	mvn clean
		
	maven_set_repo
	
}

maven_modules_clean_install()
{
	
	echo "Cleanning, Updated and Instaling LLS Modules on Repository..."
	mvn clean install -U
		
	maven_set_repo
	
	maven_modules_find
	
}

maven_modules_find()
{
	
	find ${DIR_REPO_LLS} -type f -name "*.war" -o -name "*.jar" -o -name "*.pom"
	
}

maven_modules_jetty()
{
	
	maven_set_jar
		
	(cd ${ARTIFACT_ID}; google-chrome http://localhost:8080 && mvn jetty:run)
	
}
