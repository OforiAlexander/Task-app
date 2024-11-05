import { pool } from "../config/db.js";

async function seedDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP
            );
        `);

        const tasks = [
            { title: 'Complete QA documentation', completed: false },
            { title: 'Review design specs', completed: true },
            { title: 'Run automated tests', completed: false },
            { title: 'Prepare deployment checklist', completed: true },
            { title: 'Implement new feature', completed: false },
            { title: 'Refactor codebase', completed: false }
        ];

        for (const task of tasks) {
            await pool.query(
                'INSERT INTO tasks (title, completed) VALUES ($1, $2) ON CONFLICT DO NOTHING;',
                [task.title, task.completed]
            );
        }//Insert query to insert the data into the db

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    } finally {
        await pool.end();
    }
}

seedDatabase();