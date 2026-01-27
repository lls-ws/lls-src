#!/bin/bash
# Script to Create Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_create()
{
	
	echo "Creating a Project"
	echo "Maven create ${ARTIFACT_ID} project:"
	
	mvn archetype:generate -DgroupId=${GROUP_ID} \
		-DartifactId=${ARTIFACT_ID} \
		-DarchetypeArtifactId=${ARCHE_TYPE} \
		-DarchetypeVersion=1.4 -DinteractiveMode=false
		
	maven_create_show
	
}

maven_create_clean()
{
	
	echo "Clean the Project"
	echo "Removing the target directory..."
	
	(cd ${ARTIFACT_ID}; mvn ${MAVEN_CMD} ${MAVEN_TYPE})
	
	maven_create_show
	
}

maven_create_show()
{
	
	ls -al ${ARTIFACT_ID}/*
	
}
