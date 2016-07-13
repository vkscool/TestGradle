package com.app.data.repositories;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.data.entity.User;

public interface UserRepository extends JpaRepository<User, Serializable>{

	public User findByEmail(String email);
	
	public User findByEmailAndPassword(String email, String password);
	
}
