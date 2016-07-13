package com.app.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="state")
public class State extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name="s_code",nullable=true)
	private String code;
	
	@Column(name="name")
	private String name;
	
	@ManyToOne
	@JoinColumn(name="country_id")
	private Country country;

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

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
