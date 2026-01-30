#!/bin/bash
# Script to Update LLS Corn DataBase
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

balance_update()
{
	
	echo "Updating Corn Balance on ${URL_HOST}"
	
	ssh -i ${KEY_RSA} ${USER}@${URL_HOST} bash << 'EOF'
	sudo service tomcat9 stop
	git clone https://github.com/lls-ws/lls-src.git
	cd lls-src
	sudo bash modulos/milho/bin/atualiza_saldo_milho.sh update
	cd ~
	sudo rm -rf lls-src
	ls
	sudo service tomcat9 start
EOF

	echo "Corn Balance Updated!"

}
