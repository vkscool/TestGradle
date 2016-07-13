package com.app.data.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="country")
public class Country extends Base{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="c_code")
	private String code;
	
	@Column(name="name")
	private String name;
	
	@Column(name="region",nullable=true)
	private String region;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
