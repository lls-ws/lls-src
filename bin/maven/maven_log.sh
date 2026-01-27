#!/bin/bash
# Script to Log Maven Project
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

maven_log_show()
{
	
	du -hsc ${LOG_FILE}
	
	echo "Openning Maven Log..."
	geany ${LOG_FILE}
	
}
