#!/bin/bash
# Script to Create Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_create()
{
	
	check_id "$1"
	
	echo "Creating a Project"
	echo "Maven create ${ARTIFACT_ID} project:"
	
	mvn archetype:generate -DgroupId=${GROUP_ID} \
		-DartifactId=${ARTIFACT_ID} \
		-DarchetypeArtifactId=${ARCHE_TYPE} \
		-DarchetypeVersion=1.4 -DinteractiveMode=false
		
	ls -al ${ARTIFACT_ID}/*
	
}

maven_package()
{
	
	check_id "$1"
	
	set_jar
	
	echo "Build the Project"
	echo "Maven create JAR:"
	
	(cd ${ARTIFACT_ID}; mvn package; ls -alh ${FILE_JAR})
	
}
