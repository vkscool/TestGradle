package com.app.web.handlers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.app.domains.SecurityUser;
import com.fasterxml.jackson.databind.ObjectMapper;

public class AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,HttpServletResponse response, 
			Authentication auth)
			throws IOException, ServletException {
		logger.debug("Login Success");
		SecurityUser user = (SecurityUser) auth.getPrincipal();
		ObjectMapper om = new ObjectMapper();
		String data = om.writeValueAsString(user);
		System.out.println(data);
		response.setContentType("application/json");
		response.getWriter().print("{\"status\":\"SUCCESS\", \"userdata\":"+data+"}");
        response.getWriter().flush();
    }
	
}
