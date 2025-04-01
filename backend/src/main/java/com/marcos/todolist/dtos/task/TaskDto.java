package com.marcos.todolist.dtos.task;

import java.time.Instant;

import com.marcos.todolist.models.enums.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private Instant completedAt;
}
