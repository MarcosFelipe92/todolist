package com.marcos.todolist.exceptions.user;

public class UserNotFound extends RuntimeException {
    
    public UserNotFound(String msg){
        super(msg);
    }
}
