#!/bin/sh
# Script para configurar o cloud server
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

add_user()
{
	
	# Create user on cloud server
	adduser $USER
	passwd $USER
	gpasswd -a $USER wheel
	
}

ssh_create_local()
{

	# Create key pair on user local
	su $USER -c "ssh-keygen -t rsa"
	su $USER -c "ssh-copy-id $USER@$HOST"

}

ssh_config()
{
	
	# Return to cloud server and configure daemon sshd
	sudo sed -i 's/#PermitRootLogin yes/PermitRootLogin yes/g' $ARQ_SSH
	#sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/g' $ARQ_SSH
	
	sudo cat $ARQ_SSH | grep -i "PermitRootLogin\|PasswordAuthentication"
	
	sudo systemctl restart sshd
	
}

tomcat_install()
{
	
	sudo yum update
	
	# java-1.8 tomcat-7.0
	sudo yum -y install java java-devel tomcat tomcat-webapps tomcat-admin-webapps unzip lynx
	
	sudo sed -i '/<user username="admin" password="lls739200" roles="manager-gui,admin-gui"\/>/d' $ARQ_TOMCAT_USERS
	sudo sed -i '/<Context path="" docBase="\/home\/lls\/funchal" reloaded="true" debug="0"\/>/d' $ARQ_TOMCAT_SERVER
	
	sudo sed -i '/<\/tomcat-users>/i	\  \<user username="admin" password="lls739200" roles="manager-gui,admin-gui"\/>' $ARQ_TOMCAT_USERS
	sudo sed -i '/<\/Host>/i	\	\<Context path="" docBase="\/home\/lls\/funchal" reloaded="true" debug="0"\/>' $ARQ_TOMCAT_SERVER
	
	sudo cat $ARQ_TOMCAT_USERS
	sudo cat $ARQ_TOMCAT_SERVER
	
	sudo mkdir -v $DIR_LLS
	
	sudo chown -Rv tomcat.tomcat $DIR_LLS
	
	#sudo chmod -Rv 0777 $DIR_LLS
	
	sudo systemctl start tomcat
	
	sudo systemctl enable tomcat
	
}

mysql_install()
{
	
	echo "Install database..."
	sudo yum -y install mariadb-server psmisc
	
	echo "Run database on safe mode..."
	sudo /usr/bin/mysqld_safe --datadir='/var/lib/mysql' &
	
	echo
	echo
	echo "Waiting for loading database..."
	sleep 5
	
	( echo ; echo "Y" ; echo "$PASSWORD" ; echo "$PASSWORD" ; echo "Y" ; echo "Y" ; echo "Y" ; echo "Y" ) |
	sudo /usr/bin/mysql_secure_installation
	
	sudo yum -y install psmisc
	
	echo "Finish database on safe mode..."
	sudo killall -9 mysqld_safe
	sudo killall -9 mysqld
	
	echo "Enable mariadb on boot..."
	sudo systemctl enable mariadb
	
	echo "Start mariadb"
	sudo systemctl start mariadb
	
	echo "Waiting for loading database..."
	sleep 5
	
	mysql_database
	
}

mysql_database()
{
	
	#echo "Apagando o BD..."
	#mysql -u root --password=$PASSWORD -e "drop database bd_lls;"
	
	#echo "Criando o BD..."
	#mysql -u root --password=$PASSWORD -e "CREATE DATABASE bd_lls;"
	
	#mysql -u root --password=$PASSWORD -e "CREATE DATABASE bd_lls \
	#									   DEFAULT CHARACTER SET utf8 \
	#									   DEFAULT COLLATE utf8_unicode_ci;"
	
	echo "Mostrando o BD..."		   
	mysql -u root --password=$PASSWORD -D bd_lls -e "SELECT @@character_set_database; \
													 SHOW VARIABLES LIKE 'character_set_%'; \
													 SHOW DATABASES; \
													 SHOW TABLE STATUS;"
	
	#echo "Mostrando as colunas da tabela..."
	#mysql -u root --password=$PASSWORD -D bd_lls -e "SHOW FULL COLUMNS FROM FazendaProdutor;"
	
}

iptables_config()
{
	
	sudo yum -y install iptables-services
	
	echo "Stop firewalld..."
	sudo systemctl stop firewalld
	
	sudo systemctl mask firewalld
	
	echo "Enable iptables"
	sudo systemctl enable iptables
	
	echo "Start iptables"
	sudo systemctl restart iptables
	
	sudo iptables -X
	sudo iptables -F -v
	sudo iptables -t nat -A PREROUTING -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080 -v
	
	sudo service iptables save
	
	sudo systemctl unmask firewalld
	
	echo "Start firewalld..."
	sudo systemctl start firewalld
	
	sudo systemctl restart iptables
	
}

show_status()
{
	
	# Show iptable file rules
	sudo cat /etc/sysconfig/iptables
	
	# Check ip address
	sudo ip addr show
	
	# Check state
	ss -t4 state all
	
	# Watch state
	#sudo watch -n 1 "ss -t4 state established"
	
	# Check open ports
	#sudo netstat -tulpn
	
	# List ports
	#sudo iptables -L -n
	
}

descompacta_projeto()
{
	
	sudo service tomcat stop
	
	ARQ_WAR="$DIR_CLOUD/$PROJETO.war"
	
	rm -rfv $DIR_PROJETO
	
	mkdir -v $DIR_PROJETO
	
	sudo chown -Rv tomcat.tomcat $DIR_PROJETO
	
	unzip $ARQ_WAR -d $DIR_PROJETO
	
	#rm -fv $ARQ_WAR
	
	#sudo service tomcat start
	
}

envia_projeto()
{
	
	compila_js
	
	compila_java
	
	copia_war "/home/projetos/lls/$PROJETO.war"
	
}

add_user_renato()
{
	
	mysql -u root --password=$PASSWORD -D bd_lls -e "insert into Usuario (email, senha) value ('renatoabaete@hotmail.com', '123456'); \
		select * from Usuario"
	
}

add_user_esteice()
{
	
	mysql -u root --password=$PASSWORD -D bd_lls -e "insert into Usuario (email, senha) value ('esteice.rubiana@grupofunchal.com.br', '123456'); \
		select * from Usuario"
	
}

install_fonts()
{
	
	wget http://www.itzgeek.com/msttcore-fonts-2.0-3.noarch.rpm
	rpm -Uvh msttcore-fonts-2.0-3.noarch.rpm
	
	yum -y install dejavu-serif-fonts
	
	yum -y install system-config-language
	
	yum -y install yum-langpacks
	
	fc-cache -v
	
}

cloud_pt_BR()
{
	
	#################### LANG SH #############################
	
	ARQ_LANG_SH="/etc/profile.d/lang.sh"
	
	echo 'export LC_COLLATE=C' 			> $ARQ_LANG_SH
	echo 'export LANG=pt_BR.utf8' 		>> $ARQ_LANG_SH
	echo 'export LC_ALL=pt_BR' 			>> $ARQ_LANG_SH
	echo 'export LC_CTYPE=ISO-8859-1' 	>> $ARQ_LANG_SH
	echo 'export LESSCHARSET=latin1' 	>> $ARQ_LANG_SH
	
	cat $ARQ_LANG_SH
	
	#################### LANG CSH ############################
	
	ARQ_LANG_CSH="/etc/profile.d/lang.csh"
	
	echo 'setenv LC_COLLATE C' 			> $ARQ_LANG_CSH
	echo 'setenv LANG pt_BR' 			>> $ARQ_LANG_CSH
	echo 'setenv LC_ALL pt_BR' 			>> $ARQ_LANG_CSH
	echo 'setenv LC_CTYPE ISO-8859-1' 	>> $ARQ_LANG_CSH
	echo 'setenv LESSCHARSET latin1' 	>> $ARQ_LANG_CSH
	
	cat $ARQ_LANG_CSH
	
	#################### LOCALE ##############################
	#/etc/vcolsoleconf
	echo 'LANG="pt_BR.UTF-8"' > /etc/locale.conf
	cat /etc/locale.conf
	
	ARQ_I18N="/etc/sysconfig/i18n"
	
	echo 'LC_COLLATE=C' 		> $ARQ_I18N
	echo 'LANG="pt_BR.utf8"' 	>> $ARQ_I18N
	echo 'SYSFONT="lat1-16"' 	>> $ARQ_I18N
	echo 'LC_ALL=pt_BR' 		>> $ARQ_I18N
	echo 'LC_CTYPE=ISO-8859-1' 	>> $ARQ_I18N
	echo 'LESSCHARSET=latin1' 	>> $ARQ_I18N
	
	cat $ARQ_I18N
	
	#################### KEYBORAD ##############################
	
	loadkeys br-abnt2
	localectl set-keymap br-abnt2
	setfont -v lat1-16.psfu.gz
	
	ARQ_RC_LOCAL="/etc/rc.local"
	
	echo "loadkeys br-abnt2" 				> $ARQ_RC_LOCAL
	echo "localectl set-keymap br-abnt2" 	>> $ARQ_RC_LOCAL
	echo "setfont -v lat1-16.psfu.gz" 		>> $ARQ_RC_LOCAL
	
	cat $ARQ_RC_LOCAL
	
	localectl
	
	locale
	
}

ssmtp_install()
{
	
	echo [fedora_repo] >> /etc/yum.repos.d/fedora_repo.repo #allow yum access to the fedora repo
	echo name=fedora_repo >> /etc/yum.repos.d/fedora_repo.repo
	echo baseurl=http://download1.fedora.redhat.com/pub/epel/\$releasever/\$basearch/ >> /etc/yum.repos.d/fedora_repo.repo
	echo enabled=1 >> /etc/yum.repos.d/fedora_repo.repo
	echo skip_if_unavailable=1 >> /etc/yum.repos.d/fedora_repo.repo
	echo gpgcheck=0 >> /etc/yum.repos.d/fedora_repo.repo
	
	yum -y install ssmtp zip sharutils
	
	sed 's/^enabled=1/enabled=0/' -i /etc/yum.repos.d/fedora_repo.repo #disable fedora repo
	
	systemctl stop sendmail
	systemctl stop postfix
	
	service sendmail stop
	service postfix stop
	
	systemctl disable sendmail
	systemctl disable postfix
	
	yum remove postfix
	
	alternatives --config mta
	
	echo "root:lls.homeoffice@gmail.com:smtp.gmail.com:587" > /etc/ssmtp/revaliases
	
	echo "root=lls.homeoffice@gmail.com" > /etc/ssmtp/ssmtp.conf
	echo "hostname=localhost" >> /etc/ssmtp/ssmtp.conf
	echo "rewriteDomain=" >> /etc/ssmtp/ssmtp.conf
	echo "AuthUser=lls.homeoffice" >> /etc/ssmtp/ssmtp.conf
	echo "AuthPass=lls739200" >> /etc/ssmtp/ssmtp.conf
	echo "AuthMetod=plain" >> /etc/ssmtp/ssmtp.conf
	echo "FromLineOverride=YES" >> /etc/ssmtp/ssmtp.conf
	echo "Mailhub=smtp.gmail.com:587" >> /etc/ssmtp/ssmtp.conf
	echo "UseTLS=YES" >> /etc/ssmtp/ssmtp.conf
	echo "UseSTARTTLS=YES" >> /etc/ssmtp/ssmtp.conf
	echo "AuthMethod=LOGIN" >> /etc/ssmtp/ssmtp.conf
	echo "TLS_CA_File=/etc/pki/tls/certs/ca-bundle.crt" >> /etc/ssmtp/ssmtp.conf
	
	chown -v root.mail /etc/ssmtp/*
	
	chmod -v 640 /etc/ssmtp/*
	
	cat /etc/ssmtp/*
	
}

crontab_config()
{
	
	echo "Configurando o Crontab..."
	
	systemctl status crond.service
	
	echo "SHELL=/bin/bash" > /etc/crontab
	echo "PATH=/sbin:/bin:/usr/sbin:/usr/bin" >> /etc/crontab
	echo 'MAILTO=""' >> /etc/crontab
	
	echo "30 20 * * * sh /home/lls/funchal/sh/backup_bd_lls.sh send > /dev/null 2>&1" > /var/spool/cron/root
	
	crontab -l
	
	service crond restart
	
}

HOST="lls.net.br"
USER="cloud"
PASSWORD="lls739200"
PROJETO="funchal"

ARQ_SSH="/etc/ssh/sshd_config"

DIR_LLS="/home/lls"

DIR_PROJETO="$DIR_LLS/$PROJETO"

DIR_CLOUD="/home/$USER"

DIR_TOMCAT="/usr/share/tomcat"

DIR_TOMCAT_CONF="$DIR_TOMCAT/conf"

ARQ_TOMCAT_USERS="$DIR_TOMCAT_CONF/tomcat-users.xml"

ARQ_TOMCAT_SERVER="$DIR_TOMCAT_CONF/server.xml"

case "$1" in
	user)    	
		add_user
		;; 
	ssh-create-local)
		ssh_create_local
		;;
	ssh)
		ssh_config
		;;
	tomcat)
		tomcat_install
		;;
	mysql)
		mysql_install
		;;
	database)
		mysql_database
		;;
	iptables)
		iptables_config
		;;
	status)
		show_status
		;;
	projeto)
		descompacta_projeto
		;;
	send)
		envia_projeto
		;;
	renato)
		add_user_renato
		;;
	esteice)
		add_user_esteice
		;;
	fonts)
		install_fonts
		;;
	ptbr)
		cloud_pt_BR
		;;
	ssmtp)
		ssmtp_install
		;;
	crontab)
		crontab_config
		;;
	*)
		echo "Use: $0 {user|ssh|ssh-create-local|tomcat|mysql|database|iptables|status|projeto|send|renato|fonts|ptbr|ssmtp|crontab}"
		exit 1
		;;
esac
