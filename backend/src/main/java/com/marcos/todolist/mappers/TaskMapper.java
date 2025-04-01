package com.marcos.todolist.mappers;

import java.time.Instant;

import com.marcos.todolist.dtos.task.TaskDto;
import com.marcos.todolist.models.Task;
import com.marcos.todolist.models.enums.TaskStatus;

public class TaskMapper {
    public static Task dtoToEntity(TaskDto dto){
        Long id = dto.getId();
        String title = dto.getTitle();
        String description = dto.getDescription();
        TaskStatus status = dto.getStatus();
        Instant completedAt = dto.getCompletedAt();

        return new Task(id, title, description, status, completedAt);
    }

    public static TaskDto entityToDto(Task entity){
        Long id = entity.getId();
        String title = entity.getTitle();
        String description = entity.getDescription();
        TaskStatus status = entity.getStatus();
        Instant completedAt = entity.getCompletedAt();

        return new TaskDto(id, title, description, status, completedAt);
    }

    public static void copyAttributes(Task entity, TaskDto dto) {
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus());
        entity.setCompletedAt(dto.getCompletedAt());
    }
}
