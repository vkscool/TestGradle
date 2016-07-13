/**
 * 
 */
package com.app.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.app.data.entity.User;
import com.app.domains.SecurityUser;


/**
 * @author vkscool
 *
 */
@Component
public class CustomUserDetailsService implements UserDetailsService{
	
	private static final Logger logger = LogManager.getLogger(CustomUserDetailsService.class);

	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		logger.debug("Loading user by username "+userName+" - ");
		User user = userService.findUserByEmail(userName);
		if(user == null){
			throw new UsernameNotFoundException("UserName "+userName+" not found");
		}
		logger.debug("With password "+user.getPassword()+" "+user.getStatus());
		return new SecurityUser(user);
	}
}
