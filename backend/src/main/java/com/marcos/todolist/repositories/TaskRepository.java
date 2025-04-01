package com.marcos.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.todolist.models.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
}
