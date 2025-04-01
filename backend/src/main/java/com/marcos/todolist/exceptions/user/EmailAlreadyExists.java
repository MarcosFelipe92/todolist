package com.marcos.todolist.exceptions.user;

public class EmailAlreadyExists extends RuntimeException {
    
    public EmailAlreadyExists(String msg) {
        super(msg);
    }
}
