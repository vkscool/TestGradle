package com.app.data.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="role")
public class Role extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="name",unique=true)
	private String name;
	
	@Column(name="description",columnDefinition="TEXT")
	private String description;
	
	@OneToMany(mappedBy="role", cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<RoleActivityMap> activityMap;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<RoleActivityMap> getActivityMap() {
		return activityMap;
	}

	public void setActivityMap(List<RoleActivityMap> activityMap) {
		this.activityMap = activityMap;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
