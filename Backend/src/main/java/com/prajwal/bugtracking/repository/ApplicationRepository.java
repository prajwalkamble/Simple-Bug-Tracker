package com.prajwal.bugtracking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prajwal.bugtracking.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
	
	// Find application by its name
	Optional<Application> findByName(String name);
	
	// Custom query to find an application by name using a named parameter
	// Example usage: applicationRepository.findApplicationByNameCustom("AppName")
	@Query(value = "SELECT app FROM Application app WHERE app.name = :name")
	Optional<Application> findMyApplicationByNameCustom(@Param("name") String name);
}
