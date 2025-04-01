package com.marcos.todolist.exceptions.user;

public class EmailAlreadyExistsException extends RuntimeException {
    
    public EmailAlreadyExistsException(String msg) {
        super(msg);
    }
}
