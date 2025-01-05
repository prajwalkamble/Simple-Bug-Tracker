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

import com.prajwal.bugtracking.model.BugRequest;
import com.prajwal.bugtracking.model.BugVO;
import com.prajwal.bugtracking.service.IBugService;

@RestController
@RequestMapping("api/v1/bugs")
public class BugController {
	private static final Logger LOGGER = LoggerFactory.getLogger(BugController.class);
	
	@Autowired
	private IBugService bugService;
	
	// Fetching all bugs
	@GetMapping
	public ResponseEntity<List<BugVO>> getBugs(){
		List<BugVO> bugVOS = null;
		
		LOGGER.info("Inside BugController and calling the getBugs method...");
		bugVOS = bugService.findAll();
		
		return new ResponseEntity<List<BugVO>>(bugVOS, HttpStatus.OK);
	}
	
	// Fetch bug by Id
	// http://locolhost:8091/api/v1/bugs/101
	@GetMapping("/{id}")
	public ResponseEntity<BugVO> getBugById(@PathVariable("id") int bugId){
		LOGGER.info("Fetching Bug by Id: {}", bugId);
		BugVO bugVO = null;
		try {
			bugVO = bugService.findById(bugId);
			
			if(bugVO == null) {
				LOGGER.info("Bug details not found!");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch(Exception ex) {
			LOGGER.info("Exception while fetching bug by ID", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<BugVO>(bugVO, HttpStatus.OK);
	}
	
	// Create a bug
	// http://locolhost:8091/api/v1/bugs
	@PostMapping
	public ResponseEntity<BugVO> save(@RequestBody BugRequest bugRequest){
		LOGGER.info("Creating a new bug.");
		if(bugRequest == null) {
			LOGGER.info("Invalid bug request!");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		BugVO bugVO = null;
		try {
			bugVO = bugService.save(bugRequest);
			
			if(bugVO == null) {
				LOGGER.info("Bug details are not saved");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}catch(Exception ex) {
			LOGGER.info("Exception while saving a bug", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);			
		}
		
		return new ResponseEntity<>(bugVO, HttpStatus.OK);
	}
	
	// Update a bug
	// http://locolhost:8091/api/v1/bugs?id=101
	@PutMapping
	public ResponseEntity<BugVO> update(@RequestBody BugRequest bugRequest){
		LOGGER.info("Updating the bug.");
		
		if(bugRequest == null) {
			LOGGER.info("Invalid bug request!");
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		BugVO bugVO = null;
		try {
			bugVO = bugService.save(bugRequest);
			
			if(bugVO == null) {
				LOGGER.info("Bug details are not updated");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}catch(Exception ex) {
			LOGGER.info("Exception while updating the bug", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(bugVO, HttpStatus.OK);
	}
	
	// Fetch bug by its status
	//http://locolhost:8091/api/v1/bugs?status=Completed
	@GetMapping("/status")
	public ResponseEntity<BugVO> findMyBugByStatus(@RequestParam("status") String status){
		LOGGER.info("Fetching bug by status: {}", status);
		
		BugVO bugVO = null;
		try {			
			//bugVO = bugService.findByStatus(status);
			bugVO = bugService.findMyBugByStatus(status);
			
			if(bugVO == null) {
				LOGGER.info("Bug details not found");
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch(Exception ex) {
			LOGGER.info("Exception while fetching bug by status", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(bugVO, HttpStatus.OK);
	}
	
	// Delete bug by id
	//http://locolhost:8091/api/v1/bugs?id=101
	@DeleteMapping
	public ResponseEntity<String> delete(@RequestParam("id") int bugId){
		LOGGER.info("Deleting bug by Id: {}", bugId);
		
		String response = null;
		try {
			response = bugService.delete(bugId);
		} catch(Exception ex) {
			LOGGER.info("Exception while deleting bug", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
