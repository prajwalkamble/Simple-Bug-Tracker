package com.prajwal.bugtracking.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.prajwal.bugtracking.entity.Application;

@DataJpaTest
@SpringJUnitConfig
public class ApplicationRepositoryTest {
	
	@Autowired
	private ApplicationRepository applicationRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	public void testFindByName() {
		// Create and save an application with more meaningful data
		Application application = new Application();
		
		application.setName("ImageEdit Pro");
		application.setDescription("Professional photo editing software with advanced features");
		application.setOwner("Aarav Patel");
		
		entityManager.persist(application);
		
		// Test the findByName method
		Optional<Application> foundApplication = applicationRepository.findByName("ImageEdit Pro");
		
		assertTrue(foundApplication.isPresent());
		assertEquals("ImageEdit Pro", foundApplication.get().getName());
		assertEquals("Professional photo editing software with advanced features", foundApplication.get().getDescription());
		assertEquals("Aarav Patel", foundApplication.get().getOwner());
	}
	
	@Test
	public void testFindMyApplicationByNameCustom() {
	// Create and save an application with more meaningful data
		Application application = new Application();
		
		application.setName("Threat Intelligence Platform");
		application.setDescription("Threat intel gathering application for security");
		application.setOwner("Prajwal Kamble");
		
		entityManager.persist(application);
		
		// Test the findByName method
		Optional<Application> foundApplication = applicationRepository.findMyApplicationByNameCustom("Threat Intelligence Platform");
		
		assertTrue(foundApplication.isPresent());
		assertEquals("Threat Intelligence Platform", foundApplication.get().getName());
		assertEquals("Threat intel gathering application for security", foundApplication.get().getDescription());
		assertEquals("Prajwal Kamble", foundApplication.get().getOwner());
	}
	
	@Test
	public void testFindByName_NotFound() {
		Optional<Application> foundApp = applicationRepository.findByName("Application not exists!");
		assertFalse(foundApp.isPresent());
	}
	
	@Test
	public void testFindMyApplicationByNameCustom_NotFound() {
		Optional<Application> foundApp = applicationRepository.findMyApplicationByNameCustom("Application not exists!");
		assertFalse(foundApp.isPresent());
	}
}
