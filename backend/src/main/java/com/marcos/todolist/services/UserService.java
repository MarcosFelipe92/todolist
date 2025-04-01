package com.marcos.todolist.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.marcos.todolist.dtos.user.UserDto;
import com.marcos.todolist.exceptions.user.EmailAlreadyExists;
import com.marcos.todolist.exceptions.user.UserNotFound;
import com.marcos.todolist.mappers.UserMapper;
import com.marcos.todolist.models.User;
import com.marcos.todolist.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> findAll() {
        List<UserDto> list = repository.findAll().stream().map(UserMapper::entityToDto).collect(Collectors.toList());
        return list;
    }

    public UserDto findById(Long id) {
        User entity = repository.findById(id).orElseThrow(()-> new UserNotFound("Usuário não encontrado"));
        return UserMapper.entityToDto(entity);
    }

    @Transactional
    public UserDto create(UserDto input) {
        repository.findByEmail(input.getEmail()).ifPresent(user-> {
            throw new EmailAlreadyExists("Já existe um Usuário com esse E-mail.");
        });

        User entity = UserMapper.dtoToEntity(input);
        String encryptPassword = passwordEncoder.encode(input.getPassword());
        entity.setPassword(encryptPassword);

        entity = repository.save(entity);

        return UserMapper.entityToDto(entity);
    }

    @Transactional
    public UserDto update(Long id, UserDto input) {
        User entity = repository.findById(id).orElseThrow(()-> new UserNotFound("Usuário não encontrado"));
        String email = entity.getEmail();
        repository.findByEmail(email).ifPresent(user -> {
            if (!input.getEmail().equals(email)) {
                throw new EmailAlreadyExists("Email Já existe.");
            }
        });
        String encryptPassword = passwordEncoder.encode(input.getPassword());
        UserMapper.copyAttributes(entity, input);
        entity.setPassword(encryptPassword);

        entity = repository.save(entity);

        return UserMapper.entityToDto(entity);
    }

    public void delete(Long id) {
        repository.findById(id).orElseThrow(()-> new UserNotFound("Usuário não encontrado"));
        repository.deleteById(id);
    }
}
