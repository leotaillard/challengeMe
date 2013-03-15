/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ch.comem.test;

import ch.comem.services.BadgesManagerLocal;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.jws.WebService;

/**
 *
 * @author Leo
 */
@Stateless
@WebService
public class TestDataManager implements TestDataManagerLocal {
    @EJB
    private BadgesManagerLocal badgesManager;

    @Override
    public void test(String generateTestData) {
        
        for(int i=0;i<100;i++){
        
            badgesManager.createBadge("test + "+i, "valeur");
            
        }
    }


}
