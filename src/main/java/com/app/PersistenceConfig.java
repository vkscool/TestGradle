package com.app;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages="com.app.data.repositories")
public class PersistenceConfig {

	private static final Logger logger = LogManager.getLogger(PersistenceConfig.class);

	@Autowired
	private Environment env;

	@Value("${init-db:false}")
	private String initDatabase;

	/*@Bean
	public PlatformTransactionManager transactionManager(LocalContainerEntityManagerFactoryBean entityManagerFactory)
	{
		EntityManagerFactory factory = entityManagerFactory.getObject();
		return new JpaTransactionManager(factory);
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource, JpaVendorAdapter jpaVendorAdapter)
	{
		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

		factory.setDataSource(dataSource);
		factory.setJpaVendorAdapter(jpaVendorAdapter);
		factory.setPackagesToScan("com.app.data.entity");

		Properties jpaProperties = new Properties();
		jpaProperties.put("hibernate.dialect",env.getProperty("spring.jpa.hibernate.dialect"));
		jpaProperties.put("hibernate.hbm2ddl.auto", env.getProperty("spring.jpa.hibernate.ddl-auto"));
		factory.setJpaProperties(jpaProperties);

		factory.afterPropertiesSet();
		factory.setLoadTimeWeaver(new InstrumentationLoadTimeWeaver());
		return factory;
	}

	@Bean(destroyMethod = "close")
	public DataSource dataSource(){
	    HikariConfig hikariConfig = new HikariConfig();
	    hikariConfig.setDataSourceClassName(env.getProperty("spring.datasource.driver-class-name"));
	    hikariConfig.setJdbcUrl(env.getProperty("spring.datasource.url")); 
	    hikariConfig.setUsername(env.getProperty("spring.datasource.username"));
	    hikariConfig.setPassword(env.getProperty("spring.datasource.password"));

	    int maxPoolSize = 50;
	    String max = env.getProperty("spring.datasource.max-pool-size");
	    if(StringUtils.isNotBlank(max)){
	    	try{
	    		maxPoolSize = Integer.parseInt(max);
	    	}catch(Exception e){
	    		logger.error("configuration:spring.datasource.max-pool-size is not present in application.properties");
	    	}
	    }
	    hikariConfig.setMaximumPoolSize(maxPoolSize);
	    hikariConfig.setConnectionTestQuery("SELECT 1");
	    hikariConfig.setPoolName("springHikariCP");

	    //hikariConfig.addDataSourceProperty("cachePrepStmts", "true");
	    //hikariConfig.addDataSourceProperty("prepStmtCacheSize", "250");
	    //hikariConfig.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
	    //hikariConfig.addDataSourceProperty("useServerPrepStmts", "true");

	    HikariDataSource dataSource = new HikariDataSource(hikariConfig);

	    return dataSource;
	}

	@Bean
	public JpaVendorAdapter jpaVendorAdapter(){
		HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
		adapter.setDatabase(Database.MYSQL);
		adapter.setShowSql(true);
		adapter.setGenerateDdl(true);
		//I'm using MySQL5InnoDBDialect to make my tables support foreign keys
		adapter.setDatabasePlatform("com.app.utils.CustomMysqlDialect");
		return adapter;
	}

	@Bean
	public DataSourceInitializer dataSourceInitializer(DataSource dataSource) 
	{
		System.out.println("**************************"+initDatabase);
		DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
		dataSourceInitializer.setDataSource(dataSource);
		ResourceDatabasePopulator databasePopulator = new ResourceDatabasePopulator();
		databasePopulator.addScript(new ClassPathResource("db.sql"));
		dataSourceInitializer.setDatabasePopulator(databasePopulator);
		dataSourceInitializer.setEnabled(Boolean.parseBoolean(initDatabase));
		return dataSourceInitializer;
	}

	@Bean
	public HibernateExceptionTranslator hibernateExceptionTranslator()
	{
		return new HibernateExceptionTranslator();
	}*/


	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(dataSource());
		em.setPackagesToScan(new String[] { "com.app.data.entity" });

		JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdapter);
		em.setJpaProperties(additionalProperties());

		return em;
	}

	@Bean
	public DataSource dataSource(){
		/*DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/corplinkztest");
		dataSource.setUsername( "root" );
		dataSource.setPassword( "admin" );
		return dataSource;*/
		
		HikariConfig hikariConfig = new HikariConfig();
	    hikariConfig.setDataSourceClassName(env.getProperty("spring.datasource.driver-class-name"));
	    hikariConfig.setJdbcUrl(env.getProperty("spring.datasource.url")); 
	    hikariConfig.setUsername(env.getProperty("spring.datasource.username"));
	    hikariConfig.setPassword(env.getProperty("spring.datasource.password"));

	    int maxPoolSize = 50;
	    String max = env.getProperty("spring.datasource.max-pool-size");
	    if(StringUtils.isNotBlank(max)){
	    	try{
	    		maxPoolSize = Integer.parseInt(max);
	    	}catch(Exception e){
	    		logger.error("configuration:spring.datasource.max-pool-size is not present in application.properties");
	    	}
	    }
	    hikariConfig.setMaximumPoolSize(5);
	    //hikariConfig.setMaxLifetime(30000);
	    hikariConfig.setIdleTimeout(30000);
	    hikariConfig.setConnectionTestQuery("SELECT 1");
	    hikariConfig.setPoolName("springHikariCP");
	    
	    hikariConfig.addDataSourceProperty("databaseName",env.getProperty("spring.datasource.dbname"));
	    hikariConfig.addDataSourceProperty("cachePrepStmts", "true");
	    hikariConfig.addDataSourceProperty("prepStmtCacheSize", "250");
	    hikariConfig.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
	    hikariConfig.addDataSourceProperty("useServerPrepStmts", "true");

	    HikariDataSource dataSource = new HikariDataSource(hikariConfig);

	    return dataSource;
	}

	@Bean
	public PlatformTransactionManager transactionManager(EntityManagerFactory emf){
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(emf);

		return transactionManager;
	}

	@Bean
	public PersistenceExceptionTranslationPostProcessor exceptionTranslation(){
		return new PersistenceExceptionTranslationPostProcessor();
	}

	Properties additionalProperties() {
		Properties properties = new Properties();
		properties.setProperty("hibernate.hbm2ddl.auto", "update");
		properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
		return properties;
	}


	/*@Bean
	public SessionFactory getSessionFactory(DataSource dataSource) {

	    LocalSessionFactoryBuilder sessionBuilder = new LocalSessionFactoryBuilder(dataSource);

	    sessionBuilder.scanPackages("com.app.data.entity");
	    //sessionBuilder.addAnnotatedClasses(User.class);
	    sessionBuilder.addProperties(getHibernateProperties());	 
	    return sessionBuilder.buildSessionFactory();
	}

	private Properties getHibernateProperties() {
	    Properties properties = new Properties();
	    properties.put("hibernate.show_sql", "true");
	    properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
	    return properties;
	}*/
}
