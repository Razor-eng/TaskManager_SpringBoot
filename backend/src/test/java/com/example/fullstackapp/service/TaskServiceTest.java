package com.example.fullstackapp.service;

import com.example.fullstackapp.model.Task;
import com.example.fullstackapp.model.User;
import com.example.fullstackapp.repository.TaskRepository;
import com.example.fullstackapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTasksForUser() {
        User user = new User();
        user.setUsername("testuser");

        Task task1 = new Task();
        task1.setTitle("Task 1");
        Task task2 = new Task();
        task2.setTitle("Task 2");

        List<Task> tasks = Arrays.asList(task1, task2);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(taskRepository.findByUser(user)).thenReturn(tasks);

        List<Task> result = taskService.getAllTasksForUser("testuser");

        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        assertEquals("Task 2", result.get(1).getTitle());
    }

    @Test
    void createTaskForUser() {
        User user = new User();
        user.setUsername("testuser");

        Task task = new Task();
        task.setTitle("New Task");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task result = taskService.createTaskForUser(task, "testuser");

        assertEquals("New Task", result.getTitle());
        assertEquals(user, result.getUser());
    }

    @Test
    void updateTaskForUser() {
        User user = new User();
        user.setUsername("testuser");

        Task existingTask = new Task();
        existingTask.setId(1L);
        existingTask.setTitle("Old Title");
        existingTask.setUser(user);

        Task updatedTask = new Task();
        updatedTask.setTitle("Updated Title");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(taskRepository.findByIdAndUser(1L, user)).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        Task result = taskService.updateTaskForUser(1L, updatedTask, "testuser");

        assertEquals("Updated Title", result.getTitle());
    }

    @Test
    void deleteTaskForUser() {
        User user = new User();
        user.setUsername("testuser");

        Task task = new Task();
        task.setId(1L);
        task.setUser(user);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(taskRepository.findByIdAndUser(1L, user)).thenReturn(Optional.of(task));

        assertDoesNotThrow(() -> taskService.deleteTaskForUser(1L, "testuser"));

        verify(taskRepository, times(1)).delete(task);
    }
}

