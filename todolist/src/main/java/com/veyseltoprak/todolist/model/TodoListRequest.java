package com.veyseltoprak.todolist.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TodoListRequest {

    private String name;

    public TodoListRequest(String name) {
        this.name = name;
    }

}
