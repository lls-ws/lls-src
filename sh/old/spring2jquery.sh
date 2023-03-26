#!/bin/bash
# Script para criar os arquivos do jquery
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="$1"

NOME_PACOTE="$2"

NOME_JAVA="$3"

if [ -z "$NOME_PROJETO" -o -z "$NOME_PACOTE" -o -z "$NOME_JAVA" ]; then

	echo "Use: $(basename $0) [NOME_PROJETO] [NOME_PACOTE] [NOME_JAVA]"
	echo "Exemplo: $(basename $0) cafe cadastro peneira"
	exit 1;

fi

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

cria_dirs()
{

	if [ -d $DIR_JS_PACOTE ]; then

		rm -rfv $DIR_JS_PACOTE

	fi

	if [ ! -d $DIR_JS_SRC/$NOME_PACOTE ]; then

		mkdir -v $DIR_JS_SRC/$NOME_PACOTE

	fi

}

cria_arqs()
{

	cria_dirs

	cp -rfv $DIR_JS_CADASTRO $DIR_JS_PACOTE

	cria_arquivos
	
	for file in $DIR_JS_PACOTE/*.js;
	do

		sed -i 's/'$NOME_CADASTRO'/'$NOME_JAVA'/g' $file
		sed -i 's/'$NOME_CADASTRO_MIN'/'$NOME_JAVA_MIN'/g' $file
		
		# pegaNomeColunas
		sed -i '/valor: "Valor"/d' $file
		sed -i '/nome: "Nome"/d' $file
		sed -i 's/nomesColunas = "Preço";/nomesColunas = "'"$TITULO_PACOTE"'";/g' $file
		sed -i '/visualizar: "Ver",/r '$ARQ_COLUNAS $file
		
		# formataDados
		sed -i '/'$NOME_JAVA_MIN'.nome = decodeURIComponent('$NOME_JAVA_MIN'.nome);/,+1d' $file	
		sed -i '/'$NOME_JAVA_MIN'.valor = formataNumero('$NOME_JAVA_MIN'.valor, 2, false, false, "R$ ", "");/r '$ARQ_FORMATA $file
		sed -i '/'$NOME_JAVA_MIN'.valor = formataNumero('$NOME_JAVA_MIN'.valor, 2, false, false, "R$ ", "");/d' $file
		
		# setDadosTabela
		sed -i '/$tr.append(tabelaCelula('$NOME_JAVA_MIN'.nome, "text-left", "texto", "tdNome"));/d' $file
		sed -i '/$tr.append(tabelaCelula('$NOME_JAVA_MIN'.valor, "text-right", "texto", "tdValor"));/d' $file
		sed -i '/$tr.append(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));/r '$ARQ_TABELA_ADD $file
		
		sed -i '/$tr.find("#tdNome").replaceWith(tabelaCelula('$NOME_JAVA_MIN'.nome, "text-left", "texto", "tdNome"));/d' $file
		sed -i '/$tr.find("#tdValor").replaceWith(tabelaCelula('$NOME_JAVA_MIN'.valor, "text-right", "texto", "tdValor"));/d' $file
		sed -i '/$tr.find("#tdBotao").replaceWith(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));/r '$ARQ_TABELA_ALTERA $file
		
		# limpaDadosFormulario
		sed -i '/$("#valor'$NOME_JAVA'").val("");/,+3d' $file
		sed -i '/$("#id'$NOME_JAVA'").val("0");/r '$ARQ_LIMPA $file
		
		# setDadosFormulario
		sed -i '/formulario.find("#valor'$NOME_JAVA'").val('$NOME_JAVA_MIN'.valor);/,+1d' $file
		sed -i '/formulario.find("#id'$NOME_JAVA'").val('$NOME_JAVA_MIN'.id);/r '$ARQ_FORMULARIO $file
		
		# setDadosDialog
		sed -i '/$tr'$NOME_JAVA'.append(tabelaCelula('$NOME_JAVA_MIN'.nome, "text-left", "texto", "tdNome"));/d' $file
		sed -i '/$tr'$NOME_JAVA'.append(tabelaCelula('$NOME_JAVA_MIN'.valor, "text-right", "texto", "tdValor"));/r '$ARQ_DIALOG $file
		sed -i '/$tr'$NOME_JAVA'.append(tabelaCelula('$NOME_JAVA_MIN'.valor, "text-right", "texto", "tdValor"));/d' $file
		
		sed -i '/"coluna1": "Nome",/d' $file
		sed -i '/"coluna2": "Valor"/a \	\	\"coluna1": "Dados"' $file
		sed -i '/"coluna2": "Valor"/d' $file
		
		# pegaDadosFormulario
		sed -i '/nome: encodeURIComponent( unescape($("#nome" + nomeTabela).val())),/,+1d' $file
		sed -i '/id: $("#id" + nomeTabela).val(),/r '$ARQ_FORMULARIO_DADOS $file
		
		# eventoSalvar
		sed -i '/$("#nomeProcura").val(decodeURIComponent('$NOME_JAVA_MIN'.nome));/,+1d' $file
		
		# formulario
		sed -i '/var $campoNome = campoTextoHorizontal("nome" + nomeTabela, "text", "Nome", 9, 2, "", false, 50);/,+5d' $file
		sed -i '/var $formTela = $("<div\/>").attr({id: $idTela}).addClass("form-horizontal");/r '$ARQ_FORMULARIO_CAMPOS $file
		sed -i 's/var $formTela = $("<div\/>").attr({id: $idTela}).addClass("form-horizontal");/var $formTela = $("<div\/>").attr({id: $idTela}).addClass("form-horizontal");\n/g' $file
		sed -i '/$formTela.append($campoValor);/r '$ARQ_FORMULARIO_CAMPOS_ADD $file
		sed -i '/$formTela.append($campoValor);/d' $file
		
		# validarFormulario
		sed -i '/valor'$NOME_JAVA': {required: true},/,+1d' $file
		sed -i '/valor'$NOME_JAVA': "É necessário informar o valor!",/,+1d' $file
		
		mv -v "$file" "${file/$NOME_CADASTRO.js/$NOME_JAVA.js}";
		
	done

	ls $DIR_JS_PACOTE
	
	cria_sh
	
	rm -fv $ARQ_COLUNAS
	rm -fv $ARQ_FORMATA
	rm -fv $ARQ_TABELA_ADD
	rm -fv $ARQ_TABELA_ALTERA
	rm -fv $ARQ_LIMPA
	rm -fv $ARQ_FORMULARIO
	rm -fv $ARQ_DIALOG
	rm -fv $ARQ_FORMULARIO_DADOS
	rm -fv $ARQ_FORMULARIO_CAMPOS
	rm -fv $ARQ_FORMULARIO_CAMPOS_ADD
	
}

cria_sh()
{

	cp -fv "$DIR_SH_CORE/jquery-lls-$NOME_CADASTRO_MIN.sh" "$DIR_SH/jquery-lls-$NOME_JAVA_MIN.sh"

	sed -i 's/NOME_PROJETO="lls"/NOME_PROJETO="'$NOME_PROJETO'"/g' "$ARQ_SH"
	
	sed -i 's/'$NOME_CADASTRO'/'$NOME_JAVA'/g' "$ARQ_SH"
	sed -i 's/'$NOME_CADASTRO_MIN'/'$NOME_JAVA_MIN'/g' "$ARQ_SH"
	sed -i 's/MODULO="cadastro"/MODULO="'$NOME_PACOTE'"/g' "$ARQ_SH"

	sed -i '/'$NOME_JAVA_MIN'/d' $ARQ_MODULOS
	echo "$NOME_JAVA_MIN" >> $ARQ_MODULOS

}

tipo_calendar()
{
	
	echo '		'$NOME_CAMPO': "'$NOME_METODO'",' >> $ARQ_COLUNAS
	
	echo '	'$NOME_JAVA_MIN'.'$NOME_CAMPO' = formataData('$NOME_JAVA_MIN'.'$NOME_CAMPO');' >> $ARQ_FORMATA

	echo '		$tr.append(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-center", "texto", "td'$NOME_METODO'"));' >> $ARQ_TABELA_ADD
	
	echo '		$tr.find("#td'$NOME_METODO'").replaceWith(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-center", "texto", "td'$NOME_METODO'"));' >> $ARQ_TABELA_ALTERA
	
	echo '	$("#'$NOME_CAMPO''$NOME_JAVA'").val("");' >> $ARQ_LIMPA
	
	echo '	formulario.find("#'$NOME_CAMPO''$NOME_JAVA'").val('$NOME_JAVA_MIN'.'$NOME_CAMPO');' >> $ARQ_FORMULARIO
	
	echo '	$tr'$NOME_JAVA'.append(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-center", "texto", "td'$NOME_METODO'"));' >> $ARQ_DIALOG
	
	echo '		'$NOME_CAMPO': $("#'$NOME_CAMPO'" + nomeTabela).datepicker("getDate"),' >> $ARQ_FORMULARIO_DADOS
	
	echo '	var $campo'$NOME_METODO' = campoDataHorizontal("'$NOME_CAMPO'" + nomeTabela, "'$NOME_METODO'", 2, false, "-6M", "+6M");' >> $ARQ_FORMULARIO_CAMPOS
	
	echo '	$formTela.append($campo'$NOME_METODO');' >> $ARQ_FORMULARIO_CAMPOS_ADD
	
}

tipo_string()
{
	
	echo '		'$NOME_CAMPO': "'$NOME_METODO'",' >> $ARQ_COLUNAS
	
	echo '	'$NOME_JAVA_MIN'.'$NOME_CAMPO' = decodeURIComponent('$NOME_JAVA_MIN'.'$NOME_CAMPO');' >> $ARQ_FORMATA
	
	echo '		$tr.append(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-left", "texto", "td'$NOME_METODO'"));' >> $ARQ_TABELA_ADD
	
	echo '		$tr.find("#td'$NOME_METODO'").replaceWith(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-left", "texto", "td'$NOME_METODO'"));' >> $ARQ_TABELA_ALTERA
	
	echo '	$("#'$NOME_CAMPO''$NOME_JAVA'").val("");' >> $ARQ_LIMPA
	
	echo '	formulario.find("#'$NOME_CAMPO''$NOME_JAVA'").val('$NOME_JAVA_MIN'.'$NOME_CAMPO');' >> $ARQ_FORMULARIO
	
	echo '	$tr'$NOME_JAVA'.append(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-left", "texto", "td'$NOME_METODO'"));' >> $ARQ_DIALOG
	
	echo '		'$NOME_CAMPO': encodeURIComponent( unescape($("#'$NOME_CAMPO'" + nomeTabela).val())),' >> $ARQ_FORMULARIO_DADOS
	
	echo '	var $campo'$NOME_METODO' = campoTextoHorizontal("'$NOME_CAMPO'" + nomeTabela, "text", "'$NOME_METODO'", 9, 2, "", false, 50);' >> $ARQ_FORMULARIO_CAMPOS
	
	echo '	$formTela.append($campo'$NOME_METODO');' >> $ARQ_FORMULARIO_CAMPOS_ADD
	
}

tipo_numero()
{
	
	SCALE=`echo $SIZE | cut -f 2 -d '.'`
	
	PRECISION=`echo $SIZE | cut -f 1 -d '.'`
		
	PRECISION=$(( $PRECISION + $SCALE ))
	
	if [ $SCALE -eq 0 ]; then
		
		echo '	'$NOME_JAVA_MIN'.'$NOME_CAMPO' = '$NOME_JAVA_MIN'.'$NOME_CAMPO';' >> $ARQ_FORMATA
		
		echo '		'$NOME_CAMPO': $("#'$NOME_CAMPO'" + nomeTabela).val(),' >> $ARQ_FORMULARIO_DADOS
		
	else
		
		echo '	'$NOME_JAVA_MIN'.'$NOME_CAMPO' = formataNumero('$NOME_JAVA_MIN'.'$NOME_CAMPO', '$SCALE', false, false, "", "");' >> $ARQ_FORMATA
		
		echo '		'$NOME_CAMPO': formataNumeroSql($("#'$NOME_CAMPO'" + nomeTabela).val()),' >> $ARQ_FORMULARIO_DADOS
		
	fi
	
	echo '		'$NOME_CAMPO': "'$NOME_METODO'",' >> $ARQ_COLUNAS
	
	echo '		$tr.append(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-right", "texto", "td'$NOME_METODO'"));' >> $ARQ_TABELA_ADD
	
	echo '		$tr.find("#td'$NOME_METODO'").replaceWith(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-right", "texto", "td'$NOME_METODO'"));' >> $ARQ_TABELA_ALTERA
	
	echo '	$("#'$NOME_CAMPO''$NOME_JAVA'").val("");' >> $ARQ_LIMPA
	
	echo '	formulario.find("#'$NOME_CAMPO''$NOME_JAVA'").val('$NOME_JAVA_MIN'.'$NOME_CAMPO');' >> $ARQ_FORMULARIO
	
	echo '	$tr'$NOME_JAVA'.append(tabelaCelula('$NOME_JAVA_MIN'.'$NOME_CAMPO', "text-right", "texto", "td'$NOME_METODO'"));' >> $ARQ_DIALOG
	
	echo '	var $campo'$NOME_METODO' = campoNumeroHorizontal("'$NOME_CAMPO'" + nomeTabela, "'$NOME_METODO'", 9, 2, '$SCALE', '$PRECISION', false, false, "", "");' >> $ARQ_FORMULARIO_CAMPOS
	
	echo '	$formTela.append($campo'$NOME_METODO');' >> $ARQ_FORMULARIO_CAMPOS_ADD
	
}

cria_arqs

sh "$DIR_SH/compila_"$NOME_PROJETO"_js.sh"
