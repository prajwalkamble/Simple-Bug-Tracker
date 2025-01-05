package com.prajwal.bugtracking.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prajwal.bugtracking.entity.Application;
import com.prajwal.bugtracking.exception.ApplicationNotFoundException;
import com.prajwal.bugtracking.model.ApplicationRequest;
import com.prajwal.bugtracking.model.ApplicationVO;
import com.prajwal.bugtracking.repository.ApplicationRepository;
@Service
public class ApplicationServiceImpl implements IApplicationService {
	
	@Autowired
	ApplicationRepository applicationRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationServiceImpl.class);
	
	@Override
	public List<ApplicationVO> findAll() {
		LOGGER.info("Inside ApplicationServiceImpl findAll method...");
		List<Application> applications = applicationRepository.findAll();
		LOGGER.info("Fetching all applications response: {}", applications);
		
		// Map the entities to DTOs
		List<ApplicationVO> applicationVOS = applications.parallelStream().map(application -> {
			ApplicationVO applicationVO = new ApplicationVO();
			applicationVO.setId(application.getId());
			applicationVO.setName(application.getName());
			applicationVO.setDescription(application.getDescription());
			applicationVO.setOwner(application.getOwner());
			applicationVO.setCreatedOn(application.getCreatedOn());
			// applicationVO.setBugs(application.getBugs());
			return applicationVO;
		}).collect(Collectors.toList());
		
		return applicationVOS;
	}
	
	@Override
	public ApplicationVO findById(int applicationId) throws ApplicationNotFoundException {
		LOGGER.info("Inside ApplicationServiceImpl findById method...");
		Optional<Application> application = applicationRepository.findById(applicationId);
		LOGGER.info("Fetching an application response: {}", application);
		
		if (!application.isPresent()) {
			LOGGER.error("No such application found !");
			throw new ApplicationNotFoundException("No such application found !");
		} else {
			ApplicationVO applicationVO = new ApplicationVO();
			applicationVO.setId(application.get().getId());
			applicationVO.setName(application.get().getName());
			applicationVO.setDescription(application.get().getDescription());
			applicationVO.setOwner(application.get().getOwner());
			applicationVO.setCreatedOn(application.get().getCreatedOn());
			// applicationVO.setBugs(application.get().getBugs());
			return applicationVO;
		}
		
	}

	@Override
	public ApplicationVO save(ApplicationRequest applicationRequest) throws ApplicationNotFoundException {
		LOGGER.info("Inside the ApplicationServiceImpl.save method and params, applicationRequest: {}", applicationRequest);
		
		if(applicationRequest == null) {
			LOGGER.info("Invalid application request");
			throw new ApplicationNotFoundException("Invalid application request");
		}
		
		Application application = new Application();
		
		if(applicationRequest.getId() > 0) {
			application.setId(applicationRequest.getId());
		}
		
		application.setName(applicationRequest.getName());
		application.setDescription(applicationRequest.getDescription());
		application.setOwner(applicationRequest.getOwner());
		application.setCreatedOn(applicationRequest.getCreatedOn());
		
		Application applicationResponse = applicationRepository.save(application);
		
		ApplicationVO applicationVO = null;
		
		if(applicationResponse != null) {
			LOGGER.info("Application Response, applicationResponse: {}", applicationResponse);
			applicationVO = new ApplicationVO();
			applicationVO.setId(application.getId());
			applicationVO.setName(application.getName());
			applicationVO.setOwner(application.getOwner());
			applicationVO.setDescription(application.getDescription());
			applicationVO.setCreatedOn(application.getCreatedOn());			
		}
		return applicationVO;
		
	}

	@Override
	public ApplicationVO findByName(String name) throws ApplicationNotFoundException {
		LOGGER.info("Inside ApplicationServiceImpl.findByName and name: {}", name);
		ApplicationVO applicationVO = null;;
		if(name == null) {
			LOGGER.info("Invalid application name: {}", name);
			throw new ApplicationNotFoundException("invalid Application name");
		}
		Optional<Application> application = applicationRepository.findByName(name);
		LOGGER.info("Default findByName invoked Successfully!!!");
		
		if(application.isPresent()) {
			LOGGER.info("Application details for the name {} and the values: {}", name, application.get());
			applicationVO = new ApplicationVO();
			
			applicationVO.setId(application.get().getId());
			applicationVO.setName(application.get().getName());
			applicationVO.setOwner(application.get().getOwner());
			applicationVO.setDescription(application.get().getDescription());
		}
		return applicationVO;
		
	}

	@Override
	public ApplicationVO findMyApplicationByName(String name) throws ApplicationNotFoundException {
		LOGGER.info("Inside ApplicationServiceImpl.findMyApplicationByName and name: {}", name);
		ApplicationVO applicationVO = null;
		if(name == null) {
			LOGGER.info("Invalid application name: {}", name);
			throw new ApplicationNotFoundException("Invalid Application name");
		}
		Optional<Application> application = applicationRepository.findMyApplicationByNameCustom(name);
		LOGGER.info("Default findApplicationByNameCustom invoked Successfully!!!");
		
		if(application.isPresent()) {
			LOGGER.info("Application details for the name {} and the values: {}", name, application.get());
			applicationVO = new ApplicationVO();
			
			applicationVO.setId(application.get().getId());
			applicationVO.setName(application.get().getName());
			applicationVO.setOwner(application.get().getOwner());
			applicationVO.setDescription(application.get().getDescription());
		}
		return applicationVO;
	}

	@Override
	public String delete(int applicationId) throws ApplicationNotFoundException {
		LOGGER.info("Input to ApplicationServiceImpl.delete, id: {}", applicationId);
		if(applicationId < 0) {
			LOGGER.info("Invalid Application ID");
			throw new ApplicationNotFoundException("Invalid Application ID");
		}
		try {
			applicationRepository.deleteById(applicationId);
		} catch(Exception ex) {
			LOGGER.info("Exception while deleting application");
			throw new ApplicationNotFoundException("Exception while deleting application");
		}
		return "Application has been deleted";
	}
	
}
