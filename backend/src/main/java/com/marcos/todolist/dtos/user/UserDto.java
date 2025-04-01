package com.marcos.todolist.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String password;
}
