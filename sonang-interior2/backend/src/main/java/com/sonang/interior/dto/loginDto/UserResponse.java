package com.sonang.interior.dto.loginDto;

import com.sonang.interior.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponse {
    
    private Long id;
    private String username;
    private String email;
    private String name;
    private String phone;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    
    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(user.getName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .createdAt(user.getCreatedAt())
                .lastLogin(user.getLastLogin())
                .build();
    }
}

