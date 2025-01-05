package com.prajwal.bugtracking.service;

import java.util.List;

import com.prajwal.bugtracking.exception.BugNotFoundException;
import com.prajwal.bugtracking.model.BugRequest;
import com.prajwal.bugtracking.model.BugVO;

public interface IBugService {
	// Fetch all Bugs
	List<BugVO> findAll();
	
	// Find Bug by ID
	BugVO findById(int bugId) throws BugNotFoundException;
	
	// Create or update a Bug
	BugVO save(BugRequest bugRequest) throws BugNotFoundException;
	
	// Delete a Bug by ID
	String delete(int bugId) throws BugNotFoundException;
	
	// Find a Bug by its status
	BugVO findByStatus(String status) throws BugNotFoundException;
	
	// Find a bug by status using a custom method
	BugVO findMyBugByStatus(String status) throws BugNotFoundException;
}
