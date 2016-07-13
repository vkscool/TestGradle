package com.app.web;

import java.util.Properties;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@ComponentScan(basePackages = { "com.app.web"}) 
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter	{

	@Override
	public void addViewControllers(ViewControllerRegistry registry)
	{
		super.addViewControllers(registry);
		registry.addViewController("").setViewName("index");
		registry.addViewController("login/form").setViewName("index");
		registry.addViewController("register/form").setViewName("index");
		registry.addViewController("logout").setViewName("index");
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
	    //registry.addInterceptor(new CorsInterceptor());
	    //registry.addInterceptor(new LogInterceptor());
	    //registry.addInterceptor(new LogInterceptor()).addPathPatterns("/rest/*");
	}

	@Bean
	public ViewResolver resolver()
	{
		InternalResourceViewResolver url = new InternalResourceViewResolver();
		url.setPrefix("/WEB-INF/jsp/");
		url.setSuffix(".jsp");
		return url;
	}
	
	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver createMultipartResolver() {
	    CommonsMultipartResolver resolver=new CommonsMultipartResolver();
	    resolver.setDefaultEncoding("utf-8");
	    resolver.setMaxUploadSize(100000000);
	    return resolver;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry)
	{
		registry.addResourceHandler("/app/**").addResourceLocations("/app/");
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer)
	{
		configurer.enable();
	}

	/*@Bean(name = "messageSource")
	public MessageSource configureMessageSource()
	{
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:messages");
		messageSource.setCacheSeconds(5);
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}*/
	
	/*@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/rest/login")
		.allowedOrigins("*")
        .allowedMethods("POST","DELETE","PUT","GET","OPTIONS")
        .allowedHeaders("x-requested-with")
		//.allowCredentials(true)
		.maxAge(3600);
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/rest/login").allowedOrigins("*")
                .allowedMethods("PUT","DELETE","POST","GET","OPTIONS")
                .allowedHeaders("x-requested-with")
        		//.allowCredentials(true)
        		.maxAge(3600);
            }
        };
    }

	@Bean
	public SimpleMappingExceptionResolver simpleMappingExceptionResolver()
	{
		SimpleMappingExceptionResolver b = new SimpleMappingExceptionResolver();
		Properties mappings = new Properties();
		mappings.put("org.springframework.dao.DataAccessException", "error");
		b.setExceptionMappings(mappings);
		return b;
	}*/
}
