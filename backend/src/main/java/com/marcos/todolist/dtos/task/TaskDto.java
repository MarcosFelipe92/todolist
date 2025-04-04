package com.marcos.todolist.dtos.task;

import java.time.Instant;

import com.marcos.todolist.models.enums.TaskStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TaskDto {
    private Long id;
    
    @NotBlank(message = "Titulo é obrigatório")
    private String title;

    @NotBlank(message = "Descrição é obrigatória")
    private String description;
    
    @NotNull(message = "Status é obrigatório")
    private TaskStatus status;
    private Instant completedAt;
}
