#!/bin/bash
# Script to update LLS-WS Cloud
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/tomcat.lib	|| exit 1

echo "Copy htmlcompressor.jar"

FILE_JAR="htmlcompressor-1.5.3.jar"

FILE_URL="https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/htmlcompressor/${FILE_JAR}"

sudo wget -P ${DIR_TOMCAT_LIB} ${FILE_URL}

ls -al ${DIR_TOMCAT_LIB}/${FILE_JAR}