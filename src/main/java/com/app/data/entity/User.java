package com.app.data.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="user")
public class User extends Base{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="name")
	private String name;
	
	@Column(name="email",unique=true)
	private String email;
	
	@Column(name="password")
	private String password;
	
	@Column(name="source")
	private String source;
	
	@Column(name="image_path")
	private String imagePath;
	
	@OneToOne(mappedBy="user",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="profile_id")
	private Profile profile;
	
	@OneToOne(mappedBy="user",cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	@JoinColumn(name="user_detail_id")
	private UserDetails userDetails;
	
	@JsonIgnore
	@OneToMany(mappedBy="moduleId.user",fetch=FetchType.EAGER,cascade=CascadeType.REMOVE,orphanRemoval=true)
	private Set<UserRoleMap> userRoles;
	
	@Transient
	private Set<Role> roles;
	
	public Set<Role> getRoles() {
		Set<UserRoleMap> urm = getUserRoles();
		if(urm!=null && !urm.isEmpty()){
			roles = new HashSet<Role>();
			for(UserRoleMap urmm:urm){
				roles.add(urmm.getModuleId().getRole());
			}
		}
		return roles;
	}
	
	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public UserDetails getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		this.userDetails = userDetails;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public Set<UserRoleMap> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<UserRoleMap> userRoles) {
		this.userRoles = userRoles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
}
