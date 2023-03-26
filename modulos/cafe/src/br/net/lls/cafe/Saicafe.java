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
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;
import org.apache.commons.lang.StringUtils;

import br.net.lls.componentes.Data;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cafe.SaicafeDespejo;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Status;
import br.net.lls.fatcafe.Servcafe;

@Entity
public class Saicafe {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {SaicafeValida.class})
	private int id;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@Column(length = 8, nullable = false, unique = true)
	@Size(min=1, max=8, message="{cafe.lote.tamanho}", groups = {SaicafeValida.class})
	private String lote;
	
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacas;
	
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal peso;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cafe.destino.maximo}", groups = {SaicafeValida.class})
	private String destino;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {SaicafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int ticket = 0;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {SaicafeValida.class})
	private String obs;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cadastro.usuario.maximo}", groups = {SaicafeValida.class})
	private String usuario;
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int sacasSaida;
	
	@Column(nullable = true, unique = false, columnDefinition="Decimal(16, 2) default '0.00'")
	private BigDecimal pesoSaida = new BigDecimal(0.00);
	
	@Column(length = 9, columnDefinition = "varchar(9) default 'ABERTA'")
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'Y'")
	private boolean cobrar = true;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "primaryKey.saicafe", cascade = CascadeType.ALL)
	@OrderBy(value="primaryKey.lote")
	private Set<SaicafeDespejo> saicafeDespejos = new HashSet<SaicafeDespejo>(0);
	
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(name = "Saicafe_Servcafe", joinColumns = {@JoinColumn(name = "saicafe_id") },
		inverseJoinColumns = { @JoinColumn(name = "servcafe_id") })
	@OrderBy(value="lote")
	private Set<Servcafe> servcafes = new HashSet<Servcafe>(0);
	
	public interface SaicafeValida{}
	
	public Set<Servcafe> getServcafes() {
		return this.servcafes;
	}
	
	public void setServcafes(Set<Servcafe> servcafes) {
		this.servcafes = servcafes;
	}
	
	public Set<SaicafeDespejo> getSaicafeDespejos() {
		return this.saicafeDespejos;
	}
	
	public void setSaicafeDespejos(Set<SaicafeDespejo> saicafeDespejos) {
		this.saicafeDespejos = saicafeDespejos;
	}
	
	public void addSaicafeDespejo(SaicafeDespejo saicafeDespejo) {
        this.saicafeDespejos.add(saicafeDespejo);
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
	
	public void setDestino(String destino) {
		this.destino = destino;
	}
	
	public String getDestino() {
		return this.destino;
	}
	
	public void setTicket(int ticket) {
		this.ticket = ticket;
	}
	
	public int getTicket() {
		return this.ticket;
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
	
	public void setSacasSaida(int sacasSaida) {
		this.sacasSaida = sacasSaida;
	}
	
	public int getSacasSaida() {
		return this.sacasSaida;
	}
	
	public void setPesoSaida(BigDecimal pesoSaida) {
		this.pesoSaida = pesoSaida;
	}
	
	public BigDecimal getPesoSaida() {
		return this.pesoSaida;
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
	
	public void setCobrar(boolean cobrar) {
		
		this.cobrar = cobrar;
		
	}
	
	public boolean getCobrar() {
		
		return this.cobrar;
		
	}
	
	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}
	
}
