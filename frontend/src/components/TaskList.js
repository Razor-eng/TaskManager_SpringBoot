import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, AppBar, Toolbar, Paper } from '@mui/material';
import { Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Task
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Task title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="description"
              label="Task description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Add Task
            </Button>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Your Tasks
          </Typography>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} disablePadding>
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="toggle" onClick={() => handleToggleComplete(task)}>
                    {task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default TaskList;

