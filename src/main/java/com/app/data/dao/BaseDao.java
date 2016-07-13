package com.app.data.dao;

import java.util.List;

import com.app.data.entity.Base;

public interface BaseDao {

	void saveEntity(Base entity);

	void updateEntity(Base entity);

	void saveOrUpdateEntity(Base entity);

	void deleteEntity(Base entity);

	void saveAllEntity(List<Base> entities);

	void saveUpdateAllEntity(List<Base> entities);

	void deleteAllEntity(List<Base> entities);

	void refresEntity(Base entity);

	<T extends Base> T findOneByStateLessSession(int invoiceInternalId, Class<T> type);

	List<Object[]> runNativeQuery(String query);

}
