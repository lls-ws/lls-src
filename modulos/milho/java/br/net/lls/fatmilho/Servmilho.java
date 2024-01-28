package br.net.lls.fatmilho;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import javax.validation.constraints.Size;
import java.math.BigDecimal;

import org.hibernate.annotations.Type;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.CascadeType;
import java.util.HashSet;
import java.util.Set;

import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.Preco;
import br.net.lls.fatmilho.Baixamilho;

@Entity
public class Servmilho {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {ServmilhoValida.class})
	private int id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;

	@NotNull(message="{cadastro.valor.nulo}", groups = {ServmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal liquido;

	@NotNull(message="{cadastro.valor.nulo}", groups = {ServmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal valor;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {ServmilhoValida.class})
	private String obs;
	
	@Type(type="yes_no")
	private boolean pago;
	
	@Type(type="yes_no")
	private boolean automatico;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	@ManyToOne
	private Preco preco;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "servMilho")
	private Set<Baixamilho> baixamilhos = new HashSet<Baixamilho>();

	public interface ServmilhoValida{}

	public Set<Baixamilho> getBaixamilho() {
		return baixamilhos;
	}

	public void setBaixamilho(Set<Baixamilho> baixamilhos) {
		this.baixamilhos = baixamilhos;
	}

	public void addBaixamilho(Baixamilho baixamilho) {
		baixamilho.setServmilho(this);
		this.baixamilhos.add(baixamilho);
	}

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

	public String getDate() {
		if (getData() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("yyyy-MM-dd");
			dataFormatada.setCalendar(getData());
			return dataFormatada.format(getData().getTime());
		}
		else {
			 return "";
		}
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

	public void setLiquido(BigDecimal liquido) {
		this.liquido = liquido;
	}
	
	public BigDecimal getLiquido() {
		return this.liquido;
	}
	
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	
	public BigDecimal getValor() {
		return this.valor;
	}
	
	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}
	
	public void setPreco(Preco preco) {
		
		this.preco = preco;
		
	}
	
	public Preco getPreco() {
		
		return this.preco;
		
	}
	
	public void setPago(boolean pago) {
		
		this.pago = pago;
		
	}
	
	public boolean getPago() {
		
		return this.pago;
		
	}
	
	public void setAutomatico(boolean automatico) {
		
		this.automatico = automatico;
		
	}
	
	public boolean getAutomatico() {
		
		return this.automatico;
		
	}
	
	public void setObs(String obs) {
		
		this.obs = obs;
	
	}

	public String getObs() {
	
		return this.obs;
	
	}
	
}
