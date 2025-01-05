package com.prajwal.bugtracking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class BugTrackingApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugTrackingApiApplication.class, args);
		log.info("Bug Tracking Application Started and running...");
	}

}
