# Full-Stack Task Manager Application: Spring Boot Backend with React Frontend

## Overview

This project is a full-stack Task Manager application consisting of a Spring Boot backend and a React frontend. It includes features like environment-specific configurations, task management, user interactions, and is ready for deployment.

---

## Backend Setup (Spring Boot with MySQL)

### 1. Set Up Spring Boot Project

- The following dependencies were used:
  - Spring Web
  - Spring Data JPA
  - MySQL Driver
  - Lombok (Optional, for concise code)

### 2. Configure Environment Properties

- Two `application.properties` files were created:
  - `application-dev.properties` for the development environment.
  - `application-prod.properties` for the production environment.
- These properties include configuration details for the database URL, username, password, and logging levels.

Example:

```properties
# application-dev.properties
spring.datasource.url=jdbc:mysql://localhost:3306/dev_taskmanager_db
spring.datasource.username=root
spring.datasource.password=dev_password
spring.jpa.hibernate.ddl-auto=update

# application-prod.properties
spring.datasource.url=jdbc:mysql://prod-db-host:3306/prod_taskmanager_db
spring.datasource.username=prod_user
spring.datasource.password=prod_password
spring.jpa.hibernate.ddl-auto=none
```

### 3. Developed API Endpoints

- RESTful APIs were created using Spring Web.
- Spring Data JPA was used to interact with the database.

Example API:

```java
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
```

---

## Frontend Setup (React)

### 1. Set Up Project

- `create-react-app` was used to bootstrap the React project:
  ```bash
  npx create-react-app taskmanager-frontend
  ```

### 2. Created Components

- The UI was divided into components like `TaskList`, `TaskForm`, and `TaskItem`.

### 3. Fetch Data from Backend

- Axios was used to make API calls from the frontend to the backend.

React Example:

```javascript
import axios from "axios";
import { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}

export default TaskList;
```

### 4. Display Data

- The fetched data was rendered in the UI using JSX and styled with React Bootstrap.

React Example:

```javascript
return (
  <div className="task-list">
    {tasks.map((task) => (
      <div key={task.id} className="task-item">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
    ))}
  </div>
);
```

### 5. Handle User Interactions

- Event handlers were implemented to allow actions like adding, updating, or deleting tasks.
- Appropriate API calls were made to update the backend and refresh the UI.

Example:

```javascript
const deleteTask = (id) => {
  axios
    .delete(`http://localhost:8080/api/tasks/${id}`)
    .then(() => setTasks(tasks.filter((task) => task.id !== id)))
    .catch((error) => console.error(error));
};
```

---

## Additional Considerations

### 1. Authentication and Authorization

- Security mechanisms were implemented using Spring Security (backend) and JWT.

### 2. Error Handling

- Backend: Meaningful error messages with appropriate HTTP status codes were returned.
- Frontend: User-friendly error messages were displayed.

### 3. Testing

- Unit and integration tests were written for backend APIs.
- For React components, Jest was used to ensure proper functionality.

### 4. Deployment

- **Backend**: The backend was deployed using Docker and hosted on a cloud service like AWS, Azure, or Heroku.
- **Frontend**: The frontend was deployed on Vercel for easy hosting.

### 5. Continuous Integration and Continuous Delivery (CI/CD)

- CI/CD pipelines were set up using GitHub Actions to automate build, test, and deployment processes.

---

## Example Directory Structure

### Backend

```
backend/
|-- src/
|   |-- main/
|   |   |-- java/com/example/fullstack/
|   |   |   |-- config/
|   |   |   |-- controller/
|   |   |   |-- exception/
|   |   |   |-- model/
|   |   |   |-- repository/
|   |   |   |-- security/
|   |   |   |-- service/
|   |   |   |-- FullstackAppApplication.java
|   |-- resources/
|       |-- application.properties
|       |-- application-dev.properties
|       |-- application-prod.properties
```

### Frontend

#### React

```
frontend/
|-- src/
|   |-- components/
|       |-- TaskList.js
|       |-- TaskForm.js
|   |-- services/
|       |-- api.js
|   |-- App.js
```

---

## Conclusion

A full-stack Task Manager application was built using a Spring Boot backend and a React frontend. This README provides a guide to the features, setup, and deployment steps for the project.

---
