package com.prajwal.bugtracking.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
@Table(name = "APPLICATION_TBL")
public class Application implements Serializable {
	private static final long serialVersionUID = -2906401079708691303L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "application_gen")
	@SequenceGenerator(name = "application_gen", sequenceName = "APPLICATION_TBL_SEQ", allocationSize = 1)
	@Column(name = "APPLICATION_ID")
	private int id;
	
	private String name;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATED_ON")
	private Date createdOn;
	
	private String description;
	
	private String owner;
	
}
