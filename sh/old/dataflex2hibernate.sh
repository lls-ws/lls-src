#!/bin/bash
# Script para converter o dataflex para hibernate
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="$1"

NOME_PACOTE="$2"

NOME_JAVA="$3"

NOME_DEF="$4"

if [ -z "$NOME_PROJETO" -o -z "$NOME_PACOTE" -o -z "$NOME_JAVA" -o -z "$NOME_DEF" ]; then

	echo "Use: $(basename $0) [NOME_PROJETO] [NOME_PACOTE] [NOME_JAVA] [NOME_DEF]"
	echo "Exemplo: $(basename $0) cafe cadastro peneira tipo"
	exit 1;

fi

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh					|| exit 1
. lib_dataflex2hibernate.sh		|| exit 1

cria_dirs()
{
	
	if [ ! -d $DIR_JAVA ]; then

		mkdir -pv $DIR_JAVA

	fi
	
}

ler_arquivo_def()
{
	
	cria_dirs
	
	TOTAL_LINHAS=`wc -l < $ARQ_DEF`
	
	filename="$ARQ_DEF"
	firstline=19
	lastline=$TOTAL_LINHAS
	
	cria_arquivo_import
	
	cria_arquivo_class
	
	COUNTER_DAT=0
	COUNTER_ASC=0
	COUNTER_NUM=0
	
	if [ -f $ARQ_CAMPOS ]; then
	
		rm -fv $ARQ_CAMPOS
	
	fi
	
	sed -ne "${firstline},${lastline}p;${lastline}q" < ${filename} |
	while read linha ;
	do
		
		FIELD=`echo $linha | awk '{print $2}'`
		
		TYPE=`echo $linha | awk '{print $3}'`
		
		SIZE=`echo $linha | awk '{print $4}'`
		
		echo "$FIELD $TYPE $SIZE"
		
		echo "$FIELD $TYPE $SIZE" >> $ARQ_CAMPOS
		
		cria_campo
		
	done
	
	cria_arquivo_java
	
	add_persistence_xml
	
	du -hsc $ARQ_JAVA $ARQ_VALIDATION $ARQ_XML
	
}

cria_arquivo_java()
{
	
	cat $ARQ_IMPORT 								> $ARQ_JAVA
	echo "" 										>> $ARQ_JAVA
	cat $ARQ_CLASS 									>> $ARQ_JAVA
	echo "	public interface "$NOME_JAVA"Valida{}" 	>> $ARQ_JAVA 
	echo "" 										>> $ARQ_JAVA
	cat $ARQ_METODOS 								>> $ARQ_JAVA
	echo "}" 										>> $ARQ_JAVA
	
	rm -f $ARQ_IMPORT
	rm -f $ARQ_CLASS
	rm -f $ARQ_METODOS
	
	cat $ARQ_JAVA
	
}

cria_arquivo_import()
{
	
	echo "$ARQ_JAVA"
	
	echo "package $URL_PROJETO.$NOME_PACOTE;" 							> $ARQ_IMPORT
	echo "" 															>> $ARQ_IMPORT
	echo "import javax.persistence.Entity;" 							>> $ARQ_IMPORT
	echo "import javax.persistence.Id;" 								>> $ARQ_IMPORT
	echo "import javax.persistence.GeneratedValue;" 					>> $ARQ_IMPORT
	echo "import javax.validation.constraints.NotNull;" 				>> $ARQ_IMPORT
	echo "import javax.persistence.Column;" 							>> $ARQ_IMPORT
	
}

cria_arquivo_class()
{
	
	ARQ_CLASS="$ARQ_JAVA.class"
	
	TIPO="int"
	
	NOME_CAMPO="id"
	
	echo "@Entity" 												> $ARQ_CLASS
	echo "public class $NOME_JAVA {"							>> $ARQ_CLASS
	echo "" 													>> $ARQ_CLASS
	echo "	@Id"												>> $ARQ_CLASS
	echo "	@GeneratedValue"									>> $ARQ_CLASS
	echo '	@NotNull(message="{cadastro.id.nulo}", groups = {'$NOME_JAVA'Valida.class})' >> $ARQ_CLASS
	echo "	private $TIPO $NOME_CAMPO;"													 >> $ARQ_CLASS
	echo ""														>> $ARQ_CLASS
	
	cria_metodos
	
}

tipo_calendar()
{
	
	TIPO="Calendar"
			
	let COUNTER_DAT++
	
	if [ $COUNTER_DAT -eq 1 ]; then
		
		echo "import javax.persistence.Temporal;" 							>> $ARQ_IMPORT
		echo "import javax.persistence.TemporalType;"						>> $ARQ_IMPORT
		echo "import org.springframework.format.annotation.DateTimeFormat;"	>> $ARQ_IMPORT
		echo "import java.util.Calendar;"		 							>> $ARQ_IMPORT
		echo "import java.text.SimpleDateFormat;" 							>> $ARQ_IMPORT
		
	fi
		
	echo "	@Temporal(TemporalType.DATE)"								>> $ARQ_CLASS
	echo '	@DateTimeFormat(pattern="dd/MM/yyyy")'						>> $ARQ_CLASS
	echo "	private $TIPO $NOME_CAMPO;"									>> $ARQ_CLASS
	echo ''																>> $ARQ_CLASS
	
	cria_metodos
	
	echo "	public String get"$NOME_METODO"Text() {"					>> $ARQ_METODOS
	echo "		if (get$NOME_METODO() != null) {"						>> $ARQ_METODOS
	echo '			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");' >> $ARQ_METODOS
	echo "			dataFormatada.setCalendar(get$NOME_METODO());"		>> $ARQ_METODOS
	echo "			return dataFormatada.format(get$NOME_METODO().getTime());" >> $ARQ_METODOS
	echo "		}" 														>> $ARQ_METODOS
	echo "		else {" 												>> $ARQ_METODOS
	echo '			 return "";'										>> $ARQ_METODOS
	echo "		}"														>> $ARQ_METODOS
	echo "	}" 															>> $ARQ_METODOS
	echo "" 															>> $ARQ_METODOS
	
}

tipo_string()
{
	
	TIPO="String"
			
	let COUNTER_ASC++
	
	if [ $COUNTER_ASC -eq 1 ]; then
		
		echo "import javax.validation.constraints.Size;" 					>> $ARQ_IMPORT
		
	fi
		
	echo "	@Column(length = $SIZE, nullable = true, unique = false)"	>> $ARQ_CLASS
	echo '	@Size(min=0, max='$SIZE', message="{'$NOME_PACOTE'.'$NOME_CAMPO'.tamanho}", groups = {'$NOME_JAVA'Valida.class})' >> $ARQ_CLASS
	echo "	private $TIPO $NOME_CAMPO;"									>> $ARQ_CLASS
	echo ''																>> $ARQ_CLASS
	
	cria_metodos
	
	cria_mensagem_validacao
	
}

cria_mensagem_validacao()
{
	
	sed -i '/'$NOME_PACOTE'.'$NOME_CAMPO'.tamanho=O/d' $ARQ_VALIDATION
	
	echo "$NOME_PACOTE.$NOME_CAMPO.tamanho=O $NOME_CAMPO deve conter no máximo {max} caracteres!" |
	iconv -f utf-8 -t iso-8859-1 >> $ARQ_VALIDATION
	
}

tipo_numero()
{
	
	let COUNTER_NUM++
			
	if [ $COUNTER_NUM -eq 1 ]; then
		
		echo "import java.math.BigDecimal;"				 					>> $ARQ_IMPORT
		
	fi
	
	SCALE=`echo $SIZE | cut -f 2 -d '.'`
	
	echo '	@NotNull(message="{cadastro.valor.nulo}", groups = {'$NOME_JAVA'Valida.class})' 			>> $ARQ_CLASS
	
	if [ $SCALE -eq 0 ]; then
	
		TIPO="int"
	
	else
	
		TIPO="BigDecimal"
	
		PRECISION=`echo $SIZE | cut -f 1 -d '.'`
		
		PRECISION=$(( $PRECISION + $SCALE ))
		
		echo '	@Column(nullable = false, unique = false, columnDefinition="Decimal('$PRECISION', '$SCALE') default 0.00")' 	>> $ARQ_CLASS
		
	fi
	
	echo "	private $TIPO $NOME_CAMPO;"									>> $ARQ_CLASS
	echo '' 															>> $ARQ_CLASS
	
	cria_metodos
	
}

cria_metodos()
{
	
	NOME_METODO=`echo "${NOME_CAMPO^}"`
	
	echo "	public void set$NOME_METODO($TIPO $NOME_CAMPO) {"			>> $ARQ_METODOS
	echo "		this.$NOME_CAMPO = $NOME_CAMPO;"						>> $ARQ_METODOS
	echo '	}'															>> $ARQ_METODOS
	echo ''																>> $ARQ_METODOS
	echo "	public $TIPO get$NOME_METODO() {"							>> $ARQ_METODOS
	echo "		return this.$NOME_CAMPO;"								>> $ARQ_METODOS
	echo '	}'															>> $ARQ_METODOS
	echo ''																>> $ARQ_METODOS
	
}

add_persistence_xml()
{
	
	sed -i '/<class>'$URL_PROJETO'.'$NOME_PACOTE'.'$NOME_JAVA'/d' $ARQ_XML
	
	sed -i '/<properties>/i \		<class>'$URL_PROJETO'.'$NOME_PACOTE'.'$NOME_JAVA'</class>' $ARQ_XML
	
	cat $ARQ_XML
	
}

ler_arquivo_def
		
#sh sh/hibernate2spring.sh "$NOME_PROJETO" "$NOME_PACOTE" "$NOME_JAVA"

#sh sh/compila_java.sh "$NOME_PROJETO"

#sh sh/spring2jquery.sh "$NOME_PROJETO" "$NOME_PACOTE" "$NOME_JAVA"
