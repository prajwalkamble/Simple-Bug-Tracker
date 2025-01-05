package com.prajwal.bugtracking.model;

import java.util.Date;
import java.util.Set;

import com.prajwal.bugtracking.entity.Bug;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReleaseRequest {
	private int id;
	private String name;
	private Date releaseDate;
	private String status;
	private String comments;
	private Set<Bug> bugs;
}
