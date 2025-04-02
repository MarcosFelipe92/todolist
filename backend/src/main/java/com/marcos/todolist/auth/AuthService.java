package com.marcos.todolist.auth;

import java.time.Instant;
import java.util.Optional;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import com.marcos.todolist.dtos.login.LoginRequestDTO;
import com.marcos.todolist.dtos.login.LoginResponseDTO;
import com.marcos.todolist.models.User;
import com.marcos.todolist.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    public LoginResponseDTO login(LoginRequestDTO request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (!user.isPresent() || !user.get().isLoginCorrect(request, passwordEncoder)) {
            throw new BadCredentialsException("Email ou senha inválidos.");
        }

        Instant now = Instant.now();
        Long expiresIn = 10800L;

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("mybackend")
                .subject(user.get().getId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .build();

        String jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return new LoginResponseDTO(jwtValue, expiresIn);
    }

    public Long getUserId(JwtAuthenticationToken token) {
        return Long.parseLong(token.getName());
    }

}
