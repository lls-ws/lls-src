#!/bin/sh
# Script para configurar os app do cloud server Red Hat 7.4 64 bits
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

register_redhat()
{
	
	echo "Remove RHUI client packages..."
	yum -y remove rh-amazon-rhui-client*
	
	echo "Remove existing RHUI repo files..."
	rm -rf /etc/yum.repos.d/*
	
	echo "Register RHEL 8 to Red Hat Subscription..."
	subscription-manager register --username=LLS_HomeOffice --password=Lls#739200 --auto-attach
	
	echo "Verify Subscription on RHEL 8..."
	subscription-manager list --available
	
	echo "Verify Subscription on RHEL 8..."
	subscription-manager list
	
	echo "List down the enabled repositories..."
	yum repolist all
	
	echo "List the all available repositories..."
	subscription-manager repos --list
	
	echo "Updating the repository..."
	yum -y update
	
}

profile_pt_BR()
{
	
	echo "Installing pt_BR..."
	yum -y install langpacks-pt_BR wget zip unzip mc mariadb-server psmisc
	
	echo "Changing profile to pt_BR..."
	
	profile_lang_sh
	profile_lang_csh
	profile_locale
	profile_i18n
	profile_keyboard
	
	loadkeys br-abnt2
	localectl set-keymap br-abnt2
	setfont -v lat1-16.psfu.gz
	
	localectl
	locale
	
	echo "Changing timezone..."
	timedatectl set-timezone America/Sao_Paulo
	
}

add_config()
{
	
	echo "Changing ${1}..."
	
	if [ -f ${ARQ_CONFIG} ]; then
		
		mv -v ${ARQ_CONFIG} ${ARQ_CONFIG}.cop
		
	fi
	
	for CONF in "${CONFIG[@]}"
	do
		
		sh -c "echo ${CONF} >> ${ARQ_CONFIG}"
		
	done
	
	cat ${ARQ_CONFIG} | tail -${#CONFIG[@]}
	
}

profile_lang_sh()
{
	
	ARQ_CONFIG="/etc/profile.d/lang.sh"
	
	CONFIG=(
		'export LC_COLLATE=C'
		'export LANG=pt_BR.utf8'
		'export LC_ALL=pt_BR'
		'export LC_CTYPE=ISO-8859-1'
		'export LESSCHARSET=latin1'
	)

	add_config "lang_sh"

}

profile_lang_csh()
{
	
	ARQ_CONFIG="/etc/profile.d/lang.csh"
	
	CONFIG=(
		'setenv LC_COLLATE C'
		'setenv LANG pt_BR'
		'setenv LC_ALL pt_BR'
		'setenv LC_CTYPE ISO-8859-1'
		'setenv LESSCHARSET latin1'
	)
	
	add_config "lang_csh"
	
}

profile_locale()
{
	
	ARQ_CONFIG="/etc/locale.conf"
	
	CONFIG=(
		'LANG=\"pt_BR.UTF-8\"'
	)

	add_config "locale"
	
}

profile_i18n()
{
	
	ARQ_CONFIG="/etc/sysconfig/i18n"
	
	CONFIG=(
		'LC_COLLATE=C'
		'LANG=\"pt_BR.utf8\"'
		'SYSFONT=\"lat1-16\"'
		'LC_ALL=pt_BR'
		'LC_CTYPE=ISO-8859-1'
		'LESSCHARSET=latin1'
	)
	
	add_config "i18n"
	
}

profile_keyboard()
{

	ARQ_CONFIG="/etc/rc.local"
	
	CONFIG=(
		'loadkeys br-abnt2'
		'localectl set-keymap br-abnt2'
		'setfont -v lat1-16.psfu.gz'
	)
	
	add_config "keyboard"
	
}

fonts_install()
{
	
	echo "Installing necessary packages..."
	yum -y install fontconfig xorg-x11-font-utils dejavu-serif-fonts
	
	echo "Installing EPEL repository..."
	rpm -Uvh http://epel.brisanet.com.br//epel-release-latest-7.noarch.rpm
	
	echo "Installing cabextract..."
	yum -y install cabextract 
	
	echo "Installing msttcore-fonts..."
	rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64//msttcore-fonts-installer-2.6-1.noarch.rpm
	
	echo "Updating font cache..."
	fc-cache -v
	
	echo "Removing EPEL repository..."
	yum -y remove epel-release
	
}

crontab_config()
{
	
	ARQ_CONFIG="/etc/crontab"
	
	CONFIG=(
		'SHELL=/bin/bash'
		'PATH=/sbin:/bin:/usr/sbin:/usr/bin'
		'MAILTO=\"\"'
	)
	
	add_config "crontab"
	
	crontab_jobs
	
}

crontab_jobs()
{
	
	ARQ_CONFIG="/var/spool/cron/root"
	
	CONFIG=(
		'30 20 \* \* \* sh /home/lls/funchal/sh/backup_bd_lls.sh send \> /dev/null 2\>\&1'
		'0 5 \* \* \* /usr/sbin/reboot'
	)
	
	rm -fv ${ARQ_CONFIG}
	
	add_config "crontab jobs"
	
	echo "Show crontab jobs..."
	crontab -l
	
	echo "Restarting crontab..."
	service crond restart
	
}

ssmtp_install()
{
	
	echo "Installing EPEL repository..."
	rpm -Uvh http://epel.brisanet.com.br//epel-release-latest-7.noarch.rpm
	
	echo "Installing ssmtp..."
	yum -y install ssmtp 
	
	ssmtp_config
	
	echo "Installing sharutils..."
	rpm -Uvh http://mirror.centos.org/centos/7/os/x86_64/Packages/sharutils-4.13.3-8.el7.x86_64.rpm
	
	echo "Installing necessary packages..."
	yum -y install ncurses-compat-libs redhat-indexhtml
	
	echo "Installing lynx..."
	rpm -Uvh http://mirror.centos.org/centos/7/os/x86_64/Packages/lynx-2.8.8-0.3.dev15.el7.x86_64.rpm
	
	echo "Removing EPEL repository..."
	yum -y remove epel-release
	
}

ssmtp_config()
{
	
	ARQ_CONFIG="/etc/ssmtp/revaliases"
	
	CONFIG=(
		'root:lls.homeoffice@gmail.com:smtp.gmail.com:587'
	)
	
	add_config "ssmtp revaliases"
	
	echo "Changing permissions for revaliases..."
	chown -v root.mail ${ARQ_CONFIG}
	chmod -v 640 ${ARQ_CONFIG}
	
	ARQ_CONFIG="/etc/ssmtp/ssmtp.conf"
	
	CONFIG=(
		'root=lls.homeoffice@gmail.com'
		'hostname=localhost'
		'rewriteDomain='
		'AuthUser=lls.homeoffice'
		'AuthPass=lls739200'
		'AuthMetod=plain'
		'FromLineOverride=YES'
		'Mailhub=smtp.gmail.com:587'
		'UseTLS=YES'
		'UseSTARTTLS=YES'
		'AuthMethod=LOGIN'
		'TLS_CA_File=/etc/pki/tls/certs/ca-bundle.crt'
	)
	
	add_config "ssmtp conf"
	
	echo "Changing permissions for ssmtp conf..."
	chown -v root.mail ${ARQ_CONFIG}
	chmod -v 640 ${ARQ_CONFIG}
	
}

check_version()
{
	echo "Mostrando a versão dos Apps"
	cat /etc/redhat-release
	rpm -qa mariadb* java*s
	#yum list installed | grep mariadb
	#yum list installed | grep java-11-openjdk
}

if [ "$EUID" -ne 0 ]; then
	echo "Rodar script como root"
	exit 1
  
fi

case "$1" in
	register)
		register_redhat
		;;
	profile)
		profile_pt_BR
		;;
	fonts)
		fonts_install
		;;
	crontab)
		crontab_config
		;;
	ssmtp)
		ssmtp_install
		;;
	version)
		check_version
		;;
	all)
		register_redhat
		profile_pt_BR
		fonts_install
		crontab_config
		ssmtp_install
		;;
	*)
		echo "Use: $0 {all|register|profile|fonts|crontab|ssmtp|version}"
		exit 1
		;;
esac
