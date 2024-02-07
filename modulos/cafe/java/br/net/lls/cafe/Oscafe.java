package br.net.lls.cafe;

import java.util.Set;
import java.util.HashSet;
import java.util.Calendar;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OrderBy;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.apache.commons.lang.StringUtils;

import br.net.lls.componentes.Data;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cafe.OscafeDespejo;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Status;
import br.net.lls.fatcafe.Servcafe;

@Entity
public class Oscafe {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {OscafeValida.class})
	private int id;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@Column(length = 8, nullable = false, unique = true)
	@Size(min=1, max=8, message="{cafe.lote.tamanho}", groups = {OscafeValida.class})
	private String lote;
	
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacas;
	
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal peso;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cafe.instrucoes.maximo}", groups = {OscafeValida.class})
	private String instrucoes;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {OscafeValida.class})
	private String obs;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cadastro.usuario.maximo}", groups = {OscafeValida.class})
	private String usuario;
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int desdobras;
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int sacasQuebra;
	
	@Column(nullable = true, unique = false, columnDefinition="Decimal(16, 2) default '0.00'")
	private BigDecimal pesoQuebra = new BigDecimal(0.00);
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int sacasAcrescimo;
	
	@Column(nullable = true, unique = false, columnDefinition="Decimal(16, 2) default '0.00'")
	private BigDecimal pesoAcrescimo = new BigDecimal(0.00);
	
	@Column(length = 9, columnDefinition = "varchar(9) default 'ABERTA'")
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "primaryKey.oscafe", cascade = CascadeType.ALL)
	@OrderBy(value="primaryKey.lote")
	private Set<OscafeDespejo> oscafeDespejos = new HashSet<OscafeDespejo>(0);
	
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(name = "Oscafe_Lote", joinColumns = {@JoinColumn(name = "oscafe_id") },
		inverseJoinColumns = { @JoinColumn(name = "lote_id") })
	@OrderBy(value="lote")
	private Set<Lote> lotes = new HashSet<Lote>(0);
	
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(name = "Oscafe_Servcafe", joinColumns = {@JoinColumn(name = "oscafe_id") },
		inverseJoinColumns = { @JoinColumn(name = "servcafe_id") })
	@OrderBy(value="lote")
	private Set<Servcafe> servcafes = new HashSet<Servcafe>(0);
	
	public interface OscafeValida{}
	
	public Set<Servcafe> getServcafes() {
		return this.servcafes;
	}
	
	public void setServcafes(Set<Servcafe> servcafes) {
		this.servcafes = servcafes;
	}
	
	public Set<Lote> getLotes() {
		return this.lotes;
	}
	
	public void setLotes(Set<Lote> lotes) {
		this.lotes = lotes;
	}
	
	public Set<OscafeDespejo> getOscafeDespejos() {
		return this.oscafeDespejos;
	}
	
	public void setOscafeDespejos(Set<OscafeDespejo> oscafeDespejos) {
		this.oscafeDespejos = oscafeDespejos;
	}
	
	public void addOscafeDespejo(OscafeDespejo oscafeDespejo) {
        this.oscafeDespejos.add(oscafeDespejo);
    }
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setLote(String lote) {
		this.lote = lote;
	}
	
	public String getLote() {
		return this.lote;
	}
	
	public void setData(Calendar data) {
		this.data = data;
	}
	
	public Calendar getData() {
		return this.data;
	}
	
	public String getDate() {
		return Data.getDate(getData());
	}
	
	public String getDataText() {
		return Data.getDataText(getData());
	}
	
	public void setSacas(int sacas) {
		this.sacas = sacas;
	}
	
	public int getSacas() {
		return this.sacas;
	}
	
	public void setPeso(BigDecimal peso) {
		this.peso = peso;
	}
	
	public BigDecimal getPeso() {
		return this.peso;
	}
	
	public void setInstrucoes(String instrucoes) {
		this.instrucoes = instrucoes;
	}
	
	public String getInstrucoes() {
		return this.instrucoes;
	}
	
	public void setObservacao(String obs) {
		this.obs = obs;
	}
	
	public String getObservacao() {
		return this.obs;
	}
	
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	
	public String getUsuario() {
		return this.usuario;
	}
	
	public void setDesdobras(int desdobras) {
		this.desdobras = desdobras;
	}
	
	public int getDesdobras() {
		return this.desdobras;
	}
	
	public void setSacasQuebra(int sacasQuebra) {
		this.sacasQuebra = sacasQuebra;
	}
	
	public int getSacasQuebra() {
		return this.sacasQuebra;
	}
	
	public void setPesoQuebra(BigDecimal pesoQuebra) {
		this.pesoQuebra = pesoQuebra;
	}
	
	public BigDecimal getPesoQuebra() {
		return this.pesoQuebra;
	}
	
	public void setSacasAcrescimo(int sacasAcrescimo) {
		this.sacasAcrescimo = sacasAcrescimo;
	}
	
	public int getSacasAcrescimo() {
		return this.sacasAcrescimo;
	}
	
	public void setPesoAcrescimo(BigDecimal pesoAcrescimo) {
		this.pesoAcrescimo = pesoAcrescimo;
	}
	
	public BigDecimal getPesoAcrescimo() {
		return this.pesoAcrescimo;
	}
	
	public void setStatus(Status status) {
		
		this.status = status;
		
	}
	
	public Status getStatus() {
		
		return this.status;
		
	}
	
	public String getStatusNome() {
		
		if (this.status == null) return "";
		else return StringUtils.capitalize(this.status.getStatusNome(this.status).toLowerCase());
		
	}
	
	public void setStatusDespejado(boolean despejado) {
		
		if (despejado) setStatus(Status.DESPEJADA);
		else setStatus(Status.ABERTA);
		
	}
	
	public void setStatusFechado(boolean fechado) {
		
		if (fechado) setStatus(Status.FECHADA);
		else setStatus(Status.DESPEJADA);
		
	}
	
	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}
	
}
