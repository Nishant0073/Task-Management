
# Task Management System

## Overview

The Task Management System is a robust application designed to help users efficiently manage, track, and organize their tasks. It provides a seamless interface for creating, editing, viewing, and deleting tasks. The frontend is developed using React.js, leveraging `react-router-dom` for navigation, while the backend API is powered by .NET Core.

## Features

- **Task Creation**: Easily add new tasks with titles, descriptions, priorities, and due dates.
- **Task Editing**: Update existing tasks, including their details and completion status.
- **Task Viewing**: View a comprehensive list of tasks with filtering and sorting options.
- **Task Deletion**: Remove tasks that are no longer required.

## Tech Stack

- **Frontend**: React.js, React Router
- **Backend**: .NET Core
- **Database**: MySQL
- **Styling**: Bootstrap, Custom CSS
- **Authentication**: JWT (JSON Web Token)

## How to Run

### **Backend (.NET Core)**
1. Clone the repository:
   ```bash
   git clone https://github.com/Nishant0073/Task-Management
   ```
2. Navigate to the backend project directory:
   ```bash
   cd Task_Management/Task_Management.API
   ```
3. Restore NuGet dependencies:
   ```bash
   dotnet restore
   ```
4. Build the project:
   ```bash
   dotnet build
   ```
5. Run the project:
   ```bash
   dotnet run
   ```

---

### **Frontend (React.js)**
1. Navigate to the frontend project directory:
   ```bash
   cd Task_Management/task_management.client
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

---

## You're all set!
The backend will run on the configured port (default: `http://localhost:5182`) and the frontend will be available at `http://localhost:3000`. Open your browser and enjoy managing your tasks efficiently!
