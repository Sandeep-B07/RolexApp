package com.rolexapp.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    // Render's health check pings "/" — answer with 200 so the
    // service is marked healthy (and live) on every platform.
    @GetMapping("/")
    public Map<String, Object> health() {
        Map<String, Object> body = new HashMap<>();
        body.put("status", "UP");
        body.put("app", "rolex-backend");
        body.put("api", "/api/watches");
        return body;
    }
}
