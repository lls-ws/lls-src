#!/bin/sh
# Script to configure Maven on Ubuntu
#
# Standard Directory Layout
#
# pom.xml (Project Object Model)
# src/main/java	Application/Library sources
# src/main/resources	Application/Library resources
# src/main/filters	Resource filter files
# src/main/webapp	Web application sources
# src/test/java	Test sources
# src/test/resources	Test resources
# src/test/filters	Test resource filter files
# src/it	Integration Tests (primarily for plugins)
# src/assembly	Assembly descriptors
# src/site	Site
# LICENSE.txt	Project's license
# NOTICE.txt	Notices and attributions required by libraries that the project depends on
# README.txt	Project's readme
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

jdk_install()
{
	
	echo "Install java-openjdk..."
	sudo apt -y install default-jdk
	
	javac -version
	
}

maven_install()
{
	
	echo "Install Apache Maven..."
	sudo apt -y install maven
	
	mvn -version
	
}

maven_create()
{
	
	clear
	
	echo "Creating a Project"
	echo "Maven create app project:"
	
	mvn archetype:generate -DgroupId=${GROUP_ID} -DartifactId=${ARTIFACT_ID} \
		-DarchetypeArtifactId=maven-archetype-quickstart \
		-DarchetypeVersion=1.4 -DinteractiveMode=false
		
	ls
	
}

maven_build()
{
	
	clear
	
	echo "Build the Project"
	echo "Maven compile app project:"
	
	cd ${ARTIFACT_ID}
	
	mvn package
	
	cd ~
	
}

maven_run()
{
	
	clear
	
	echo -e "Run the Project\n"
	
	cd ${ARTIFACT_ID}
	
	VERSION=`cat pom.xml | grep '<version>' | head -1 | cut -f 2 -d '>' | cut -f 1 -d '<'`
	
	echo "Name: ${ARTIFACT_ID}"
	echo "Group: ${GROUP_ID}"
	echo -e "Version: ${VERSION}\n"
	
	
	java -cp target/${ARTIFACT_ID}-${VERSION}.jar ${GROUP_ID}.App
	
	cd ~
	
}

maven_site()
{
	
	clear
	
	cd ${ARTIFACT_ID}
	
	echo "Maven create a site:"
	
	mvn site
	
	google-chrome target/site/index.html
	
}

GROUP_ID="com.mycompany.app"
ARTIFACT_ID="myapp"

case "$1" in
	jdk)
		jdk_install
		;;
	install)
		maven_install
		;;
	create)
		maven_create
		;;
	build)
		maven_build
		;;
	run)
		maven_run
		;;
	site)
		maven_site
		;;
	*)
		echo "Use: `basename $0` {jdk|install|create|build|run|site}"
		exit 1
		;;
esac
