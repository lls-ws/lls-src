#!/bin/sh
# Script para configurar os servers do cloud server Red Hat 7.4 64 bits
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

# Caminho das bibliotecas
PATH=.:$(dirname $0):$PATH
. lib/tomcat.lib		|| exit 1

http_install()
{
	
	echo "Update yum..."
	yum -y update
	
	echo "Stop tomcat..."
	systemctl stop tomcat
	
	echo "Stop iptables..."
	systemctl stop iptables
	
	echo "Install httpd..."
	yum -y install httpd
	
	echo "Setting ServerName..."
	sh -c "echo ServerName 127.0.0.1 >> /etc/httpd/conf/httpd.conf"
	
	echo "Create validation dir..."
	mkdir -pv ${DIR_SSL_VALIDATION}
	
	echo "Start httpd..."
	service httpd start
	
	echo "Check status..."
	service httpd status
	
}

remove_config()
{
	
	FILE="$1"
	
	if [ -f ${FILE} ]; then
	
		echo "Removing old configurations..."
		rm -fv ${FILE}
	
	fi
	
}

selinux_config()
{
	
	sestatus
	
	echo "Config selinux..."
	echo "SELINUX=permissive" 	> /etc/selinux/config
	echo "SELINUXTYPE=targeted" >> /etc/selinux/config
	echo "Reboot the system!"
	
}

show_status()
{
	
	# Check ip address
	#ip addr show
	
	# Check state
	#ss -t4 state all
	
	# Watch state
	#watch -n 1 "ss -t4 state established"
	
	# Check open ports
	#netstat -tulpn
	
	echo "Check ports to listening..."
	netstat -tanp | grep -i tcp
	
}

case "$1" in
	http)
		http_install
		;;
	selinux)
		selinux_config
		;;
	status)
		show_status
		;;
	all)
		show_status
		http_install
		selinux_config
		;;
	*)
		echo "Use: $0 {all|status|http|selinux}"
		exit 1
		;;
esac
