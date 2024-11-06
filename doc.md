## TASK RESTFUL API TEST WITH NODEJS && POSTGRESQL
My task API Node.js project uses Sequelize ORM to manage and automate communication between the backend and PostgreSQL database. It follows the MVC (Model-View-Controller) architecture:

1. Database Setup:
- `config/db.js` initializes database connection using environment variables from `.env`
- `.env` stores my sensitive credentials but can be copied using the .env.example file if you're cloning
- Pooling manages database connections efficiently

2. Model Layer (`models/task.js`):
- Defines the database schema and field
- Specifies the fillable and guarded fields for tasks and any field constraints

3. Validation Layer (`validate.js`):
- Defines the validations for tasks and input endpoints passing through the route

4. Controller Layer (`TaskController.js`):
- The controller for tasks handles all the operations of the api. Update, Delete, Get all tasks and Creation of new tasks. 
- I used `async/await` to handle these asynchronous operations cleanly without callback chains or after specified tasks have completed
- This also includes status converted or displayed in json to assist the user read the error and level down on debugging
```javascript
try {
    // 1. Find task before update/delete
    const task = await Task.findByPk(id);
    if (!task) {
        return res.status(404)...  // Handle not found
    }
    
    // 2. Perform operation
    await task.update({ completed });
    
} catch (error) {
    // 3. Handle database errors
    console.error(error);
    return res.status(500)...
}
```

5. Database Setup:
- I used postgreSQL CLI commands create initial database [psql -U postgres], [CREATE DATABASE tasks; \c]
- Created a seeder file to assist in creating new data and using these data to test the API [NODE ./seeder/seed.js]

#### Frequently used `try-catch` blocks to create a detailed and layered error handling structure:
- `try` block: Attempts database or other operations first
- `catch` block: Handles any exceptions (connection errors, constraint violations, etc.)
- This ensures graceful error handling and proper user feedback served as a json or in the console

### The Task project structure summarizes:
- Clean separation
- Layered rror handling
- Secure database operations && sample data
- Type-safe database communication through Sequelize
- Input validation before database operations and at the endpoints
- Clear user feedback for any errors