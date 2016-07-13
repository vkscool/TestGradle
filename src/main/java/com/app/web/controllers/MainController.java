package com.app.web.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/videos/")
public class MainController {

	@RequestMapping(value="get", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public String getGuiDashboardItems()
	{
		System.out.println("This is a mainController");
		return "[]";
	}
	
}
