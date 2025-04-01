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

import com.marcos.todolist.dtos.task.TaskDto;
import com.marcos.todolist.services.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService service;

    @GetMapping
    public ResponseEntity<List<TaskDto>> findAll() {
        List<TaskDto> output = service.findAll();
        return ResponseEntity.ok().body(output);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> findById(@PathVariable Long id) {
        TaskDto output = service.findById(id);
        return ResponseEntity.ok().body(output);
    }


    @PostMapping
    public ResponseEntity<TaskDto> create(@Valid @RequestBody TaskDto input) {
        TaskDto output = service.create(input);
        return ResponseEntity.ok().body(output);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> update(@PathVariable Long id, @Valid @RequestBody TaskDto input) {
        TaskDto output = service.update(id, input);
        return ResponseEntity.ok().body(output);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TaskDto> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
