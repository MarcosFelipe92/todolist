package com.marcos.todolist.mappers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.marcos.todolist.dtos.user.UserDto;
import com.marcos.todolist.models.User;

@ExtendWith(MockitoExtension.class)
public class UserMapperTest {
    private static final Long ID = 1L;
    private static final String USERNAME = "John Doe";
    private static final String EMAIL = "johndoe@example.com";
    private static final String PASSWORD = "password123";


    @Nested
    class DtoToEntity {

        @Test
        void shouldReturnUserEntityWithCorrectData_whenMappingFromUserDto() {
            // Arrange
            UserDto input = new UserDto(ID, USERNAME, EMAIL, PASSWORD);

            // Act
            User output = UserMapper.dtoToEntity(input);

            // Assert
            assertEquals(ID, output.getId());
            assertEquals(USERNAME, output.getUsername());
            assertEquals(EMAIL, output.getEmail());
            assertEquals(PASSWORD, output.getPassword());
        }
    }

    @Nested
    class EntityToDto {

        @Test
        void shouldReturnUserDtoWithCorrectData_whenMappingFromUserEntity() {
            // Arrange
            User input = new User(ID, USERNAME, EMAIL, PASSWORD);

            // Act
            UserDto output = UserMapper.entityToDto(input);

            // Assert
            assertEquals(ID, output.getId());
            assertEquals(USERNAME, output.getUsername());
            assertEquals(EMAIL, output.getEmail());
            assertEquals(PASSWORD, output.getPassword());
        }
    }

    @Nested
    class CopyAttributes {

        @Test
        void shouldUpdateUsernameAndEmailInEntity_whenCopyingFromDto() {
            // Arrange
            UserDto dto = new UserDto(ID, USERNAME, EMAIL, PASSWORD);
            User entity = new User(ID, null, null, PASSWORD);

            // Act
            UserMapper.copyAttributes(entity, dto);

            // Assert
            assertEquals(entity.getUsername(), dto.getUsername());
            assertEquals(entity.getEmail(), dto.getEmail());
        }
    }
}
