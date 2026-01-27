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

# Path Library
PATH=.:$(dirname $0):$PATH
. bin/maven/maven_install.sh	|| exit 1
. bin/maven/maven_project.sh	|| exit 1
. bin/maven/maven_settings.sh	|| exit 1
. bin/maven/maven_package.sh	|| exit 1
. bin/maven/maven_log.sh		|| exit 1

clear

maven_run()
{
	
	echo "Run the Project"
	
	set_file_jar
	
	echo "Name: ${ARTIFACT_ID}"
	echo "Group: ${GROUP_ID}"
	echo -e "Version: ${VERSION}\n"
	
	java -cp ${ARTIFACT_ID}/${FILE_JAR} ${GROUP_ID}.App
	
}

maven_site()
{
	
	echo "Create a Site"
	
	set_file_html
	
	(cd ${ARTIFACT_ID}; mvn site)
	
	google-chrome ${FILE_HTML}
	
}

set_file_html()
{
	
	DIR_SITE="${ARTIFACT_ID}/target/site"
	
	FILE_HTML="${DIR_SITE}/index.html"
	
	echo "${FILE_HTML}"
	
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

maven_compile()
{
	
	clear
	
	echo "Compile the Project"
	echo "Maven compile app project:"
	
	cd ${ARTIFACT_ID}
	
	mvn compile
	
	cd ~
	
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

set_file_repo()
{
	
	set_file_jar
	
	DIR_REPO="${DIR_MAVEN}/repository"
	
	FILE_REPO=${DIR_REPO}/`echo ${GROUP_ID} | sed 's#\.#/#g'`/${ARTIFACT_ID}/${VERSION}/${JAR_NAME}
	
	echo "${FILE_REPO}"
	
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

DIR_MAVEN=".m2"

case "$1" in
	jdk)
		jdk_install
		;;
	jdk-version)
		jdk_version
		;;
	install)
		maven_install
		;;
	version)
		maven_version
		;;
	create)
		maven_check "$1" "$2" "$3" "$4"
		;;
	package)
		maven_check "$1" "$2" "$3" "$4"
		;;
	compile)
		maven_compile
		;;
	"test")
		maven_test
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
		echo "Use: `basename $0` {all|jdk|jdk-version|install|version|create|compile|test|package|install_jar|run|site|clean|resources|properties|filter|deploy|settings|source}"
		exit 1
		;;
esac
