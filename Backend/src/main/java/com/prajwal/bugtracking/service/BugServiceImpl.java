package com.prajwal.bugtracking.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prajwal.bugtracking.entity.Bug;
import com.prajwal.bugtracking.exception.BugNotFoundException;
import com.prajwal.bugtracking.model.BugRequest;
import com.prajwal.bugtracking.model.BugVO;
import com.prajwal.bugtracking.repository.BugRepository;

@Service
public class BugServiceImpl implements IBugService {
	
	@Autowired
	BugRepository bugRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(BugServiceImpl.class);
	
	// Retrieve all bugs.
	@Override
	public List<BugVO> findAll() {
		LOGGER.info("Inside BugServiceImpl findAll method...");
		List<Bug> bugs = bugRepository.findAll();
		LOGGER.info("Fetching all bugs response: {}", bugs);
		
		// Map the entities to DTOs
		List<BugVO> bugVOS = bugs.parallelStream().map(bug -> {
			BugVO bugVO = new BugVO();
			bugVO.setId(bug.getId());
			bugVO.setRelease(bug.getRelease());
			bugVO.setStatus(bug.getStatus());
			bugVO.setType(bug.getType());
			bugVO.setApplication(bug.getApplication());
			bugVO.setApplicationImpacted(bug.getApplicationImpacted());
			bugVO.setAssignedTo(bug.getAssignedTo());
			bugVO.setCreatedBy(bug.getCreatedBy());
			bugVO.setCreatedOn(bug.getCreatedOn());
			bugVO.setDescription(bug.getDescription());
			return bugVO;
		}).collect(Collectors.toList());
		
		return bugVOS;
	}

	// Retrieve a bug by ID.
	@Override
	public BugVO findById(int bugId) throws BugNotFoundException {
		LOGGER.info("Inside BugServiceImpl findById method...");
		Optional<Bug> bug = bugRepository.findById(bugId);
		LOGGER.info("Fetching a bug response: {}", bug);
		if(!bug.isPresent()) {
			LOGGER.error("No such kind of bug is found in the application!");
			throw new BugNotFoundException("No such kind of bug is found in the application!");
		} else {
			BugVO bugVO = new BugVO();
			bugVO.setId(bug.get().getId());
			bugVO.setRelease(bug.get().getRelease());
			bugVO.setStatus(bug.get().getStatus());
			bugVO.setType(bug.get().getType());
			bugVO.setApplication(bug.get().getApplication());
			bugVO.setApplicationImpacted(bug.get().getApplicationImpacted());
			bugVO.setAssignedTo(bug.get().getAssignedTo());
			bugVO.setCreatedBy(bug.get().getCreatedBy());
			bugVO.setCreatedOn(bug.get().getCreatedOn());
			bugVO.setDescription(bug.get().getDescription());
			
			return bugVO;
		}
	}
	
	// Create or update a bug
	@Override
	public BugVO save(BugRequest bugRequest) throws BugNotFoundException {
		LOGGER.info("Inside BugServiceImpl.save method and params, bugRequest: {}", bugRequest);
		if(bugRequest == null) {
			LOGGER.info("Invalid bug request");
			throw new BugNotFoundException("Invalid bug request");
		}
		
		Bug bug = new Bug();
		if(bugRequest.getId() > 0) {
			bug.setId(bugRequest.getId());
		}
		
		bug.setId(bugRequest.getId());
		bug.setRelease(bugRequest.getRelease());
		bug.setStatus(bugRequest.getStatus());
		bug.setType(bugRequest.getType());
		bug.setApplication(bugRequest.getApplication());
		bug.setApplicationImpacted(bugRequest.getApplicationImpacted());
		bug.setAssignedTo(bugRequest.getAssignedTo());
		bug.setCreatedBy(bugRequest.getCreatedBy());
		bug.setCreatedOn(bugRequest.getCreatedOn());
		bug.setDescription(bugRequest.getDescription());
		
		Bug bugResponse = bugRepository.save(bug);
		BugVO bugVO = null;
		if(bugResponse != null) {
			LOGGER.info("Bug Response, bugResponse: {}", bugResponse);
			bugVO = new BugVO();
			
			bugVO.setId(bug.getId());
			bugVO.setRelease(bug.getRelease());
			bugVO.setStatus(bug.getStatus());
			bugVO.setType(bug.getType());
			bugVO.setApplication(bug.getApplication());
			bugVO.setApplicationImpacted(bug.getApplicationImpacted());
			bugVO.setAssignedTo(bug.getAssignedTo());
			bugVO.setCreatedBy(bug.getCreatedBy());
			bugVO.setCreatedOn(bug.getCreatedOn());
			bugVO.setDescription(bug.getDescription());
		}
		
		return bugVO;
	}
	
	// Find bug by status
	@Override
	public BugVO findByStatus(String status) throws BugNotFoundException {
		LOGGER.info("Inside BugServiceImpl.findByStatus and status: {}", status);
		BugVO bugVO = null;
		if(status == null) {
			LOGGER.info("Invalid Bug Status: {}", status);
			throw new BugNotFoundException("Invalid Bug Status!");
		}
		Optional<Bug> bug = bugRepository.findByStatus(status);
		LOGGER.info("Default findByStatus method invoked!");
		
		if(bug.isPresent()) {
			LOGGER.info("Bug details for status {} and the values: {}", status, bug.get());
			bugVO = new BugVO();
			
			bugVO.setId(bug.get().getId());
			bugVO.setRelease(bug.get().getRelease());
			bugVO.setStatus(bug.get().getStatus());
			bugVO.setType(bug.get().getType());
			bugVO.setApplication(bug.get().getApplication());
			bugVO.setApplicationImpacted(bug.get().getApplicationImpacted());
			bugVO.setAssignedTo(bug.get().getAssignedTo());
			bugVO.setCreatedBy(bug.get().getCreatedBy());
			bugVO.setCreatedOn(bug.get().getCreatedOn());
			bugVO.setDescription(bug.get().getDescription());
		}
		
		return bugVO;
	}

	// Find bug by status (Custom)
	@Override
	public BugVO findMyBugByStatus(String status) throws BugNotFoundException {
		LOGGER.info("Inside BugServiceImpl.findMyBugByStatus and status: {}", status);
		BugVO bugVO = null;
		if(status == null) {
			LOGGER.info("Invalid Bug status: {}", status);
			throw new BugNotFoundException("Invalid Bug Status!");
		}
		
		Optional<Bug> bug = bugRepository.findMyBugByStatusCustom(status);
		LOGGER.info("Custom method findMyBugByStatus invoked!");
		
		if(bug.isPresent()) {
			LOGGER.info("Bug details for status {} and the values: {}", status, bug.get());
			bugVO = new BugVO();
			
			bugVO.setId(bug.get().getId());
			bugVO.setRelease(bug.get().getRelease());
			bugVO.setStatus(bug.get().getStatus());
			bugVO.setType(bug.get().getType());
			bugVO.setApplication(bug.get().getApplication());
			bugVO.setApplicationImpacted(bug.get().getApplicationImpacted());
			bugVO.setAssignedTo(bug.get().getAssignedTo());
			bugVO.setCreatedBy(bug.get().getCreatedBy());
			bugVO.setCreatedOn(bug.get().getCreatedOn());
			bugVO.setDescription(bug.get().getDescription());
		}
			
		return bugVO;
	}
	
	//Delete a bug by ID
	@Override
	public String delete(int bugId) throws BugNotFoundException {
		LOGGER.info("Input to BugServiceImpl.delete, id: {}", bugId);
		if(bugId < 0) {
			LOGGER.info("Invalid Bug ID");
			throw new BugNotFoundException("Invalid Bug ID");
		}
		try {
			bugRepository.deleteById(bugId);
		} catch(Exception ex) {			
			LOGGER.info("Exception while deleting Bug!");
			throw new BugNotFoundException("Exception while deleting Bug!");
		}
		
		return "Bug has been deleted!";
	}

}
