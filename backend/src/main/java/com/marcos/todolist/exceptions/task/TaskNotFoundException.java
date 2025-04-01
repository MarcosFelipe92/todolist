package com.marcos.todolist.exceptions.task;

public class TaskNotFoundException extends RuntimeException {
    
    public TaskNotFoundException(String msg) {
        super(msg);
    }
}
