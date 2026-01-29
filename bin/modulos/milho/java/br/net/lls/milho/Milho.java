package br.net.lls.milho;

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
import java.math.BigDecimal;
import javax.persistence.FetchType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;
import br.net.lls.cadastro.FazendaProdutor;

@Entity
public class Milho {
	
	@Id
	@NotNull(message="{cadastro.id.nulo}", groups = {MilhoValida.class})
	private int id;

	@NotNull(message="{cadastro.valor.nulo}", groups = {MilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal bruto;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {MilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal liquidoEntrada;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {MilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal liquidoSaida;
	
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataEntrada;
	
	@Column(nullable = true)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataSaida;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {MilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal total;
	
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataFaturamento;
	
	@OneToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.EAGER, orphanRemoval = true)
	@PrimaryKeyJoinColumn
	private FazendaProdutor fazendaProdutor;

	public interface MilhoValida{}

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return this.id;
	}

	public void setBruto(BigDecimal bruto) {
		this.bruto = bruto;
	}

	public BigDecimal getBruto() {
		return this.bruto;
	}

	public void setLiquidoEntrada(BigDecimal liquidoEntrada) {
		this.liquidoEntrada = liquidoEntrada;
	}

	public BigDecimal getLiquidoEntrada() {
		return this.liquidoEntrada;
	}

	public void setLiquidoSaida(BigDecimal liquidoSaida) {
		this.liquidoSaida = liquidoSaida;
	}

	public BigDecimal getLiquidoSaida() {
		return this.liquidoSaida;
	}

	public void setDataEntrada(Calendar dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public Calendar getDataEntrada() {
		return this.dataEntrada;
	}

	public String getDataEntradaText() {
		if (getDataEntrada() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getDataEntrada());
			return dataFormatada.format(getDataEntrada().getTime());
		}
		else {
			 return "";
		}
	}

	public void setDataSaida(Calendar dataSaida) {
		this.dataSaida = dataSaida;
	}

	public Calendar getDataSaida() {
		return this.dataSaida;
	}

	public String getDataSaidaText() {
		if (getDataSaida() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getDataSaida());
			return dataFormatada.format(getDataSaida().getTime());
		}
		else {
			 return "";
		}
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public BigDecimal getTotal() {
		return this.total;
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
