package com.app.data.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="user_role_map")
public class UserRoleMap extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ModuleId moduleId;

	public ModuleId getModuleId() {
		return moduleId;
	}

	public void setModuleId(ModuleId moduleId) {
		this.moduleId = moduleId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
