package br.net.lls.cafe;

import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.EmbeddedId;
import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;

import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.Lote;

@Entity
@Table(name = "Oscafe_Despejo")
@AssociationOverrides({
@AssociationOverride(name = "primaryKey.oscafe", joinColumns = @JoinColumn(name = "oscafe_id")),
@AssociationOverride(name = "primaryKey.lote", joinColumns = @JoinColumn(name = "lote_id")) })
public class OscafeDespejo {
	
	@EmbeddedId
	private OscafeDespejoId primaryKey = new OscafeDespejoId();
	
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacas;
	
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal peso;
	
	public interface OscafeDespejoValida{}
	
	public OscafeDespejoId getPrimaryKey() {
        return primaryKey;
    }
 
    public void setPrimaryKey(OscafeDespejoId primaryKey) {
        this.primaryKey = primaryKey;
    }
	
	@Transient
	public Oscafe getOscafe() {
		return getPrimaryKey().getOscafe();
	}

	public void setOscafe(Oscafe oscafe) {
		getPrimaryKey().setOscafe(oscafe);
	}

	@Transient
	public Lote getLote() {
		return getPrimaryKey().getLote();
	}

	public void setLote(Lote lote) {
		getPrimaryKey().setLote(lote);
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
	
}
