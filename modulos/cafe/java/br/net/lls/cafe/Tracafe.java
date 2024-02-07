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
import br.net.lls.cafe.TracafeDespejo;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Status;

@Entity
public class Tracafe {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {TracafeValida.class})
	private int id;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@Column(length = 8, nullable = false, unique = true)
	@Size(min=1, max=8, message="{cafe.lote.tamanho}", groups = {TracafeValida.class})
	private String lote;
	
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacas;
	
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal peso;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {TracafeValida.class})
	private String obs;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cadastro.usuario.maximo}", groups = {TracafeValida.class})
	private String usuario;
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int desdobras;
	
	@Column(length = 9, columnDefinition = "varchar(9) default 'ABERTA'")
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	@ManyToOne
	private FazendaProdutor fazendaDestino;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "primaryKey.tracafe", cascade = CascadeType.ALL)
	@OrderBy(value="primaryKey.lote")
	private Set<TracafeDespejo> tracafeDespejos = new HashSet<TracafeDespejo>(0);
	
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(name = "Tracafe_Lote", joinColumns = {@JoinColumn(name = "tracafe_id") },
		inverseJoinColumns = { @JoinColumn(name = "lote_id") })
	@OrderBy(value="lote")
	private Set<Lote> lotes = new HashSet<Lote>(0);
	
	public interface TracafeValida{}
	
	public Set<Lote> getLotes() {
		return this.lotes;
	}
	
	public void setLotes(Set<Lote> lotes) {
		this.lotes = lotes;
	}
	
	public Set<TracafeDespejo> getTracafeDespejos() {
		return this.tracafeDespejos;
	}
	
	public void setTracafeDespejos(Set<TracafeDespejo> tracafeDespejos) {
		this.tracafeDespejos = tracafeDespejos;
	}
	
	public void addTracafeDespejo(TracafeDespejo tracafeDespejo) {
        this.tracafeDespejos.add(tracafeDespejo);
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
	
	public void setFazendaDestino(FazendaProdutor fazendaDestino) {
		
		this.fazendaDestino = fazendaDestino;
		
	}
	
	public FazendaProdutor getFazendaDestino() {
		
		return this.fazendaDestino;
		
	}
	
}
