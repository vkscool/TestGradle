/**
 * 
 */
package com.app.web.controllers;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.data.entity.User;
import com.app.modals.UserPOJO;
import com.app.services.UserService;


/**
 * @author Vkscool
 *
 */
@RestController
@RequestMapping("/rest/users")
public class UserResource {

	@Autowired
	private UserService userService;
	private final static Logger logger = LogManager.getLogger(UserResource.class);
	
	@RequestMapping(value="", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<User> findAll(){
		logger.debug("In user repositiory find all");
		return userService.findAll();
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public User findUser(@PathVariable("id") int id) {
		logger.debug("In user repositiory get user by "+id);
		User u = userService.findUserById(id);
		logger.debug("Returning with user "+u);
		return u;
	}
	
	@RequestMapping(value="", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserPOJO> createUser(@RequestBody UserPOJO userPojo) {
		logger.debug("Here To Create new User {}, {}",userPojo);
		boolean b = userService.registerNewUser(userPojo);
		return new ResponseEntity<UserPOJO>(userPojo, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="", method=RequestMethod.PUT, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		User savedUser = userService.update(user);
		return new ResponseEntity<User>(savedUser, HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.DELETE, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {
		userService.deleteUser(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
