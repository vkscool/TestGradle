package com.app.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="industry")
public class Industry extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="i_type")
	private String type;
	
	@ManyToOne(optional=true)
	@JoinColumn(name="parent_industry_id")
	private Industry parentIndustry;

	@Column(name="header_image")
	private String headerImage;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Industry getParentIndustry() {
		return parentIndustry;
	}

	public void setParentIndustry(Industry parentIndustry) {
		this.parentIndustry = parentIndustry;
	}

	public String getHeaderImage() {
		return headerImage;
	}

	public void setHeaderImage(String headerImage) {
		this.headerImage = headerImage;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
