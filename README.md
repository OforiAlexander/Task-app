# Task API Creation and Docs

![Node.js](https://img.shields.io/badge/Node.js-v18.x-green.svg)
![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14.x-blue.svg)

#### My completed RESTFUL API Task was built with Nodejs Expressjs (For the backend), and PostgreSQL (For database manupulation).
- It follows the MVC structure.


## Features

- **Robust Architecture**
- **PostgreSQL Integration**
- **Error Handling**
- **Environment Configuration**

## Prerequisites

Before you begin, install:

- Node.js (v18.x or higher)
- PostgreSQL (v14.x or higher)
- npm (v9.x or higher)

## Project Structure

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
├── seeder/
│   └── seed.js
├── .env.example      
├── .gitignore
├── index.js           
└── package.json
└── validate.js
```

## Getting Started

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
   CREATE DATABASE tasks;
   \c tasks

   # You can use tableplus or pgAdmin to manage the database
   ```
   - sql
   A seeder js file has been added to test your db
   run or change the directory if you please
   __
   ```bash
   node ./seeder/seed.js
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
| PUT | `/tasks/:id` | Update a the completed field of task |
| DELETE | `/tasks/:id` | Delete a task |

---
NTC Task completed