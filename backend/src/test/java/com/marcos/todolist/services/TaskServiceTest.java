package com.marcos.todolist.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.marcos.todolist.dtos.task.TaskDto;
import com.marcos.todolist.exceptions.task.TaskNotFoundException;
import com.marcos.todolist.mappers.TaskMapper;
import com.marcos.todolist.models.Task;
import com.marcos.todolist.models.enums.TaskStatus;
import com.marcos.todolist.repositories.TaskRepository;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {
    private static final Long ID = 1L;
    private static final String TITLE = "Read book";
    private static final String DESCRIPTION = "Read the book: Clean Code";
    private static final TaskStatus STATUS = TaskStatus.CONCLUIDO;
    private static final Instant COMPETED_AT = Instant.now();

    private static final String EXCEPTION_MESSAGE_TASK_NOT_FOUND = "Tarefa não encontrada.";

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private Task mockTask;

    @InjectMocks
    private TaskService taskService;

    @Captor
    private ArgumentCaptor<Task> taskArgumentCaptor;

    @Nested
    class FindAll {

        @Test
        void shouldReturnListOfTaskDto_whenFindAllIsInvoked() {
            // Arrange
            when(mockTask.getId()).thenReturn(ID);
            when(mockTask.getTitle()).thenReturn(TITLE);
            when(mockTask.getDescription()).thenReturn(DESCRIPTION);
            when(mockTask.getStatus()).thenReturn(STATUS);
            when(mockTask.getCompletedAt()).thenReturn(COMPETED_AT);

            when(taskRepository.findAll()).thenReturn(List.of(mockTask));

            // Act
            List<TaskDto> output = taskService.findAll();

            // Assert
            assertEquals(ID, output.get(0).getId());
            assertEquals(TITLE, output.get(0).getTitle());
            assertEquals(DESCRIPTION, output.get(0).getDescription());
            assertEquals(STATUS, output.get(0).getStatus());
            assertEquals(COMPETED_AT, output.get(0).getCompletedAt());
        }
    }

    @Nested
    class findById {

        @Test
        void shouldReturnTaskDto_whenTaskExistsForGivenId() {
            // Arrange
            setupMockTask();

            when(taskRepository.findById(anyLong())).thenReturn(Optional.of(mockTask));

            // Act
            TaskDto output = taskService.findById(ID);

            // Assert
            assertEquals(ID, output.getId());
            assertEquals(TITLE, output.getTitle());
            assertEquals(DESCRIPTION, output.getDescription());
            assertEquals(STATUS, output.getStatus());
            assertEquals(COMPETED_AT, output.getCompletedAt());
        }

        @Test
        void shouldThrowTaskTaskNotFound_whenTaskDoesNotExistForGivenId() {
            // Arrange
            when(taskRepository.findById(anyLong())).thenReturn(Optional.empty());

            // Act and Assert
            TaskNotFoundException exception = assertThrows(TaskNotFoundException.class,
                    () -> taskService.findById(ID));

            assertEquals(EXCEPTION_MESSAGE_TASK_NOT_FOUND, exception.getMessage());
        }
    }

    @Nested
    class Create {

        @Test
        void shouldSaveTaskReturnDto_whenCreatingWithValidData() {
            // Arrange
            setupMockTask();
            when(taskRepository.save(taskArgumentCaptor.capture())).thenReturn(mockTask);

            TaskDto input = TaskMapper.entityToDto(mockTask);

            // Act
            TaskDto output = taskService.create(input);

            // Assert
            verify(taskRepository, times(1)).save(taskArgumentCaptor.capture());
            assertNotNull(output);
        }
    }

    @Nested
    class Update {

        @Test
        void shouldUpdateTaskReturnDto_whenTaskExistsForGivenId() {
            // Arrange
            setupMockTask();

            when(taskRepository.save(taskArgumentCaptor.capture())).thenReturn(mockTask);
            when(taskRepository.findById(ID)).thenReturn(Optional.of(mockTask));

            TaskDto input = TaskMapper.entityToDto(mockTask);

            // Act
            TaskDto output = taskService.update(ID, input);

            // Assert
            verify(taskRepository, times(1)).save(taskArgumentCaptor.capture());
            assertNotNull(output);
        }

        @Test
        void shouldThrowTaskTaskNotFound_whenUpdatingNonExistentTask() {
            // Arrange
            when(taskRepository.findById(ID)).thenReturn(Optional.empty());
            TaskDto input = new TaskDto(ID, TITLE, DESCRIPTION, STATUS, COMPETED_AT);

            // Act and Assert
            TaskNotFoundException exception = assertThrows(TaskNotFoundException.class,
                    () -> taskService.update(ID, input));

            assertEquals(EXCEPTION_MESSAGE_TASK_NOT_FOUND, exception.getMessage());
        }
    }

    @Nested
    class Delete {

        @Test
        void shouldCallRepositoryDeleteById_whenTaskExistsForGivenId() {
            // Arrange
            when(taskRepository.findById(anyLong())).thenReturn(Optional.of(mockTask));

            // Act
            taskService.delete(ID);

            // Assert
            verify(taskRepository, times(1)).deleteById(ID);
        }

        @Test
        void shouldThrowTaskTaskNotFound_whenDeletingNonExistentTask() {
            // Arrange
            when(taskRepository.findById(anyLong())).thenReturn(Optional.empty());

            // Act and Assert
            TaskNotFoundException exception = assertThrows(TaskNotFoundException.class,
                    () -> taskService.delete(ID));

            assertEquals(EXCEPTION_MESSAGE_TASK_NOT_FOUND, exception.getMessage());
        }
    }

    private void setupMockTask() {
        when(mockTask.getId()).thenReturn(ID);
        when(mockTask.getTitle()).thenReturn(TITLE);
        when(mockTask.getDescription()).thenReturn(DESCRIPTION);
        when(mockTask.getStatus()).thenReturn(STATUS);
        when(mockTask.getCompletedAt()).thenReturn(COMPETED_AT);
    }
}
