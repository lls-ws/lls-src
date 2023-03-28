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
# SNAPSHOT version
# version 1.0-SNAPSHOT is released as version 1.0
# new development version is version 1.1-SNAPSHOT
#
# Add Resources to JAR
#|-- pom.xml
#`-- src
#    |-- main
#    |   |-- java
#    |   |   `-- com
#    |   |       `-- mycompany
#    |   |           `-- app
#    |   |           	 `-- App.java
#    |   `-- resources
#    |       |-- META-INF
#	 |		 |   |-- MANIFEST.MF
#    |       |    `-- application.properties
#	 |		 |    `-- maven
#	 |		 |       `-- com.mycompany.app
#	 |		 |           `-- my-app
#	 |		 |               |-- pom.properties
#	 |		 |               `-- pom.xml
#	 |		 `-- com
#    |			 `-- mycompany
#    |    			 `-- app
#    |        			 `-- App.class
#    `-- test
#        |`-- java
#        |    `-- com
#        |        `-- mycompany
#        |            `-- app
#        |            	 `-- AppTest.java
#		 `-- resources
#            `-- test.properties
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
	
	echo "Install Maven..."
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

maven_compile()
{
	
	clear
	
	echo "Compile the Project"
	echo "Maven compile app project:"
	
	cd ${ARTIFACT_ID}
	
	mvn compile
	
	cd ~
	
}

maven_test()
{
	
	clear
	
	echo "Test the Project"
	echo "Maven compile test sources and run unit tests:"
	
	cd ${ARTIFACT_ID}
	
	mvn test
	
	#echo "Maven compile test sources:"
	#mvn test-compile
	
	cd ~
	
}

maven_package()
{
	
	clear
	
	echo "Build the Project"
	echo "Maven create JAR:"
	
	cd ${ARTIFACT_ID}
	
	mvn package
	
	cd ~
	
}

maven_install_jar()
{
	
	clear
	
	echo "Install the Project"
	echo "Maven install JAR in local repository:"
	echo "${USER}/.m2/repository"
	
	cd ${ARTIFACT_ID}
	
	mvn install
	
	cd ~
	
}

maven_run()
{
	
	clear
	
	echo "Run the Project"
	
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
	
	echo "Create a Site"
	
	mvn site
	
	google-chrome target/site/index.html
	
	cd ~
	
}

maven_clean()
{
	
	clear
	
	cd ${ARTIFACT_ID}
	
	echo "Clean the Project"
	
	mvn clean
	
	cd ~
	
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
	compile)
		maven_compile
		;;
	"test")
		maven_test
		;;
	package)
		maven_package
		;;
	install_jar)
		maven_install_jar
		;;	
	run)
		maven_run
		;;
	site)
		maven_site
		;;
	clean)
		maven_clean
		;;
	*)
		echo "Use: `basename $0` {jdk|install|create|compile|test|package|install_jar|run|site|clean}"
		exit 1
		;;
esac
