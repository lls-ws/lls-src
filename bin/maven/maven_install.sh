#!/bin/bash
# Script to install Maven
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

jdk_install()
{
	
	echo "Install java-openjdk..."
	apt -y install default-jdk
	
	jdk_version
	
}

jdk_version()
{
	
	echo "Showing Java JDK Version:"
	javac -version
	
}

maven_install()
{
	
	echo "Install Maven..."
	sudo apt -y install maven
	
	maven_version
	
}

maven_version()
{
	
	echo "Showing Maven Version:"
	mvn -version
	
}
