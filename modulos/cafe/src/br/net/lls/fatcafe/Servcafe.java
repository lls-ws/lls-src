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
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import java.util.HashSet;
import java.util.Set;

import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.Preco;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.Oscafe;
import br.net.lls.fatcafe.Baixacafe;

@Entity
public class Servcafe {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {ServcafeValida.class})
	private int id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;

	@Column(length = 10, nullable = true, unique = false)
	@Size(min=0, max=10, message="{cafe.lote.tamanho}", groups = {ServcafeValida.class})
	private String lote;

	@NotNull(message="{cadastro.valor.nulo}", groups = {ServcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacas;

	@NotNull(message="{cadastro.valor.nulo}", groups = {ServcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal valor;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {ServcafeValida.class})
	private String obs;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'N'")
	private boolean pago = false;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'N'")
	private boolean automatico = false;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	@ManyToOne
	private Preco preco;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "servCafe")
	private Set<Baixacafe> baixacafes = new HashSet<Baixacafe>();

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "servcafes")
	private Set<Entcafe> entcafes = new HashSet<Entcafe>(0);
	
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "servcafes")
	private Set<Saicafe> saicafes = new HashSet<Saicafe>(0);

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "servcafes")
	private Set<Oscafe> oscafes = new HashSet<Oscafe>(0);

	public interface ServcafeValida{}

	public Set<Oscafe> getOscafes() {
		return this.oscafes;
	}

	public void setOscafes(Set<Oscafe> oscafes) {
		this.oscafes = oscafes;
	}
	
	public void addOscafe(Oscafe oscafe) {
		getOscafes().add(oscafe);
		oscafe.getServcafes().add(this);
    }
	
	public void removeOscafe(Oscafe oscafe) {
		getOscafes().remove(oscafe);
		oscafe.getServcafes().remove(this);
    }

	public Set<Saicafe> getSaicafes() {
		return this.saicafes;
	}

	public void setSaicafes(Set<Saicafe> saicafes) {
		this.saicafes = saicafes;
	}
	
	public void addSaicafe(Saicafe saicafe) {
		getSaicafes().add(saicafe);
		saicafe.getServcafes().add(this);
    }
	
	public void removeSaicafe(Saicafe saicafe) {
		getSaicafes().remove(saicafe);
		saicafe.getServcafes().remove(this);
    }

	public Set<Entcafe> getEntcafes() {
		return this.entcafes;
	}

	public void setEntcafes(Set<Entcafe> entcafes) {
		this.entcafes = entcafes;
	}
	
	public void addEntcafe(Entcafe entcafe) {
		getEntcafes().add(entcafe);
		entcafe.getServcafes().add(this);
    }
	
	public void removeEntcafe(Entcafe entcafe) {
		getEntcafes().remove(entcafe);
		entcafe.getServcafes().remove(this);
    }

	public Set<Baixacafe> getBaixacafe() {
		return baixacafes;
	}

	public void setBaixacafe(Set<Baixacafe> baixacafes) {
		this.baixacafes = baixacafes;
	}

	public void addBaixacafe(Baixacafe baixacafe) {
		baixacafe.setServcafe(this);
		this.baixacafes.add(baixacafe);
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

	public void setLote(String lote) {
		this.lote = lote;
	}
	
	public String getLote() {
		return this.lote;
	}

	public void setSacas(int sacas) {
		this.sacas = sacas;
	}
	
	public int getSacas() {
		return this.sacas;
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
