package com.veyseltoprak.todolist.repository;

import com.veyseltoprak.todolist.model.*;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;


public interface TodoItemRepository extends CrudRepository<TodoItem, Long> {
    TodoItem findOneByIdAndListAndOwner(Long id, TodoList todoList, User owner);

    List<TodoItem> findAllByListAndOwner(TodoList todoList, User owner);


    @Transactional
    void deleteByIdAndListAndOwner(Long id, TodoList todoList, User owner);
}
