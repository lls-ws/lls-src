package br.net.lls.componentes;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;

import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Calendar;
import java.text.SimpleDateFormat;

public class Relatorio {
	
	@NotNull(message="{remover.id.nulo}", groups = {RelatorioValida.class})
	private int idFazenda;
	
	@NotNull(message="{remover.id.nulo}", groups = {RelatorioValida.class})
	private int idProdutor;
	
	private String nome;
	
	private int tipo;
	
	private String nomeTipo;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataInicial;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataFinal;
	
	@NotNull(message="{remover.id.nulo}", groups = {RelatorioValida.class})
	@Min(value=1, message="{remover.id.tamanho}", groups = {RelatorioValida.class})
	private int pagina;
	
	@NotNull(message="{remover.id.nulo}", groups = {RelatorioValida.class})
	@Min(value=1, message="{remover.id.tamanho}", groups = {RelatorioValida.class})
	private int linhas;
	
	public interface RelatorioValida{}
	
	public void setIdFazenda(int idFazenda) {
		this.idFazenda = idFazenda;
	}
	
	public int getIdFazenda() {
		return this.idFazenda;
	}
	
	public void setIdProdutor(int idProdutor) {
		this.idProdutor = idProdutor;
	}
	
	public int getIdProdutor() {
		return this.idProdutor;
	}
	
	public void setDataInicial(Calendar dataInicial) {
		this.dataInicial = dataInicial;
	}

	public Calendar getDataInicial() {
		return this.dataInicial;
	}
	
	public void setDataFinal(Calendar dataFinal) {
		this.dataFinal = dataFinal;
	}

	public Calendar getDataFinal() {
		return this.dataFinal;
	}
	
	public void setPagina(int pagina) {
		this.pagina = pagina;
	}
	
	public int getPagina() {
		return this.pagina;
	}
	
	public void setLinhas(int linhas) {
		this.linhas = linhas;
	}
	
	public int getLinhas() {
		return this.linhas;
	}
	
	public void setNome(String nome) {
		
		this.nome = nome;
		
	}
	
	public String getNome() {
		
		return this.nome;
		
	}
	
	public void setTipo(int tipo) {
		this.tipo = tipo;
	}
	
	public int getTipo() {
		return this.tipo;
	}
	
	public void setNomeTipo(String nomeTipo) {
		
		this.nomeTipo = nomeTipo;
		
	}
	
	public String getNomeTipo() {
		
		return this.nomeTipo;
		
	}
	
	public String getDataInicialText() {
		if (getDataInicial() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getDataInicial());
			return dataFormatada.format(getDataInicial().getTime());
		}
		else {
			 return "";
		}
	}
	
	public String getDataFinalText() {
		if (getDataFinal() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getDataFinal());
			return dataFormatada.format(getDataFinal().getTime());
		}
		else {
			 return "";
		}
	}
	
}
