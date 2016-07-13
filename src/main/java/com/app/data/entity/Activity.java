package com.app.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="activity")
public class Activity extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name="name")
	private String name;
	
	@Column(name="url")
	private String url;
	
	@Column(name="description",columnDefinition="TEXT")
	private String description;
	
	@Column(name="a_type",columnDefinition="INT(11) default '0'")
	private int type;
	
	@Column(name="specific_to",columnDefinition="INT(11) default '0'")
	private int specificTo;
	
	@Column(name="a_index",columnDefinition="INT(11) default '1'")
	private int index;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getSpecificTo() {
		return specificTo;
	}

	public void setSpecificTo(int specificTo) {
		this.specificTo = specificTo;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
