package com.app.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="address")
public class Address extends Base{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name="ad_street")
	private String street;
	
	@Column(name="ad_city")
	private String city;
	
	@Column(name="ad_state")
	private String state;
	
	@Column(name="ad_country")
	private String country;
	
	@Column(name="zip_pin")
	private String zipPinCode;
	
	@Column(name="ad_email")
	private String email;
	
	@Column(name="ad_phone")
	private String phone;
	
	@Column(name="ad_mobile")
	private String mobile;
	
	@Column(name="ad_url")
	private String mapUrl;
	
	@Column(name="ad_lat")
	private String lat;
	
	@Column(name="ad_lng")
	private String lng;
	
	@Column(name="appearing_index")
	private int index;
	
	@ManyToOne(optional=true)
	@JoinColumn(name="user_details_id")
	private UserDetails userDetails;

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZipPinCode() {
		return zipPinCode;
	}

	public void setZipPinCode(String zipPinCode) {
		this.zipPinCode = zipPinCode;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMapUrl() {
		return mapUrl;
	}

	public void setMapUrl(String mapUrl) {
		this.mapUrl = mapUrl;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
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
