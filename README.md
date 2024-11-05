# 🚀 Advanced Task Manager API

![Node.js](https://img.shields.io/badge/Node.js-v18.x-green.svg)
![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

#### This completed RESTFUL API was built with Nodejs Expressjs (For the backend), and PostgreSQL (For database manupulation).
- It follows the MVC structure.

## 📑 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)

## ✨ Features

- **Robust Architecture**
- **PostgreSQL Integration**
- **Error Handling**
- **Environment Configuration**

## 🔧 Prerequisites

Before you begin, install:

- Node.js (v18.x or higher)
- PostgreSQL (v14.x or higher)
- npm (v9.x or higher)

## 📁 Project Structure

```
project/
├── config/
│   └── db.js         
├── controllers/
│   └── TaskController.js
├── models/
│   └── task.js
├── router/
│   └── web.js
├── .env.example      
├── .gitignore
├── index.js           
└── package.json
```

## 🚀 Getting Started

Follow the steps below to clone with repo:

1. **Clone the repository**
   ```bash
   git clone https://github.com/OforiAlexander/Task-app.git
   cd Task-app
   ```

2. **Install dependencies**
   ```bash
   npm install 
   or npm update 
   # If Applicable or you're asked to update some dependencies, run the update command
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration:
   ```env
   PORT
   DB_HOST
   DB_PORT
   DB_NAME
   DB_USER
   DB_PASSWORD
   ```

4. **Set up the database**
   ```bash
   psql -U postgres
   CREATE DATABASE task_manager;
   \c task_manager
   ```
   ```sql
    SQL File has been added to the project, same as a seeder to test your db
   ```
   ``` seeder
   npm run ./seeder/seed.js
   # This is to run you seeder. 
   ```

5. **Start the server**
   ```bash
   npm start
   # We are using nodemon to automate starting our server
   ```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/:id` | Get a specific task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---
Task completed / API built by [Alexander Ofori](https://github.com/OforiAlexander)
