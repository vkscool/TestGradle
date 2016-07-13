package com.app.data.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="user_details")
public class UserDetails extends Base{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="gender")
	private int gender;
	
	@OneToMany(mappedBy="userDetails", cascade=CascadeType.ALL)
	private List<Address> addresses;
	
	@ManyToOne(optional=true)
	@JoinColumn(name="designation_id")
	private Designations designation;
	
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Address getLatesAddress(){
		List<Address> add = getAddresses();
		if(add!=null && !add.isEmpty()){
			return add.get(0);
		}
		return null;
	}
	
	public String getFullName(){
		return firstName+(lastName!=null?" "+lastName:"");
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	public Designations getDesignation() {
		return designation;
	}

	public void setDesignation(Designations designation) {
		this.designation = designation;
	}
}
