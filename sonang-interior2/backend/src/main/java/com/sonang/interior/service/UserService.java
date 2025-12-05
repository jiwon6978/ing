package com.sonang.interior.service;

import com.sonang.interior.dto.loginDto.LoginRequest;
import com.sonang.interior.dto.loginDto.RegisterRequest;
import com.sonang.interior.dto.loginDto.UserResponse;
import com.sonang.interior.entity.User;
import com.sonang.interior.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    @Transactional
    public UserResponse register(RegisterRequest request) {
        // 중복 체크
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("이미 사용중인 사용자명입니다");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 사용중인 이메일입니다");
        }
        
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword()) // 실제 운영에서는 암호화 필요
                .name(request.getName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .build();
        
        User savedUser = userRepository.save(user);
        return UserResponse.from(savedUser);
    }
    
    @Transactional
    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다"));
        
        // 비밀번호 검증 (실제 운영에서는 암호화된 비밀번호 비교)
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다");
        }
        
        // 마지막 로그인 시간 업데이트
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        return UserResponse.from(user);
    }
    
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다"));
        return UserResponse.from(user);
    }
    
    @Transactional(readOnly = true)
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다"));
        return UserResponse.from(user);
    }
}



