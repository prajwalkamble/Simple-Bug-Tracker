package com.prajwal.bugtracking.service;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.prajwal.bugtracking.entity.Application;
import com.prajwal.bugtracking.exception.ApplicationNotFoundException;
import com.prajwal.bugtracking.model.ApplicationRequest;
import com.prajwal.bugtracking.model.ApplicationVO;
import com.prajwal.bugtracking.repository.ApplicationRepository;

@RunWith(MockitoJUnitRunner.class)
public class ApplicationServiceImplTest {
	private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationServiceImplTest.class);
	
	@Mock
	private ApplicationRepository applicationRepository;
	
	@InjectMocks
	private ApplicationServiceImpl applicationService;
	
	@Before
	public void setUp() {
		// Initialize some test data if needed
	}
	
	// Test case for finding all applications
	@Test
	public void testFindAll() {
		LOGGER.info("Running testFindAll");
		
		// Prepare a list of applications
		Application app1 = new Application();
		app1.setId(1);
		app1.setName("Bard");
		app1.setDescription("Bard Application");
		app1.setOwner("John Doe");
		
		Application app2 = new Application();
		app2.setId(2);
		app2.setName("BlackBox AI");
		app2.setDescription("BlackBox AI Application");
		app2.setOwner("Jane Smith");
		
		when(applicationRepository.findAll()).thenReturn(List.of(app1, app2));
		
		// Test the findAll method
		List<ApplicationVO> applicationVOs = applicationService.findAll();
		
		assertNotNull(applicationVOs);
		assertEquals(2, applicationVOs.size());
		
		ApplicationVO applicationVO1 = applicationVOs.get(0);
		assertEquals(app1.getId(), applicationVO1.getId());
		assertEquals(app1.getName(), applicationVO1.getName());
		assertEquals(app1.getDescription(), applicationVO1.getDescription());
		assertEquals(app1.getOwner(), applicationVO1.getOwner());
		
		ApplicationVO applicationVO2 = applicationVOs.get(1);
		assertEquals(app2.getId(), applicationVO2.getId());
		assertEquals(app2.getName(), applicationVO2.getName());
		assertEquals(app2.getDescription(), applicationVO2.getDescription());
		assertEquals(app2.getOwner(), applicationVO2.getOwner());
	}
	
	//Test for finding an application by ID
	@Test
	public void testFindById() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindById");
		
		// Prepare an application with ID 1
		Application app = new Application();
		app.setId(1);
		app.setName("Bard");
		app.setDescription("Bard Application");
		app.setOwner("John Doe");
		
		when(applicationRepository.findById(1)).thenReturn(Optional.of(app));
		
		// Test the findById method
		ApplicationVO applicationVO = applicationService.findById(1);
		
		assertNotNull(applicationVO);
		assertEquals(app.getId(), applicationVO.getId());
		assertEquals(app.getName(), applicationVO.getName());
		assertEquals(app.getDescription(), applicationVO.getDescription());
		assertEquals(app.getOwner(), applicationVO.getOwner());
	}
	
	// Test case for handling the scenario when an application is not found by ID
	@Test(expected = ApplicationNotFoundException.class)
	public void testFindById_NotFound() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindById_NotFound");
		
		// Configure the repository mock to return an empty optional
		when(applicationRepository.findById(666)).thenReturn(Optional.empty());
		
		// This should throw an ApplicationNotFoundException
		applicationService.findById(666);
	}
	
	// Test case for saving a new application
	@Test
	public void testSave() throws ApplicationNotFoundException {
		LOGGER.info("Running testSave");
		
		// Prepare a new application request
		ApplicationRequest applicationRequest = new ApplicationRequest();
		applicationRequest.setName("FIOX");
		applicationRequest.setDescription("FIOX Application");
		applicationRequest.setOwner("Rajat Raj");
		
		// Prepare a saved application
		Application savedApplication = new Application();
		savedApplication.setId(3);
		savedApplication.setName(applicationRequest.getName());
		savedApplication.setDescription(applicationRequest.getDescription());
		savedApplication.setOwner(applicationRequest.getOwner());
		
		// Configure the repository mock to return the saved application with the correct ID
		when(applicationRepository.save(any(Application.class))).thenAnswer(invocation -> {
			Application savedApp = invocation.getArgument(0);
			savedApp.setId(3);
			return savedApp;
		});
		
		// Test the save operation
		ApplicationVO applicationVO = applicationService.save(applicationRequest);
		
		assertNotNull(applicationVO);
		assertEquals(savedApplication.getId(), applicationVO.getId());
		assertEquals(savedApplication.getName(), applicationVO.getName());
		assertEquals(savedApplication.getDescription(), applicationVO.getDescription());
		assertEquals(savedApplication.getOwner(), applicationVO.getOwner());
	}
	
	// Test case for handling the scenario when an application request is null
	@Test(expected = ApplicationNotFoundException.class)
	public void testSave_IfApplicationRequestNull() throws ApplicationNotFoundException {
		LOGGER.info("Running testSave_IfApplicationRequestNull");
				
		applicationService.save(null);
	}
	
	@Test
	public void testSave_ApplicationIdGreaterThanZero() throws ApplicationNotFoundException {
		LOGGER.info("Running testSave_ApplicationIdGreaterThanZero");
		
		// Prepare the application request
    ApplicationRequest request = new ApplicationRequest();
    request.setId(1);
    request.setName("Test App");
    request.setDescription("Test Description");
    request.setOwner("Test Owner");
    request.setCreatedOn(new Date());

    // Prepare the application entity to be returned by the repository
    Application application = new Application();
    application.setId(1);
    application.setName("Test App");
    application.setDescription("Test Description");
    application.setOwner("Test Owner");
    application.setCreatedOn(new Date());

    // Mock the repository save method
    when(applicationRepository.save(any(Application.class))).thenReturn(application);

    // Call the save method
    ApplicationVO result = applicationService.save(request);

    // Assertions to verify the response
    assertNotNull(result);
    assertEquals(1, result.getId());
    assertEquals("Test App", result.getName());
    assertEquals("Test Description", result.getDescription());
    assertEquals("Test Owner", result.getOwner());
    assertNotNull(result.getCreatedOn());

    // Verify that the repository save method was called
    verify(applicationRepository).save(any(Application.class));
	}
	
	@Test
	public void testSave_IfApplicationResponseNotNull() throws ApplicationNotFoundException {
		LOGGER.info("Running testSave_IfApplicationResponseNotNull");
		
		ApplicationRequest applicationRequest = new ApplicationRequest();
    applicationRequest.setId(1);
    applicationRequest.setName("Test Application");
    applicationRequest.setDescription("Test Description");
    applicationRequest.setOwner("Test Owner");
    applicationRequest.setCreatedOn(new Date());

    // Mock repository response to return null
    when(applicationRepository.save(any(Application.class))).thenReturn(null);

    // Execute
    ApplicationVO result = applicationService.save(applicationRequest);

    // Verify
    assertNull(result);

    // Verify repository interaction
    verify(applicationRepository).save(any(Application.class));
	}
	
	// Test case for finding an application by name
	@Test
	public void testFindByName() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindByName");
		
    Application application = new Application();
    application.setId(1);
    application.setName("TestApp");
    application.setDescription("Test Description");
    application.setOwner("Test Owner");
    application.setCreatedOn(new Date());

    // Mock repository response
    when(applicationRepository.findByName("TestApp")).thenReturn(Optional.of(application));

    // Execute
    ApplicationVO applicationVO = applicationService.findByName("TestApp");

    // Verify
    assertNotNull(applicationVO);
    assertEquals(1, applicationVO.getId());
    assertEquals("TestApp", applicationVO.getName());
    
    applicationService.findByName("TestApp");
	}
	
	// Test case for invalid application name
	@Test(expected = ApplicationNotFoundException.class)
	public void testFindByName_NullApplication() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindByName_NullApplication");
		
		applicationService.findByName(null);
	}
	
	@Test
	public void testFindByName_ApplicationNotPresent() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindByName_ApplicationNotPresent");
		
		String appName = "Postman";
		
		when(applicationRepository.findByName(appName)).thenReturn(Optional.empty());
		
		applicationService.findByName(appName);
	}
	
	//Test case for finding an application by name (Custom)
	@Test
	public void testFindMyApplicationByNameCustom() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindMyApplicationByNameCustom");
		
		Application application = new Application();
    application.setId(1);
    application.setName("Linux Kernel");
    application.setDescription("Linux OS Kernel configuration");
    application.setOwner("Prajwal");
		
		when(applicationRepository.findMyApplicationByNameCustom("Linux Kernel")).thenReturn(Optional.of(application));
		
		ApplicationVO result = applicationService.findMyApplicationByName("Linux Kernel");
		
		assertNotNull(result);
		assertEquals(application.getId(), result.getId());
		assertEquals(application.getName(), result.getName());
		assertEquals(application.getDescription(), result.getDescription());
		assertEquals(application.getOwner(), result.getOwner());
	}
	
	@Test(expected = ApplicationNotFoundException.class)
	public void testFindMyApplicationByNameCustom_IfNameNull() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindMyApplicationByNameCustom_IfNameNull");
		
		applicationService.findMyApplicationByName(null);
	}
	
	@Test
	public void testFindMyApplicationByNameCustom_IfApplicationNotPresent() throws ApplicationNotFoundException {
		LOGGER.info("Running testFindMyApplicationByNameCustom_IfApplicationNotPresent");
		
		when(applicationRepository.findMyApplicationByNameCustom("App not Present")).thenReturn(Optional.empty());
		
		ApplicationVO result = applicationService.findMyApplicationByName("App not Present");
		
		assertNull(result);
	}
	
	// Test case for deleting an application
	@Test
	public void testDelete() throws ApplicationNotFoundException {
		LOGGER.info("Running testDelete");
		
		// Test the delete operation
		String result = applicationService.delete(1);
		
		assertEquals("Application has been deleted", result);
		
		// Verify that the deleteById method is called
		verify(applicationRepository).deleteById(1);
	}
	
	// Test case for detecting whether the application ID is < 0 while deleting
	@Test(expected = ApplicationNotFoundException.class)
	public void testDelete_ApplicationIdLessThanZero() throws ApplicationNotFoundException {
		LOGGER.info("Running testDelete_ApplicationIdLessThanZero");
				
		applicationService.delete(-1);
	}
	
	@Test(expected = ApplicationNotFoundException.class)
	public void testDelete_ExceptionHandling() throws ApplicationNotFoundException {
		LOGGER.info("Running testDelete_ExceptionHandling");
		
		doThrow(new RuntimeException("Database Error")).when(applicationRepository).deleteById(1);
		
		applicationService.delete(1);
	}
}
