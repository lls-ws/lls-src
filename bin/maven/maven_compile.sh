#!/bin/bash
# Script to Compile Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_compile()
{
	
	echo -e "\nCompile the Project"
	echo "Create compiled source code CLASS:"
	
	MAVEN_TYPE="${MAVEN_OPT}"
	MAVEN_OPT=""
	
	maven_run
	
}

maven_compile_clean()
{
	
	echo -e "\nClean the Project"
	echo "Removing the target directory..."
	echo "Compiles the source code..."
	echo "Create compiled source code CLASS:"
	
	maven_run
	
}
