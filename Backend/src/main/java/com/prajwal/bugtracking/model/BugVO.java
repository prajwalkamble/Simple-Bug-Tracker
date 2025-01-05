package com.prajwal.bugtracking.model;

import java.util.Date;

import com.prajwal.bugtracking.entity.Application;
import com.prajwal.bugtracking.entity.Release;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BugVO {
	
	private int id;
	private String type;
	private String applicationImpacted;
	private String assignedTo;	
	private Date createdOn;
	private String createdBy;
	private String status;	
	private String description;
	private Application application;
	private Release release;
}
