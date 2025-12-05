package com.sonang.interior.controller;

import com.sonang.interior.dto.loginDto.LoginRequest;
import com.sonang.interior.dto.loginDto.RegisterRequest;
import com.sonang.interior.dto.loginDto.UserResponse;
import com.sonang.interior.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    
    private final UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UserResponse user = userService.register(request);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "회원가입이 완료되었습니다");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            UserResponse user = userService.login(request);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "로그인 성공");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        try {
            UserResponse user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}



