#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

min_def()
{
	
	NOME_CSS_MIN="jquery-lls.min.css"

	ARQ_CSS_MIN="${DIR_CSS}/${NOME_CSS_MIN}"

	ARQ_JAR="${DIR_TOMCAT}/WEB-INF/lib/yuicompressor-2.4.8.jar"
	
}

criar_arquivos_css_mim()
{
	
	if [ -f ${ARQ_CSS_MIN} ]; then
	
		rm -fv ${ARQ_CSS_MIN}
	
	fi
	
	java -jar $ARQ_JAR ${DIR_LLS}/${NOME_CSS} -o ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN} --charset utf-8 -v
	
	rm -fv ${DIR_LLS}/${NOME_CSS}
	
	du -hsc ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN}
	
}

criar_arquivos_mim()
{
	
	find ${DIR_LLS}/* -maxdepth 0 -iname '*.js' |
	
	while read file
	do
		
		ARQ_JS=$(basename $file)
		
		echo ${ARQ_JS}
		
		java -jar ${ARQ_JAR} ${file} -o ${DIR_TOMCAT_JS}/${ARQ_JS} --charset utf-8 -v
		
		rm -fv ${file}
		
	done
	
	chown -R tomcat.tomcat ${DIR_TOMCAT_JS}
	
	echo "Arquivos criados com sucesso! Tamanho: `du -hsc ${DIR_TOMCAT_JS}/*.js | tail -1 | awk '{print $1}'`"
	
}

jquery_min()
{
	jquery_install
	criar_arquivos_js
	
	jquery_modules "install"
	
	criar_arquivos_mim
	criar_arquivos_css_mim
	
	jquery_modules "min"
	
}

copia_arquivos_js_core()
{
	
	echo "Movendo arquivos para: ${DIR_TOMCAT_JS}"
	
	find $DIR_LLS/* -maxdepth 0 -iname '*.js' |
	
	while read file
	do
		
		ARQ_JS=$(basename $file)
		
		echo ${ARQ_JS}
		
		rm -f ${DIR_TOMCAT_JS}/${ARQ_JS}
		
		mv -v ${file} ${DIR_TOMCAT_JS}
		
		chown tomcat.tomcat ${DIR_TOMCAT_JS}/${ARQ_JS}
		
	done
	
	echo "Arquivos movidos com sucesso! Tamanho Total: `du -hsc ${DIR_TOMCAT_JS}/*.js | tail -1 | awk '{print $1}'`"
	
}



cria_arq_cadastro(7)
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/eventoSalvar$NOME.js"
		"$NOME_MIN/removeTotalTabela$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
		"$NOME_MIN/setDadosTabela$NOME.js"
		"$NOME_MIN/setDadosRodape$NOME.js"
		"$NOME_MIN/setDadosDialog$NOME.js"
		"$NOME_MIN/pegaProcura$NOME.js"
	)
	
	cria_arq_cadastro_formulario $NOME
	
}

cria_arq_cadastro_formulario(6)
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/formulario$NOME.js"
		"$NOME_MIN/validarFormulario$NOME.js"
		"$NOME_MIN/setDadosFormulario$NOME.js"
		"$NOME_MIN/pegaDadosFormulario$NOME.js"
		"$NOME_MIN/limpaDadosFormulario$NOME.js"
		"$NOME_MIN/pegaNomeColunas$NOME.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_cadastro_tabela()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/pega$NOME.js"
		"$NOME_MIN/pegaTabela$NOME.js"
		"$NOME_MIN/setLinhaTabela$NOME.js"
		"$NOME_MIN/mudaLinhaTabela$NOME.js"
		"$NOME_MIN/remove$NOME.js"
		"$NOME_MIN/altera$NOME.js"
		"$NOME_MIN/removeTotalTabela$NOME.js"
	)
	
	cria_arq_cadastro_formulario $NOME
	
}

cria_arq_relatorio()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/pegaNomeColunas$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
		"$NOME_MIN/setDadosTabela$NOME.js"
		"$NOME_MIN/setDadosRodape$NOME.js"
		"$NOME_MIN/pegaProcura$NOME.js"
		"$NOME_MIN/formularioRelatorio$NOME.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_relatorio_cadastro()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/eventoSalvar$NOME.js"
		"$NOME_MIN/formulario$NOME.js"
		"$NOME_MIN/validarFormulario$NOME.js"
		"$NOME_MIN/pegaDadosFormulario$NOME.js"
		"$NOME_MIN/limpaDadosFormulario$NOME.js"
		"$NOME_MIN/pegaNomeColunas$NOME.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}
