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
@Table(name = "RELEASE_TBL")
public class Release implements Serializable{
	 
	private static final long serialVersionUID = 4732354383845233601L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "release_gen")
	@SequenceGenerator(name = "release_gen", sequenceName = "RELEASE_TBL_SEQ", allocationSize = 1)
	@Column(name = "RELEASE_ID")
	private int id;
	
	private String name;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "RELEASE_DATE")
	private Date releaseDate;
	
	private String status;
	private String comments;

}
