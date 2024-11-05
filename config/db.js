import pkg from "pg"; //Since the pg mudule is a commonJs module, i can't use {Pool} from "pg" thus i used pkg and assigned it to Pool
const {Pool} = pkg
import dotenv from "dotenv";

dotenv.config(); // Loads the envs

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
}); // Initializes & retrieves credentials from .env

const checkDbConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("Database connected to PostgreSQL");
        client.release();
        return true;
    } catch (error) {
        console.error("Connection not made for PostgreSQL: ", error.message);
        return false;
    }
};

export { pool, checkDbConnection };
