package com.example.fullstackapp.repository;

import com.example.fullstackapp.model.Task;
import com.example.fullstackapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Find tasks by user
    List<Task> findByUser(User user);

    // Find a task by its ID and user
    Optional<Task> findByIdAndUser(Long id, User user);
}
