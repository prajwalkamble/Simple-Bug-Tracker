package com.prajwal.bugtracking.service;

import java.util.List;

import com.prajwal.bugtracking.exception.ReleaseNotFoundException;
import com.prajwal.bugtracking.model.ReleaseRequest;
import com.prajwal.bugtracking.model.ReleaseVO;

public interface IReleaseService {
	// Fetch all Releases
	List<ReleaseVO> findAll();
	
	// Find Release by Id
	ReleaseVO findById(int releaseId) throws ReleaseNotFoundException;
	
	// Create or update Release
	ReleaseVO save(ReleaseRequest releaseRequest) throws ReleaseNotFoundException;
	
	// Delete Release by Id
	String delete(int releaseId) throws ReleaseNotFoundException;
	
	// Find Release by name
	ReleaseVO findByName(String name) throws ReleaseNotFoundException;
	
	// Find Release by name (Custom)
	ReleaseVO findMyReleaseByName(String name) throws ReleaseNotFoundException;
}
