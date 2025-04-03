package com.marcos.todolist.mappers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Instant;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.marcos.todolist.dtos.task.TaskDto;
import com.marcos.todolist.models.Task;
import com.marcos.todolist.models.enums.TaskStatus;

@ExtendWith(MockitoExtension.class)
public class TaskMapperTest {
    private static final Long ID = 1L;
    private static final String TITLE = "Read book";
    private static final String DESCRIPTION = "Read the book: Clean Code";
    private static final TaskStatus STATUS = TaskStatus.PENDENTE;
    private static final Instant COMPETED_AT = Instant.now();


    @Nested
    class DtoToEntity {

        @Test
        void shouldReturnTaskEntityWithCorrectData_whenMappingFromTaskDto() {
            // Arrange
            TaskDto input = new TaskDto(ID, TITLE, DESCRIPTION, STATUS, COMPETED_AT);

            // Act
            Task output = TaskMapper.dtoToEntity(input);

            // Assert
            assertEquals(ID, output.getId());
            assertEquals(TITLE, output.getTitle());
            assertEquals(DESCRIPTION, output.getDescription());
            assertEquals(STATUS, output.getStatus());
            assertEquals(COMPETED_AT, output.getCompletedAt());
        }
    }

    @Nested
    class EntityToDto {

        @Test
        void shouldReturnTaskDtoWithCorrectData_whenMappingFromTaskEntity() {
            // Arrange
            Task input = new Task(ID, TITLE, DESCRIPTION, STATUS, COMPETED_AT);

            // Act
            TaskDto output = TaskMapper.entityToDto(input);

            // Assert
            assertEquals(ID, output.getId());
            assertEquals(TITLE, output.getTitle());
            assertEquals(DESCRIPTION, output.getDescription());
            assertEquals(STATUS, output.getStatus());
            assertEquals(COMPETED_AT, output.getCompletedAt());
        }
    }

    @Nested
    class CopyAttributes {

        @Test
        void shouldUpdateTasknameAndEmailInEntity_whenCopyingFromDto() {
            // Arrange
            TaskDto dto = new TaskDto(ID, TITLE, DESCRIPTION, STATUS, COMPETED_AT);
            Task entity = new Task(ID, null, null, null, null);

            // Act
            TaskMapper.copyAttributes(entity, dto);

            // Assert
            assertEquals(entity.getTitle(), dto.getTitle());
            assertEquals(entity.getDescription(), dto.getDescription());
            assertEquals(entity.getStatus(), dto.getStatus());
            assertEquals(entity.getCompletedAt(), dto.getCompletedAt());
        }
    }
}
