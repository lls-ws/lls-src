package br.net.lls.fatmilho;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.math.BigDecimal;

import br.net.lls.cadastro.FazendaProdutor;

@Entity
public class Fatmilho {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {FatmilhoValida.class})
	private int id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal saldoAnterior;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal entradas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal saidas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal saldo;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal limpeza;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal secagem;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal carga;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal recepcao;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal armazenagem;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal total;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;

	public interface FatmilhoValida{}

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return this.id;
	}

	public void setData(Calendar data) {
		this.data = data;
	}

	public Calendar getData() {
		return this.data;
	}

	public String getDataText() {
		if (getData() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getData());
			return dataFormatada.format(getData().getTime());
		}
		else {
			 return "";
		}
	}

	public void setSaldoAnterior(BigDecimal saldoAnterior) {
		this.saldoAnterior = saldoAnterior;
	}

	public BigDecimal getSaldoAnterior() {
		return this.saldoAnterior;
	}

	public void setEntradas(BigDecimal entradas) {
		this.entradas = entradas;
	}

	public BigDecimal getEntradas() {
		return this.entradas;
	}

	public void setSaidas(BigDecimal saidas) {
		this.saidas = saidas;
	}

	public BigDecimal getSaidas() {
		return this.saidas;
	}
	
	public void setSaldo(BigDecimal saldo) {
		this.saldo = saldo;
	}

	public BigDecimal getSaldo() {
		return this.saldo;
	}
	
	public void setLimpeza(BigDecimal limpeza) {
		this.limpeza = limpeza;
	}

	public BigDecimal getLimpeza() {
		return this.limpeza;
	}

	public void setSecagem(BigDecimal secagem) {
		this.secagem = secagem;
	}

	public BigDecimal getSecagem() {
		return this.secagem;
	}

	public void setCarga(BigDecimal carga) {
		this.carga = carga;
	}

	public BigDecimal getCarga() {
		return this.carga;
	}

	public void setRecepcao(BigDecimal recepcao) {
		this.recepcao = recepcao;
	}

	public BigDecimal getRecepcao() {
		return this.recepcao;
	}
	
	public void setArmazenagem(BigDecimal armazenagem) {
		this.armazenagem = armazenagem;
	}
	
	public BigDecimal getArmazenagem() {
		return this.armazenagem;
	}
	
	public void setTotal(BigDecimal total) {
		this.total = total;
	}
	
	public BigDecimal getTotal() {
		return this.total;
	}
	
	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}
	
}
