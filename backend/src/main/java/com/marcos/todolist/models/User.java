package com.marcos.todolist.models;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.marcos.todolist.dtos.login.LoginRequestDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;

    @Column(unique = true)
    private String email;
    private String password;

    public boolean isLoginCorrect(LoginRequestDTO request, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(request.getPassword(), password);
    }
}
