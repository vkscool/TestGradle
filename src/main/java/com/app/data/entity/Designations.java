package com.app.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="designation")
public class Designations extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="designation_name")
	private String designationName;
	
	@Column(name="description")
	private String description;

	public String getDesignationName() {
		return designationName;
	}

	public void setDesignationName(String designationName) {
		this.designationName = designationName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
