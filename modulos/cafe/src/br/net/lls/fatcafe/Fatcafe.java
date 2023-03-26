package br.net.lls.fatcafe;

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
public class Fatcafe {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {FatcafeValida.class})
	private int id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int saldoAnterior;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int entradas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int saidas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int quebras;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int acrescimos;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int recebidas;

	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int emitidas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int saldo;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal armazenagem;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal servicos;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {FatcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal total;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;

	public interface FatcafeValida{}

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

	public void setSaldoAnterior(int saldoAnterior) {
		this.saldoAnterior = saldoAnterior;
	}

	public int getSaldoAnterior() {
		return this.saldoAnterior;
	}

	public void setEntradas(int entradas) {
		this.entradas = entradas;
	}

	public int getEntradas() {
		return this.entradas;
	}

	public void setSaidas(int saidas) {
		this.saidas = saidas;
	}

	public int getSaidas() {
		return this.saidas;
	}
	
	public void setQuebras(int quebras) {
		this.quebras = quebras;
	}

	public int getQuebras() {
		return this.quebras;
	}

	public void setAcrescimos(int acrescimos) {
		this.acrescimos = acrescimos;
	}

	public int getAcrescimos() {
		return this.acrescimos;
	}

	public void setRecebidas(int recebidas) {
		this.recebidas = recebidas;
	}

	public int getRecebidas() {
		return this.recebidas;
	}

	public void setEmitidas(int emitidas) {
		this.emitidas = emitidas;
	}

	public int getEmitidas() {
		return this.emitidas;
	}
	
	public void setSaldo(int saldo) {
		this.saldo = saldo;
	}

	public int getSaldo() {
		return this.saldo;
	}
	
	public void setArmazenagem(BigDecimal armazenagem) {
		this.armazenagem = armazenagem;
	}
	
	public BigDecimal getArmazenagem() {
		return this.armazenagem;
	}
	
	public void setServicos(BigDecimal servicos) {
		this.servicos = servicos;
	}
	
	public BigDecimal getServicos() {
		return this.servicos;
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
