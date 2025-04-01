package com.marcos.todolist.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcos.todolist.dtos.user.UserDto;
import com.marcos.todolist.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService service;

    @GetMapping
    public ResponseEntity<List<UserDto>> findAll() {
        List<UserDto> output = service.findAll();
        return ResponseEntity.ok().body(output);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        UserDto output = service.findById(id);
        return ResponseEntity.ok().body(output);
    }


    @PostMapping("/register")
    public ResponseEntity<UserDto> create(@Valid @RequestBody UserDto input) {
        UserDto output = service.create(input);
        return ResponseEntity.ok().body(output);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id, @Valid @RequestBody UserDto input) {
        UserDto output = service.update(id, input);
        return ResponseEntity.ok().body(output);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserDto> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
