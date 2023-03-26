package br.net.lls.fatcafe;

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
import javax.persistence.ManyToOne;

import br.net.lls.fatcafe.Servcafe;

@Entity
public class Baixacafe {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {BaixacafeValida.class})
	private int id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;

	@NotNull(message="{cadastro.valor.nulo}", groups = {BaixacafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal valor;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {BaixacafeValida.class})
	private String obs;
	
	@ManyToOne
	private Servcafe servCafe;
	
	public interface BaixacafeValida{}

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

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	
	public BigDecimal getValor() {
		return this.valor;
	}
	
	public void setServcafe(Servcafe servCafe) {
		
		this.servCafe = servCafe;
		
	}
	
	public Servcafe getServcafe() {
		
		return this.servCafe;
		
	}
	
	public void setObs(String obs) {
		
		this.obs = obs;
	
	}

	public String getObs() {
	
		return this.obs;
	
	}
	
}
