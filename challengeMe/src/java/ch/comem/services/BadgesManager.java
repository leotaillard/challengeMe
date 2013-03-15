/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ch.comem.services;

import ch.comem.models.Badge;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Leo
 */
@Stateless
public class BadgesManager implements BadgesManagerLocal {
    @PersistenceContext(unitName = "challengeMePU")
    private EntityManager em;

    public void persist(Object object) {
        em.persist(object);
    }

    @Override
    public Long createBadge(String title, String description) {
        
        Badge badge = new Badge();
        
        badge.setTitle(title);
        badge.setDescription(description);
        
        em.persist(badge);
        em.flush();
        
        return badge.getId();
        
    }

    
    

}
