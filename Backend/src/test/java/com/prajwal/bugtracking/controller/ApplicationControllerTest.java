package com.prajwal.bugtracking.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prajwal.bugtracking.exception.ApplicationNotFoundException;
import com.prajwal.bugtracking.model.ApplicationRequest;
import com.prajwal.bugtracking.model.ApplicationVO;
import com.prajwal.bugtracking.service.IApplicationService;

@RunWith(SpringRunner.class)
@WebMvcTest(ApplicationController.class)
@AutoConfigureMockMvc
public class ApplicationControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private IApplicationService applicationService;
	
	@InjectMocks
	private ApplicationController applicationController;
	
	@Autowired
	private WebApplicationContext webApplicationContext;
	
	private final ObjectMapper objectMapper = new ObjectMapper();
	
	@Before
	public void setUp() {
		// Setup MockMvc for testing
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	public void testGetApplications() throws Exception {
		// Given
		List<ApplicationVO> applicationVOS = new ArrayList<>();
		
		ApplicationVO applicationVO = new ApplicationVO();
		
		applicationVO.setId(1);
		applicationVO.setName("MS Office");
		applicationVOS.add(applicationVO);
		
		// Mock the service response
		when(applicationService.findAll()).thenReturn(applicationVOS);
		
		// When/Then: Perform GET request and expect 200 status
		mockMvc.perform(get("/api/v1/applications")).andExpect(status().isOk());
	}
	
	@Test
	public void testGetApplicationById() throws Exception {
		// Given
		int applicationId = 1;
		ApplicationVO applicationVO = new ApplicationVO();
		
		// Mock the service response
		when(applicationService.findById(applicationId)).thenReturn(applicationVO);
		
		// When/Then: Perform GET request with an ID and expect 200 status
		mockMvc.perform(get("/api/v1/applications/{applicationId}", applicationId)).andExpect(status().isOk());
	}
	
	@Test
	public void testGetApplicationById_IfApplicationNull() throws Exception {
		
		when(applicationService.findById(anyInt())).thenReturn(null);
		
		mockMvc.perform(get("/api/v1/applications/{id}", 1)).andExpect(status().isNotFound());
	}
	
	@Test
	public void testGetApplicationById_ExceptionHandling() throws Exception {
		when(applicationService.findById(anyInt())).thenThrow(new RuntimeException("Internal Server Error"));
		
		mockMvc.perform(get("/api/v1/applications/{id}", 1)).andExpect(status().isInternalServerError());
	}
	
	@Test
	public void testSaveApplication() throws Exception {
		//Given
		ApplicationRequest applicationRequest = new ApplicationRequest();
		
		ApplicationVO applicationVO = new ApplicationVO();
		
		// Mock the service response
		when(applicationService.save(any(ApplicationRequest.class))).thenReturn(applicationVO);
		
		// When/Then: Perform POST request and expect 200 status
		mockMvc.perform(post("/api/v1/applications")
					 .contentType(MediaType.APPLICATION_JSON)
					 .content(new ObjectMapper().writeValueAsString(applicationRequest)))
					 .andExpect(status().isOk());
	}

	@Test
	public void testSaveApplication_ApplicationNotFound() throws Exception {
		
    mockMvc.perform(post("/api/v1/applications")
    			 .contentType(MediaType.APPLICATION_JSON)
    			 .content("{}"))
    			 .andExpect(status().isNotFound());
    
    applicationService.save(null);
	}
	
	@Test(expected = Exception.class)
	public void testSaveApplication_ExceptionHandling() throws Exception {
		ApplicationRequest applicationRequest = new ApplicationRequest();
		
		doThrow(new RuntimeException("Exception while saving application.")).when(applicationService).save(applicationRequest);
		
		mockMvc.perform(post("/api/v1/applications")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(applicationRequest)))
        .andExpect(status().isInternalServerError());
	}
	
	@Test
	public void testUpdateApplication() throws Exception {
		// Given
		ApplicationRequest applicationRequest = new ApplicationRequest();
		applicationRequest.setId(1);
		applicationRequest.setName("Postman");
		
		ApplicationVO applicationVO = new ApplicationVO();
		applicationVO.setId(applicationRequest.getId());
		applicationVO.setName(applicationRequest.getName());
		
		// Mock the service response
		when(applicationService.save(any(ApplicationRequest.class))).thenReturn(applicationVO);
		
		mockMvc.perform(put("/api/v1/applications")
				 .contentType(MediaType.APPLICATION_JSON)
				 .content(new ObjectMapper().writeValueAsString(applicationRequest)))
				 .andExpect(status().isOk())
				 .andExpect(jsonPath("$.id").value(applicationRequest.getId()))
				 .andExpect(jsonPath("$.name").value(applicationRequest.getName()));
	}
	
	@Test
	public void testDeleteApplication() throws Exception {
		// Given
		int applicationId = 1;
		String responseMessage = "Application has been deleted";
		
		// Mock the service response
		when(applicationService.delete(applicationId)).thenReturn(responseMessage);
		
		// When/Then: Perform DELETE request with an ID and expect a 200 status
		mockMvc.perform(delete("/api/v1/applications")
					 .param("id", String.valueOf(applicationId)))
					 .andExpect(status().isOk());
	}
	
	@ Test
	public void testGetApplicationByName() throws Exception {
		// Given
		String name = "Test Application";
		ApplicationVO applicationVO = new ApplicationVO();
		
		// Mock the service response
		when(applicationService.findMyApplicationByName(name)).thenReturn(applicationVO);
		
		// When/Then: Perform DELETE request with an ID and expect a 200 status
		mockMvc.perform(get("/api/v1/applications/name")
					 .param("name", name))
					 .andExpect(status().isOk());
	}
}
