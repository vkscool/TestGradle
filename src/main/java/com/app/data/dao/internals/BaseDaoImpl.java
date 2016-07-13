package com.app.data.dao.internals;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.app.data.dao.BaseDao;
import com.app.data.entity.Base;

@Repository
public class BaseDaoImpl implements BaseDao{

	private final static Logger logger = LogManager.getLogger(BaseDaoImpl.class);
	
	@PersistenceContext
	private EntityManager em;
	
	@Override
	public void saveEntity(Base entity){
		em.persist(entity);
	}
	
	@Override
	public void updateEntity(Base entity){
		//em.unwrap(Session.class).update(entity);
		em.merge(entity);
	}
	
	@Override
	public void saveOrUpdateEntity(Base entity){
		em.unwrap(Session.class).saveOrUpdate(entity);
	}
	
	@Override
	public void deleteEntity(Base entity) {
		em.remove(entity);
	}
	
	@Override
	public void saveAllEntity(List<Base> entities){
		if(entities!=null){
			for(Base s : entities){
				em.persist(s);
			}
		}
	}

	@Override
	public void saveUpdateAllEntity(List<Base> entities) {
		logger.debug("--------Saving/Updating Entities {}",entities);
		if(entities!=null && entities.size()>0){
			Session ss = em.unwrap(Session.class);
			for(Base s : entities){
				ss.saveOrUpdate(s);
			}
		}
	}
	
	@Override
	public void deleteAllEntity(List<Base> entities) {
		if(entities!=null){
			for(Base s : entities){
				em.remove(s);
			}
		}
	}
	
	@Override
	public void refresEntity(Base entity){
		em.refresh(entity);
	}

	@Override
	public <T extends Base> T findOneByStateLessSession(int id, Class<T> type) {
		logger.debug("Using stateless session ");
		/*StatelessSession session = em.unwrap(Session.class).getSessionFactory().openStatelessSession();
		Object o = null;
		try{
			logger.debug("Looking in database {}",id);
			o = session.get(type, id);
			logger.debug("Looked into database {}",o);
		}catch(Exception e){
			logger.error("Error in Getting entity using stateless session {}",e);
			e.printStackTrace();
		}finally{
			logger.debug("Closing the stateless session");
			try{
				session.close();
			}catch(Exception e){
				logger.error("Error Clossing session {}",e);
			}
		}
		return (T) o!=null?(T)o:null;*/
		return null;
	}
	
	public java.sql.Connection getConnection(){
		return em.unwrap(java.sql.Connection.class);
	}
	
	@SuppressWarnings(value="unchecked")
	@Override
	public List<Object[]> runNativeQuery(String query){
		Query q = em.createNativeQuery(query);
		return q.getResultList();
	}
}
