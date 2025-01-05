package com.prajwal.bugtracking.actuator;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class MailServiceHealth implements HealthIndicator {
	
	@Override
	public Health health() {
		if(isMailServiceAvailable()) {
			return Health.up().withDetail("Mail Service", "Mail service is up").build();
		} else {
			return Health.down().withDetail("Mail Service", "Mail service is up").build();
		}
	}
	
	private boolean isMailServiceAvailable() {
		return true;
	}
}
