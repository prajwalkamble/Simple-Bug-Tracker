package com.prajwal.bugtracking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prajwal.bugtracking.entity.Release;

@Repository
public interface ReleaseRepository extends JpaRepository<Release, Integer> {
	
	// Find Release by its name
	Optional<Release> findByName(String name);
	
	// Find Release by name (Custom)
	@Query(value = "SELECT rel FROM Release rel WHERE rel.name = :name")
	Optional<Release> findReleaseByNameCustom(@Param("name") String name);
}
