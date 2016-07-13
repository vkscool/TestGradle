package com.app.utils;

import java.sql.Types;

import org.hibernate.dialect.MySQL5InnoDBDialect;
import org.hibernate.type.LongType;

public class CustomMysqlDialect extends MySQL5InnoDBDialect{

	public CustomMysqlDialect(){
		super();
		registerHibernateType(Types.BIGINT, LongType.INSTANCE.getName());
	}
}
