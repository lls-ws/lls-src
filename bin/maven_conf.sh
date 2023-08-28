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
	
	mvn archetype:generate -DgroupId=${GROUP_ID} \
		-DartifactId=${ARTIFACT_ID} \
		-DarchetypeArtifactId=maven-archetype-quickstart \
		-DarchetypeVersion=1.4 -DinteractiveMode=false
		
	ls -al ${ARTIFACT_ID}
	
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
	
	set_file_jar
	
	mvn package
	
	cd ~
	
	ls -al ${FILE_JAR}
	
}

maven_install_jar()
{
	
	clear
	
	echo "Install the Project"
	echo "Maven install JAR in local repository:"
	
	cd ${ARTIFACT_ID}
	
	set_file_repo
	
	#mvn install
	mvn source:jar install
	
	cd ~
	
	ls -al ${FILE_JAR}
	ls -al ${FILE_REPO}
	
}

maven_run()
{
	
	clear
	
	echo "Run the Project"
	
	cd ${ARTIFACT_ID}
	
	echo "Name: ${ARTIFACT_ID}"
	echo "Group: ${GROUP_ID}"
	echo -e "Version: ${VERSION}\n"
	
	java -cp ${FILE_JAR} ${GROUP_ID}.App
	
	cd ~
	
}

maven_site()
{
	
	clear
	
	cd ${ARTIFACT_ID}
	
	echo "Create a Site"
	
	set_file_html
	
	mvn site
	
	google-chrome ${FILE_HTML}
	
	cd ~
	
}

maven_clean()
{
	
	clear
	
	cd ${ARTIFACT_ID}
	
	echo "Clean the Project"
	echo "Removing the target directory..."
	
	mvn clean
	
	cd ~
	
}

maven_resources()
{
	set_dir_resources "resources"
}

maven_properties()
{
	
	maven_resources
	
	cd ${ARTIFACT_ID}
	
	set_file_properties
	
	echo "application.name=\${project.name}" >> ${FILE_PROP}
	echo "application.version=\${project.version}" >> ${FILE_PROP}
	
	cat ${FILE_PROP}
	
	echo "Copying and filtering ${DIR_NAME}:"
	
	mvn process-resources
	
	cat "target/classes/${PROP_NAME}"
	
	cd ~
	
}

maven_filter()
{
	
	set_dir_resources "filters"
	
	cd ${ARTIFACT_ID}
	
	set_file_properties
	
	echo "my.filter.value=hello!" >> ${FILE_PROP}
	
	cat ${FILE_PROP}
	
	PROP_NAME="application.properties"
	
	DIR_MAIN_SRC="src/main/resources"
	
	FILE_PROP=${DIR_MAIN_SRC}/${PROP_NAME}
	
	echo "message=\${my.filter.value}" >> ${FILE_PROP}
	echo "java.version=\${java.version}" >> ${FILE_PROP}
	echo "command.line.prop=\${command.line.prop}" >> ${FILE_PROP}
	
	cat ${FILE_PROP}
	
	echo "Copying and filtering resources:"
	
	mvn process-resources "-Dcommand.line.prop=hello again"
	
	cat "target/classes/${PROP_NAME}"
	
	cd ~
	
}

maven_deploy()
{
	
	clear
	
	echo "Deploy the Project"
	echo "Maven deploy JAR in remote repository:"
	
	cd ${ARTIFACT_ID}
	
	set_file_jar
	set_file_source
	
	#mvn deploy
	mvn source:jar deploy
	
	cd ~
	
}

maven_settings()
{
	
	echo "Settings the Project"
	
	FILE_XML="settings.xml"
	
	echo "Maven copying the ${FILE_XML} to ${DIR_MAVEN}:"
	
	if [ ! -f xml/${FILE_XML} ]; then
	
		echo "File ${FILE_XML} not found!"
		exit 1;
	
	fi
	
	rm -fv ~/${DIR_MAVEN}/${FILE_XML}
	cp -fv xml/${FILE_XML} ~/${DIR_MAVEN}
	
	cat ~/${DIR_MAVEN}/${FILE_XML}
	
}

maven_source()
{
	
	clear
	
	echo "Source the Project"
	echo "Maven create JAR source:"
	
	cd ${ARTIFACT_ID}
	
	set_file_source
	
	mvn source:jar
	
	cd ~
	
	ls -al ${FILE_SOURCE}
	
}

set_file_jar()
{
	
	VERSION=`cat pom.xml | grep '<version>' | head -1 | cut -f 2 -d '>' | cut -f 1 -d '<'`
	
	JAR_NAME="${ARTIFACT_ID}-${VERSION}.jar"
	
	FILE_JAR="${ARTIFACT_ID}/target/${JAR_NAME}"
	
	echo "${FILE_JAR}"
	
}

set_file_repo()
{
	
	set_file_jar
	
	DIR_REPO="${DIR_MAVEN}/repository"
	
	FILE_REPO=${DIR_REPO}/`echo ${GROUP_ID} | sed 's#\.#/#g'`/${ARTIFACT_ID}/${VERSION}/${JAR_NAME}
	
	echo "${FILE_REPO}"
	
}

set_file_html()
{
	
	DIR_SITE="target/site"
	
	FILE_HTML="${DIR_SITE}/index.html"
	
	echo "${FILE_HTML}"
	
}

set_file_properties()
{
	
	echo "Add ${DIR_NAME^}"
	echo "Adding properties into ${DIR_NAME} directory..."
	
	if [ ${DIR_NAME} = "filters" ]; then
	
		PROP_NAME="filter.properties"
	
	else
	
		PROP_NAME="application.properties"
	
	fi
	
	FILE_PROP=${DIR_MAIN_SRC}/${PROP_NAME}
	
	if [ ! -f ${FILE_PROP} ]; then
	
		echo "Create file: ${FILE_PROP}"
		touch ${FILE_PROP}
	
	fi
	
	echo "# ${PROP_NAME}" > ${FILE_PROP}
	
}

set_dir_resources()
{	
	clear
	
	cd ${ARTIFACT_ID}
	
	DIR_NAME="$1"
	
	echo "Add ${DIR_NAME^}"
	echo "Adding the ${DIR_NAME} directory..."
	
	DIR_MAIN_SRC="src/main/${DIR_NAME}"
	DIR_TEXT_SRC="src/test/${DIR_NAME}"
	
	if [ ! -d ${DIR_MAIN_SRC} ]; then
	
		echo "Create main ${DIR_NAME}: ${DIR_MAIN_SRC}"
		mkdir -v ${DIR_MAIN_SRC}
		ls -al ${DIR_MAIN_SRC}
	
	fi
	
	if [ "${DIR_NAME}" = "resources" ]; then
	
		if [ ! -d ${DIR_TEXT_SRC} ]; then
	
			echo "Create test ${DIR_NAME}: ${DIR_TEXT_SRC}"
			mkdir -v ${DIR_TEXT_SRC}
			ls -al ${DIR_TEXT_SRC}
		
		fi
	
	fi
	
	cd ~
	
}

set_file_source()
{
	
	set_file_jar
	
	SOURCE_NAME="${ARTIFACT_ID}-${VERSION}-sources.jar"
	
	FILE_SOURCE="${ARTIFACT_ID}/target/${SOURCE_NAME}"
	
	echo "${FILE_SOURCE}"
	
}

GROUP_ID="com.mycompany.app"
ARTIFACT_ID="my-app"

DIR_MAVEN=".m2"

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
	resources)
		maven_resources
		;;
	properties)
		maven_properties
		;;
	filter)
		maven_filter
		;;
	deploy)
		maven_deploy
		;;
	settings)
		maven_settings
		;;
	source)
		maven_source
		;;
	all)
		maven_create
		maven_compile
		maven_clean
		maven_test
		maven_package
		maven_install_jar
		maven_site
		maven_resources
		maven_properties
		maven_filter
		maven_deploy
		maven_settings
		maven_source
		;;
	*)
		echo "Use: `basename $0` {all|jdk|install|create|compile|test|package|install_jar|run|site|clean|resources|properties|filter|deploy|settings|source}"
		exit 1
		;;
esac
