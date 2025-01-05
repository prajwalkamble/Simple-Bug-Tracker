package com.prajwal.bugtracking.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prajwal.bugtracking.model.ApplicationRequest;
import com.prajwal.bugtracking.model.ApplicationVO;
import com.prajwal.bugtracking.service.IApplicationService;

@RestController
@RequestMapping("api/v1/applications")

public class ApplicationController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationController.class);
	
	@Autowired
	private IApplicationService applicationService;
	
	// Fetching all applications
	@GetMapping
	public ResponseEntity<List<ApplicationVO>> getApplications(){
		List<ApplicationVO> applicationVOS = null;
		
		LOGGER.info("Inside ApplicationController and calling the getApplications method...");
		applicationVOS = applicationService.findAll();
		return new ResponseEntity<List<ApplicationVO>>(applicationVOS, HttpStatus.OK);
		
	}
	
	// Get application by ID.
	// http://localhost:8090/api/v1/applications/101
	@GetMapping("/{id}")
	public ResponseEntity<ApplicationVO> getApplicationById(@PathVariable("id") int applicationId){
		LOGGER.info("Inside ApplicationController and calling the getApplicationById method...");
		ApplicationVO applicationVO = null;
		try {
			applicationVO = applicationService.findById(applicationId);
			LOGGER.info("Application response: {}", applicationVO);
			if (applicationVO == null) {
				LOGGER.info("Application details are not found");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApplicationVO>(applicationVO, HttpStatus.OK);
	}
	
	//Create a new application.
	@PostMapping
	public ResponseEntity<ApplicationVO> save(@RequestBody ApplicationRequest applicationRequest){
		LOGGER.info("Inside ApplicationController.save and applicationRequest: {}", applicationRequest);
		
		if(applicationRequest == null) {
			LOGGER.info("Invalid Application request.");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		ApplicationVO applicationVO = null;
		
		try {
			applicationVO = applicationService.save(applicationRequest);
			if(applicationVO == null) {
				LOGGER.info("Applications details are not saved.");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch(Exception ex) {
			LOGGER.info("Exception while saving application.");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ApplicationVO>(applicationVO, HttpStatus.OK);		
	}
	
	// Update the application
	@PutMapping
	public ResponseEntity<ApplicationVO> update(@RequestBody ApplicationRequest applicationRequest){
		LOGGER.info("Inside ApplicationController.update and applicationRequest: {}", applicationRequest);

		if (applicationRequest == null) {
			LOGGER.info("Invalid Application request.");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		ApplicationVO applicationVO = null;

		try {
			applicationVO = applicationService.save(applicationRequest);
			if (applicationVO == null) {
				LOGGER.info("Applications details are not updated.");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception ex) {
			LOGGER.info("Error while updating application.");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<ApplicationVO>(applicationVO, HttpStatus.OK);
		
	}
	
	@GetMapping("/name")
	public ResponseEntity<ApplicationVO> getApplicationByName(@RequestParam("name") String name){
		LOGGER.info("Inside ApplicationController and calling the getApplicationById method...");
		ApplicationVO applicationVO = null;
		try {
			//applicationVO = applicationService.findByName(name);
			applicationVO = applicationService.findMyApplicationByName(name);
			
			LOGGER.info("Application response: {}", applicationVO);
			if (applicationVO == null) {
				LOGGER.info("Application details are not found");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApplicationVO>(applicationVO, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<String> delete(@RequestParam("id") int applicationId){
		LOGGER.info("Input to ApplicationController.delete, id: {}", applicationId);
		String response = null;
		try {
			response = applicationService.delete(applicationId);
		} catch(Exception ex) {
			LOGGER.info("Exception while deleting application");
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
}
