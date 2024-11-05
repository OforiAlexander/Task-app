import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false, // Set to console.log to see SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const checkDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected to PostgreSQL");
        return true;
    } catch (error) {
        console.error("Connection not made for PostgreSQL: ", error.message);
        return false;
    }
};

export default sequelize;