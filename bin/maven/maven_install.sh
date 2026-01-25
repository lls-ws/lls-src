#!/bin/bash
# Script to install Maven
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
