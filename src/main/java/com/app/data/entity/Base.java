package com.app.data.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@MappedSuperclass
//@EntityListeners(MyEntityListener.class)
public abstract class Base implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="created")
	private Timestamp created;
	
	@Column(name="modified")
	private Timestamp modified;
	
	@Column(name="deleted")
	private Timestamp deleted;
	
	@Column(name="status")
	private int status;
	
	@PrePersist
	void onCreate() {
		this.created = new Timestamp((new Date()).getTime());
	}
		 
	@PreUpdate
	void onUpdate() {
		this.modified = new Timestamp((new Date()).getTime());
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Timestamp getCreated() {
		return created;
	}

	public Timestamp getModified() {
		return modified;
	}

	public Timestamp getDeleted() {
		return deleted;
	}

	public void setDeleted(Timestamp deleted) {
		this.deleted = deleted;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
