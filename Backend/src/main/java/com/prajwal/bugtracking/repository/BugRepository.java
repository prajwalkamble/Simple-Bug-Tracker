package com.prajwal.bugtracking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prajwal.bugtracking.entity.Bug;

@Repository
public interface BugRepository extends JpaRepository<Bug, Integer> {
	
	// Find Bug by status
	Optional<Bug> findByStatus(String status);
	
	// Find Bug by status (Custom)
	@Query(value = "SELECT bugDetail FROM Bug bugDetail WHERE bugDetail.status = :status")
	Optional<Bug> findMyBugByStatusCustom(@Param("status") String status);
}
