package com.app.utils;

public interface Status {

	int EXPIRED=404;
	int LOCKED=405;
	int CREDENTIALS_EXPIRED=406;
	int DISABLED = 408;
	
	int NEW_UNVERIFIED_USER = 1;
	
}
