/**
 * 
 */
package com.app.domains;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.data.entity.Role;
import com.app.data.entity.User;
import com.app.utils.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * @author vkscool
 *
 */
public class SecurityUser extends User implements UserDetails
{

	private final static Logger logger = LogManager.getLogger(SecurityUser.class);
	private static final long serialVersionUID = 1L;
	
	public SecurityUser(User user) {
		logger.debug("Security user is created");
		if(user != null)
		{
			this.setId(user.getId());
			this.setEmail(user.getEmail());
			this.setPassword(user.getPassword());
			this.setName(user.getName());
			this.setRoles(user.getRoles());
			this.setImagePath(user.getImagePath());
		}		
	}
	
	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		Set<Role> userRoles = this.getRoles();
		if(userRoles != null)
		{
			for (Role role : userRoles) {
				SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getName());
				authorities.add(authority);
			}
		}
		return authorities;
	}

	@Override
	@JsonIgnore
	public String getPassword() {
		return super.getPassword();
	}

	@Override
	@JsonIgnore
	public String getUsername() {
		return super.getEmail();
	}
	
	@JsonProperty
	public void setUsername(String username) {
		this.setEmail(username);
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return super.getStatus()!=Status.DISABLED;
	}

	@Override
	public boolean isAccountNonExpired() {
		return super.getStatus()!=Status.EXPIRED;
	}

	@Override
	public boolean isAccountNonLocked() {
		return super.getStatus()!=Status.LOCKED;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return super.getStatus()!=Status.CREDENTIALS_EXPIRED;
	}
}

