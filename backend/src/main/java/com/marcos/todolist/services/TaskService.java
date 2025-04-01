package com.marcos.todolist.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.marcos.todolist.dtos.task.TaskDto;
import com.marcos.todolist.exceptions.task.TaskNotFoundException;
import com.marcos.todolist.mappers.TaskMapper;
import com.marcos.todolist.models.Task;
import com.marcos.todolist.repositories.TaskRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TaskService {
    
    private final TaskRepository repository;

    public List<TaskDto> findAll() {
        List<TaskDto> list = repository.findAll().stream().map(TaskMapper::entityToDto).collect(Collectors.toList());
        return list;
    }

    public TaskDto findById(Long id) {
        Task entity = repository.findById(id).orElseThrow(()-> new TaskNotFoundException("Tarefa não encontrada."));
        return TaskMapper.entityToDto(entity);
    }

    @Transactional
    public TaskDto create(TaskDto input) {
        Task entity = TaskMapper.dtoToEntity(input);
        entity = repository.save(entity);

        return TaskMapper.entityToDto(entity);
    }

    @Transactional
    public TaskDto update(Long id, TaskDto input) {
        Task entity = repository.findById(id).orElseThrow(()-> new TaskNotFoundException("Tarefa não encontrada."));
        TaskMapper.copyAttributes(entity, input);

        entity = repository.save(entity);

        return TaskMapper.entityToDto(entity);
    }

    public void delete(Long id) {
        repository.findById(id).orElseThrow(()-> new TaskNotFoundException("Tarefa não encontrada."));
        repository.deleteById(id);
    }
}
