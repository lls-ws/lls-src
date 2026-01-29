#!/bin/sh
# Script to configure Maven on Ubuntu
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

# Path Library
PATH=.:$(dirname $0):$PATH
. bin/maven/maven_settings.sh	|| exit 1
. bin/maven/maven_install.sh	|| exit 1
. bin/maven/maven_project.sh	|| exit 1
. bin/maven/maven_compile.sh	|| exit 1
. bin/maven/maven_package.sh	|| exit 1
. bin/maven/maven_verify.sh		|| exit 1
. bin/maven/maven_log.sh		|| exit 1

clear

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
	repo_remove)
		maven_repository_remove
		;;
	*)
		OPTION_NAMES=(
			"open"
			"create"
			"compile"
			"package"
			"verify"
		)
		
		if [[ " ${OPTION_NAMES[*]} " =~ " ${1} " ]]; then
		
			maven_check "$1" "$2" "$3" "$4"
		
		else
		
			echo "Use: `basename $0` {jdk jdk-version install version repo_remove ${OPTION_NAMES[@]}}"
			exit 1
		fi
		;;
esac
