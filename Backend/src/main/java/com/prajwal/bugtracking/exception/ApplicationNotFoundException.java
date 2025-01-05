package com.prajwal.bugtracking.exception;

public class ApplicationNotFoundException extends Exception {

	private static final long serialVersionUID = 3302337162839995366L;

	public ApplicationNotFoundException() {
		super();
	}

	public ApplicationNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ApplicationNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public ApplicationNotFoundException(String message) {
		super(message);
	}

	public ApplicationNotFoundException(Throwable cause) {
		super(cause);
	}
}
