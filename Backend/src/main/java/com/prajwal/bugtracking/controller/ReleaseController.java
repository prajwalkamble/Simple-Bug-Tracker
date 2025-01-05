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

import com.prajwal.bugtracking.model.ReleaseRequest;
import com.prajwal.bugtracking.model.ReleaseVO;
import com.prajwal.bugtracking.service.IReleaseService;

@RestController
@RequestMapping("/api/v1/releases")
public class ReleaseController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ReleaseController.class);
	
	@Autowired
	private IReleaseService releaseService;
	
	// Fetch all releases
	@GetMapping
	public ResponseEntity<List<ReleaseVO>> getReleases(){
		LOGGER.info("Fetching all releases...");
		
		List<ReleaseVO> releaseVOS = null;
		
		LOGGER.info("Inside ReleaseController and calling the getReleases method...");
		releaseVOS = releaseService.findAll();
		
		return new ResponseEntity<>(releaseVOS, HttpStatus.OK);
	}
	
	// Fetch release by Id
  // Example URL: http://localhost:8091/api/v1/releases/101
	@GetMapping("/{id}")
	public ResponseEntity<ReleaseVO> getReleaseById(@PathVariable("id") int releaseId){
		LOGGER.info("Fetching release by ID: {}", releaseId);

		ReleaseVO releaseVO = null;

		try {
			releaseVO = releaseService.findById(releaseId);

			if (releaseVO == null) {
				LOGGER.info("Release details not found.");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception ex) {
			LOGGER.error("Exception while fetching release by ID", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(releaseVO, HttpStatus.OK);
	}
	
	// Create a new Release
	//Example URL: http://localhost:8091/api/v1/releases
	@PostMapping
	public ResponseEntity<ReleaseVO> save(@RequestBody ReleaseRequest releaseRequest){
		LOGGER.info("Creating a new release...");
		
		if(releaseRequest == null) {
			LOGGER.info("Invalid release request!");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		ReleaseVO releaseVO = null;
		
		try {
			releaseVO = releaseService.save(releaseRequest);
			
			if(releaseVO == null) {
				LOGGER.info("Release details are not saved");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch(Exception ex) {
			LOGGER.info("Exception while saving release!", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(releaseVO, HttpStatus.OK);
	}
	
	// Update existing release
	//Example URL: http://localhost:8091/api/v1/releases?id=101
	@PutMapping
	public ResponseEntity<ReleaseVO> update(@RequestBody ReleaseRequest releaseRequest) {
		LOGGER.info("Updating the existing Release.");
		
		if(releaseRequest == null) {
			LOGGER.info("Invalid release request!");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		ReleaseVO releaseVO = null;
		
		try {
			releaseVO = releaseService.save(releaseRequest);
			
			if(releaseVO == null) {
				LOGGER.info("Release details are not updated");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch(Exception ex) {
			LOGGER.info("Exception while saving release!", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(releaseVO, HttpStatus.OK);
	}
	
	// Find release by name
	//Example URL: http://localhost:8091/api/v1/releases/name?name=ReleaseName
	@GetMapping("/name")
	public ResponseEntity<ReleaseVO> getReleaseByName(@RequestParam("name") String name) {
		LOGGER.info("Fetching release by name: {}", name);
		
		ReleaseVO releaseVO = null;
		
		try {
			//releaseVO = releaseService.findByName(name);
			releaseVO = releaseService.findMyReleaseByName(name);
			
			if(releaseVO == null) {
				LOGGER.info("Release details not found!");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch(Exception ex) {
			LOGGER.info("Exception while fething release by name", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(releaseVO, HttpStatus.OK);
	}
	
	// Delete a release by id
	//Example URL: http://localhost:8091/api/v1/releases?id=101
	@DeleteMapping
	public ResponseEntity<String> delete(@RequestParam("id") int releaseId) {
		LOGGER.info("Deleting release by id: {}", releaseId);
		
		String response = null;
		
		try {
			response = releaseService.delete(releaseId);
		} catch(Exception ex) {
			LOGGER.info("Exception while deleting release", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
}
