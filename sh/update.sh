#!/bin/sh
# Atualiza e cria um pacote tar.gz do perfil do usuario
#
# Autor: Leandro Luiz
# email: leandroluiz2014@gmail.com

cria_versao()
{    
    VERSAO=$(echo $ARQ | rev | cut -f 1 -d '-' | rev)
    
    DIG1=$(echo $VERSAO | cut -f1 -d .)
    DIG2=$(echo $VERSAO | cut -f2 -d .)
    DIG3=$(echo $VERSAO | cut -f3 -d .)
    
    DIG3=$(( $DIG3 + 1 ))
    
    if [ "$DIG3" = "10" ]; then
	
	DIG3=0
	DIG2=$(( $DIG2 + 1 ))
	
	if [ "$DIG2" = "10" ]; then
	
	    DIG2=0
	    DIG1=$(( $DIG1 + 1 ))
	fi
	
    fi
    
    VERSAO_NOVA=$DIG1.$DIG2.$DIG3    
}

verifica_atualizacao()
{
	if [ ! -d ${PERFIL} ]; then
		
		mkdir -pv ${PERFIL}/current
		
	fi
		
	if [ -z "`ls ${PERFIL}/current/${USER}-${HOST}-*.tar.gz 2> /dev/null`" ]; then
		
		echo "Criando a primeira versão do arquivo: ${USER}-${HOST}-0.0.0.tar.gz"
		echo "Arquivo criado pelo $(basename $0)" > ${PERFIL}/${USER}-${HOST}-0.0.0.tar.gz
		echo "Arquivo criado pelo $(basename $0)" > ${PERFIL}/current/${USER}-${HOST}-0.0.0.tar.gz
	
	fi
	
}

cria_pacote()
{
	 
    PERFIL=".dist"
    HOST="src"
    
    verifica_atualizacao
    
    ARQ_ATUAL=$(basename $(ls ${PERFIL}/current/${USER}-${HOST}-*.tar.gz))
    ARQ=${ARQ_ATUAL%.tar.gz}

    echo "Criando o pacote do ${ARQ}"
    cria_versao
    
    echo "Definindo o arquivo novo versao ${VERSAO_NOVA}" 
    ARQ_NOVO=${PERFIL}/current/${USER}-${HOST}-${VERSAO_NOVA}.tar.gz
    
    tar -czf ${ARQ_NOVO} *
    
    echo "Atualizando o arquivo novo ${ARQ_NOVO}" 
    sudo mv -v ${PERFIL}/current/${ARQ_ATUAL} ${PERFIL}
	
}

cria_pacote
