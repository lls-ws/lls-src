package br.net.lls.cafe;

import java.io.Serializable;
 
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.Lote;
 
@Embeddable
public class OscafeDespejoId implements Serializable { 
    
    @ManyToOne
    private Oscafe oscafe;
    
    @ManyToOne
    private Lote lote;
 
    public Oscafe getOscafe() {
        return oscafe;
    }
 
    public void setOscafe(Oscafe oscafe) {
        this.oscafe = oscafe;
    }
 
    public Lote getLote() {
        return lote;
    }
 
    public void setLote(Lote lote) {
        this.lote = lote;
    }
    
}
