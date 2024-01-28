package br.net.lls.milho;

import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;
import javax.persistence.Column;

import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import java.util.Calendar;
import java.text.SimpleDateFormat;

import java.math.BigDecimal;

public class Tramilho {

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@NotNull(message="{remover.id.nulo}", groups = {TramilhoValida.class})
	private int idFazendaSaida;
	
	@NotNull(message="{remover.id.nulo}", groups = {TramilhoValida.class})
	private int idFazendaEntrada;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {TramilhoValida.class})
	private BigDecimal liquido;
	
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {TramilhoValida.class})
	private String obs;

	public interface TramilhoValida{}

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

	public void setIdFazendaSaida(int idFazendaSaida) {
		this.idFazendaSaida = idFazendaSaida;
	}
	
	public int getIdFazendaSaida() {
		return this.idFazendaSaida;
	}
	
	public void setIdFazendaEntrada(int idFazendaEntrada) {
		this.idFazendaEntrada = idFazendaEntrada;
	}
	
	public int getIdFazendaEntrada() {
		return this.idFazendaEntrada;
	}
	
	public void setLiquido(BigDecimal liquido) {
		this.liquido = liquido;
	}

	public BigDecimal getLiquido() {
		return this.liquido;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public String getObs() {
		return this.obs;
	}

}
