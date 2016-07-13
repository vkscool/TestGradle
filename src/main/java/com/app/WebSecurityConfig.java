package com.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.app.services.CustomUserDetailsService;
import com.app.web.handlers.AuthenticationFailureHandler;
import com.app.web.handlers.AuthenticationSuccessHandler;

/**
 * @author vkscool
 *
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
    protected void configure(AuthenticationManagerBuilder registry) throws Exception {
		registry.userDetailsService(customUserDetailsService);
    }
	
	@Override
	public void configure(WebSecurity web) throws Exception {
	    web.ignoring()
	         .antMatchers("/app/**"); // #3
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    http
	    .csrf().disable()
	    .authorizeRequests()
	    	.antMatchers("/","/rest/login","/login/form**","/register/form","/logout").permitAll() // #4
	        .antMatchers("/admin","/admin/**").hasRole("ADMIN") // #6
	        .antMatchers("/user","/user/**").hasRole("USER") // #6
	        .anyRequest().permitAll() // 7
	        .and()
	    .formLogin()  // #8
	        .loginPage("/login/form") // #9
	        .loginProcessingUrl("/rest/login")
	        .usernameParameter("username")
	        .passwordParameter("password")
	        .failureUrl("/login/form?error")
	        .successHandler(new AuthenticationSuccessHandler())
            .failureHandler(new AuthenticationFailureHandler())
	        .permitAll(); // #5
	    
	}
}
