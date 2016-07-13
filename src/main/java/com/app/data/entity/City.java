package com.app.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="city")
public class City extends Base{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="c_code",nullable=true)
	private String code;
	
	@Column(name="name")
	private String name;
	
	@ManyToOne
	private State state;
	
	@Column(name="street_code", nullable=true)
	private String streetCode;
	
	@Column(name="street_number", nullable=true)
	private String streetNumber;
	
	@Column(name="route_code", nullable=true)
	private String routeCode;
	
	@Column(name="route", nullable=true)
	private String route;
	
	@Column(name="sub_locality_code", nullable=true)
	private String subLocalityCode;
	
	@Column(name="sub_locality", nullable=true)
	private String subLocality;
	
	@Column(name="admin_area_level2_code", nullable=true)
	private String adminAreaLevel2Code;
	
	@Column(name="admin_area_level2", nullable=true)
	private String adminAreaLevel2;
	
	@Column(name="admin_area_level3_code", nullable=true)
	private String adminAreaLevel3Code;
	
	@Column(name="admin_area_level3", nullable=true)
	private String adminAreaLevel3;

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

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public String getStreetCode() {
		return streetCode;
	}

	public void setStreetCode(String streetCode) {
		this.streetCode = streetCode;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getRouteCode() {
		return routeCode;
	}

	public void setRouteCode(String routeCode) {
		this.routeCode = routeCode;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getSubLocalityCode() {
		return subLocalityCode;
	}

	public void setSubLocalityCode(String subLocalityCode) {
		this.subLocalityCode = subLocalityCode;
	}

	public String getSubLocality() {
		return subLocality;
	}

	public void setSubLocality(String subLocality) {
		this.subLocality = subLocality;
	}

	public String getAdminAreaLevel2Code() {
		return adminAreaLevel2Code;
	}

	public void setAdminAreaLevel2Code(String adminAreaLevel2Code) {
		this.adminAreaLevel2Code = adminAreaLevel2Code;
	}

	public String getAdminAreaLevel2() {
		return adminAreaLevel2;
	}

	public void setAdminAreaLevel2(String adminAreaLevel2) {
		this.adminAreaLevel2 = adminAreaLevel2;
	}

	public String getAdminAreaLevel3Code() {
		return adminAreaLevel3Code;
	}

	public void setAdminAreaLevel3Code(String adminAreaLevel3Code) {
		this.adminAreaLevel3Code = adminAreaLevel3Code;
	}

	public String getAdminAreaLevel3() {
		return adminAreaLevel3;
	}

	public void setAdminAreaLevel3(String adminAreaLevel3) {
		this.adminAreaLevel3 = adminAreaLevel3;
	}
}
