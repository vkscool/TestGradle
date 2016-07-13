/**
 * 
 */
package com.app.services;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.data.dao.BaseDao;
import com.app.data.entity.User;
import com.app.data.entity.UserDetails;
import com.app.data.repositories.UserRepository;
import com.app.exceptions.AlreadyExistException;
import com.app.exceptions.InvalidInputException;
import com.app.modals.UserPOJO;
import com.app.utils.Messages;
import com.app.utils.Status;


//import com.oryx.restaurant.dao.UserDao;


@Service
@Transactional
public class UserService 
{
	private final static Logger logger = LogManager.getLogger(UserService.class);
	
	@Autowired
	private BaseDao baseDao;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User create(User user) {
		return userRepository.save(user);
	}

	public User findUserById(int id) {
		return userRepository.findOne((long)id);
	}

	public User login(String username, String password) {
		logger.debug("Authenticating user with credentials "+username+" "+password);
		return userRepository.findByEmailAndPassword(username, password);
	}

	public User update(User user) {
		return userRepository.save(user);
	}

	public void deleteUser(int id) {
		userRepository.delete(id);
	}

	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public boolean registerNewUser(UserPOJO userPojo){
		if(StringUtils.isBlank(userPojo.getEmail())){
			throw new InvalidInputException(Messages.EMAIL_REQUIRED);
		}
		
		User user = userRepository.findByEmail(userPojo.getEmail());
		if(user!=null){
			throw new AlreadyExistException(Messages.EMAIL_EXSIST);
		}
		
		user = new User();
		user.setEmail(userPojo.getEmail());
		user.setPassword(userPojo.getPassword());
		user.setStatus(Status.NEW_UNVERIFIED_USER);
		
		try{
			UserDetails ud = new UserDetails();
			ud.setFirstName(userPojo.getFirstName());
			ud.setLastName(userPojo.getLastName());
			user.setName(ud.getFullName());
			userRepository.save(user);
			
			ud.setUser(user);
			baseDao.saveEntity(ud);
		}catch(Exception e){
			logger.error("Error registering user {}",e);
			e.printStackTrace();
		}
		return true;
	}
}

