package com.marcos.todolist.mappers;

import com.marcos.todolist.dtos.user.UserDto;
import com.marcos.todolist.models.User;

public class UserMapper {
    
    public static User dtoToEntity(UserDto dto){
        Long id = dto.getId();
        String username = dto.getUsername();
        String email = dto.getEmail();
        String password = dto.getPassword();

        return new User(id, username, email, password);
    }

    public static UserDto entityToDto(User entity){
        Long id = entity.getId();
        String username = entity.getUsername();
        String email = entity.getEmail();
        String password = entity.getPassword();

        return new UserDto(id, username, email, password);
    }

    public static void copyAttributes(User entity, UserDto dto) {
        entity.setEmail(dto.getEmail());
        entity.setUsername(dto.getUsername());
    }
}
