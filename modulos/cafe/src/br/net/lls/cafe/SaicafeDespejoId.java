package br.net.lls.cafe;

import java.io.Serializable;
 
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.Lote;
 
@Embeddable
public class SaicafeDespejoId implements Serializable { 
    
    @ManyToOne
    private Saicafe saicafe;
    
    @ManyToOne
    private Lote lote;
 
    public Saicafe getSaicafe() {
        return saicafe;
    }
 
    public void setSaicafe(Saicafe saicafe) {
        this.saicafe = saicafe;
    }
 
    public Lote getLote() {
        return lote;
    }
 
    public void setLote(Lote lote) {
        this.lote = lote;
    }
}
