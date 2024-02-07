package br.net.lls.fatcafe;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;
import javax.persistence.Column;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import javax.validation.constraints.Size;
import javax.persistence.FetchType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;
import br.net.lls.cadastro.FazendaProdutor;

@Entity
public class Cafe {
	
	@Id
	@NotNull(message="{cadastro.id.nulo}", groups = {CafeValida.class})
	private int id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataFaturamento;
	
	@OneToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.EAGER, orphanRemoval = true)
	@PrimaryKeyJoinColumn
	private FazendaProdutor fazendaProdutor;

	public interface CafeValida{}

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return this.id;
	}

	public void setDataFaturamento(Calendar dataFaturamento) {
		this.dataFaturamento = dataFaturamento;
	}

	public Calendar getDataFaturamento() {
		return this.dataFaturamento;
	}

	public String getDataFaturamentoText() {
		if (getDataFaturamento() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getDataFaturamento());
			return dataFormatada.format(getDataFaturamento().getTime());
		}
		else {
			 return "";
		}
	}
	
	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}
	
}
