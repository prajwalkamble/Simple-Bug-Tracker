package com.prajwal.bugtracking.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prajwal.bugtracking.entity.Release;
import com.prajwal.bugtracking.exception.ReleaseNotFoundException;
import com.prajwal.bugtracking.model.ReleaseRequest;
import com.prajwal.bugtracking.model.ReleaseVO;
import com.prajwal.bugtracking.repository.ReleaseRepository;

@Service
public class ReleaseServiceImpl implements IReleaseService {
	
	@Autowired
	ReleaseRepository releaseRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(BugServiceImpl.class);
	
	// Retrieve all releases
	@Override
	public List<ReleaseVO> findAll() {
		LOGGER.info("Inside ReleaseServiceImpl findAll method...");
		List<Release> releases = releaseRepository.findAll();
		LOGGER.info("Fetching all releases response: {}", releases);
		
		List<ReleaseVO> releaseVOS = releases.parallelStream().map(release -> {
			ReleaseVO releaseVO = new ReleaseVO();
			releaseVO.setId(release.getId());
			releaseVO.setName(release.getName());
			releaseVO.setReleaseDate(release.getReleaseDate());
			releaseVO.setStatus(release.getStatus());
			releaseVO.setComments(release.getComments());
			return releaseVO;
		}).collect(Collectors.toList());
		
		return releaseVOS;
	}
	
	// Retrieve a release by Id
	@Override
	public ReleaseVO findById(int releaseId) throws ReleaseNotFoundException {
		LOGGER.info("Inside ReleaseServiceImpl findById method...");
		Optional<Release> release = releaseRepository.findById(releaseId);
		LOGGER.info("Fetching a release response: {}", release);
		
		if(!release.isPresent()) {
			LOGGER.error("No such release present!");
			throw new ReleaseNotFoundException("No such release present!");
		} else {
			ReleaseVO releaseVO = new ReleaseVO();
			releaseVO.setId(release.get().getId());
			releaseVO.setName(release.get().getName());
			releaseVO.setReleaseDate(release.get().getReleaseDate());
			releaseVO.setStatus(release.get().getStatus());
			releaseVO.setComments(release.get().getComments());
			return releaseVO;
		}
	}
	
	// Create or update release
	@Override
	public ReleaseVO save(ReleaseRequest releaseRequest) throws ReleaseNotFoundException {
		LOGGER.info("Inside ReleaseServiceImpl.save method and params, releaseRequest: {}", releaseRequest);
		
		if(releaseRequest == null) {
			LOGGER.info("Invalid release request!");
			throw new ReleaseNotFoundException("Invalid release request!");
		}
		
		Release release = new Release();
		if(release.getId() > 0) {
			release.setId(releaseRequest.getId());
		}
		release.setName(releaseRequest.getName());
		release.setReleaseDate(releaseRequest.getReleaseDate());
		release.setStatus(releaseRequest.getStatus());
		release.setComments(releaseRequest.getComments());
		
		Release releaseResponse = releaseRepository.save(release);
		ReleaseVO releaseVO = null;
		if(releaseResponse != null) {
			LOGGER.info("Release Response, releaseResponse: {}", releaseResponse);
			releaseVO = new ReleaseVO();
			releaseVO.setId(release.getId());
			releaseVO.setName(release.getName());
			releaseVO.setReleaseDate(release.getReleaseDate());
			releaseVO.setStatus(release.getStatus());
			releaseVO.setComments(release.getComments());
		}
		
		return releaseVO;
	}
	
	// Retrieve release by name
	@Override
	public ReleaseVO findByName(String name) throws ReleaseNotFoundException {
		LOGGER.info("Inside ReleaseServiceImpl.findByName and name: {}", name);
		
		ReleaseVO releaseVO = null;
		
		if(name == null) {
			LOGGER.info("Invalid release name: {}", name);
			throw new ReleaseNotFoundException("Invalid release name");
		}
		
		Optional<Release> release = releaseRepository.findByName(name);
		LOGGER.info("Default findByName method invoked");
		if(release.isPresent()) {
			LOGGER.info("Release details for the name {} and the values: {}", name, release.get());
			releaseVO = new ReleaseVO();
			releaseVO.setId(release.get().getId());
			releaseVO.setName(release.get().getName());
			releaseVO.setReleaseDate(release.get().getReleaseDate());
			releaseVO.setStatus(release.get().getStatus());
			releaseVO.setComments(release.get().getComments());
		}
		
		return releaseVO;
	}
	
	// Retrieve release by name
	@Override
	public ReleaseVO findMyReleaseByName(String name) throws ReleaseNotFoundException {
		LOGGER.info("Inside ReleaseServiceImpl.findMyReleaseByName and name: {}", name);
		
		ReleaseVO releaseVO = null;
		
		if(name == null) {
			LOGGER.info("Invalid release name: {}", name);
			throw new ReleaseNotFoundException("Invalid release name");
		}
		
		Optional<Release> release = releaseRepository.findReleaseByNameCustom(name);
		LOGGER.info("Custom findMyReleaseByName method invoked");
		if(release.isPresent()) {
			LOGGER.info("Release details for the name {} and the values: {}", name, release.get());
			releaseVO = new ReleaseVO();
			releaseVO.setId(release.get().getId());
			releaseVO.setName(release.get().getName());
			releaseVO.setReleaseDate(release.get().getReleaseDate());
			releaseVO.setStatus(release.get().getStatus());
			releaseVO.setComments(release.get().getComments());
		}
		
		return releaseVO;
	}
	
	// Delete an existing release by Id
	@Override
	public String delete(int releaseId) throws ReleaseNotFoundException {
		LOGGER.info("Input to ReleaseServiceImpl.delete, id: {}", releaseId);
		if(releaseId < 0) {
			LOGGER.info("Invalid Release ID");
			throw new ReleaseNotFoundException("Invalid Release ID");
		}
		try {
			releaseRepository.deleteById(releaseId);
		} catch(Exception ex) {
			LOGGER.info("Exception while deleting the release");
			throw new ReleaseNotFoundException("Exception while deleting the release");
		}
		
		return "Release has been deleted";
	}
}
