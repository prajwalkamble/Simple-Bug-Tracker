package com.prajwal.bugtracking.service;

import java.util.List;

import com.prajwal.bugtracking.exception.ApplicationNotFoundException;
import com.prajwal.bugtracking.model.ApplicationRequest;
import com.prajwal.bugtracking.model.ApplicationVO;

public interface IApplicationService {
	// Fetch all Applications
	List<ApplicationVO> findAll();
	
	// Find an application by its ID.
	ApplicationVO findById(int applicationId) throws ApplicationNotFoundException;
	
	// Create or Update an application.
	ApplicationVO save(ApplicationRequest applicationRequest) throws ApplicationNotFoundException;
	
	// Delete an application by its ID.
	String delete(int applicationId) throws ApplicationNotFoundException;
	
	// Find an application by its name.
	ApplicationVO findByName(String name) throws ApplicationNotFoundException;
	
	// Find an application by name using a custom method.
	ApplicationVO findMyApplicationByName(String name) throws ApplicationNotFoundException;
}
