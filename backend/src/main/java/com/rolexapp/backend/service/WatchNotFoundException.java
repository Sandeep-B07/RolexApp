package com.rolexapp.backend.service;

public class WatchNotFoundException extends RuntimeException {
    public WatchNotFoundException(String message) {
        super(message);
    }
}
