package com.app.web.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.app.exceptions.AlreadyExistException;
import com.app.exceptions.DBException;
import com.app.exceptions.ErrorResource;
import com.app.exceptions.FieldErrorResource;
import com.app.exceptions.InvalidInputException;
import com.app.exceptions.InvalidRequestException;

@ControllerAdvice
public class MyExceptionHandler extends ResponseEntityExceptionHandler{

	@ExceptionHandler({ InvalidRequestException.class })
    protected ResponseEntity<Object> handleInvalidRequest(RuntimeException e, WebRequest request) {
        InvalidRequestException ire = (InvalidRequestException) e;
        List<FieldErrorResource> fieldErrorResources = new ArrayList<>();

        List<FieldError> fieldErrors = ire.getErrors().getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            FieldErrorResource fieldErrorResource = new FieldErrorResource();
            fieldErrorResource.setResource(fieldError.getObjectName());
            fieldErrorResource.setField(fieldError.getField());
            fieldErrorResource.setCode(fieldError.getCode());
            fieldErrorResource.setMessage(fieldError.getDefaultMessage());
            fieldErrorResources.add(fieldErrorResource);
        }

        ErrorResource error = new ErrorResource("InvalidRequest", ire.getMessage());
        error.setFieldErrors(fieldErrorResources);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers, HttpStatus.UNPROCESSABLE_ENTITY, request);
    }
	
	@ExceptionHandler({ InvalidInputException.class })
	protected ResponseEntity<Object> handleInvalidInputException(RuntimeException e,WebRequest request){
		ErrorResource error = new ErrorResource("InvalidInput", e.getMessage());
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
		return handleExceptionInternal(e, error, headers, HttpStatus.BAD_REQUEST, request);
	}
	
	@ExceptionHandler({ AlreadyExistException.class })
	protected ResponseEntity<Object> handleAlreadyExsistException(RuntimeException e,WebRequest request){
		ErrorResource error = new ErrorResource("AlreadyExist", e.getMessage());
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
		return handleExceptionInternal(e, error, headers, HttpStatus.BAD_REQUEST, request);
	}
	
	@ExceptionHandler({ DBException.class })
	protected ResponseEntity<Object> handleDBException(RuntimeException e,WebRequest request){
		logger.debug("DBError : {}",e);
		ErrorResource error = new ErrorResource("DBError", e.getMessage());
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
		return handleExceptionInternal(e, error, headers, HttpStatus.FAILED_DEPENDENCY, request);
	}
	
	@ExceptionHandler(SQLException.class)
    public ResponseEntity<Object> handleSQLException(Exception e,WebRequest request){
		ErrorResource error = new ErrorResource("SQLException", e.getMessage());
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
		return handleExceptionInternal(e, error, headers, HttpStatus.FAILED_DEPENDENCY, request);
    }
	
	@Override
	protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException e,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
		System.out.println("Handling No handler found exception ");
		ErrorResource error = new ErrorResource("NotFound", e.getMessage());
        headers.setContentType(MediaType.APPLICATION_JSON);
		return handleExceptionInternal(e, error, headers, HttpStatus.NOT_FOUND, request);
    }
     
    @ResponseStatus(value=HttpStatus.NOT_FOUND, reason="IOException occured")
    @ExceptionHandler(IOException.class)
    public ResponseEntity<Object> handleIOException(Exception e,WebRequest request){
    	ErrorResource error = new ErrorResource("NotFound", e.getMessage());
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
		return handleExceptionInternal(e, error, headers, HttpStatus.NOT_FOUND, request);
    }
}
