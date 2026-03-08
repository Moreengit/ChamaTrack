const { Client } = require('pg');
require('dotenv').config();

async function connectDB() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();
        console.log("Connected to Supabase PostgreSQL");

        console.log("Data from database:");

    } catch (error) {
        console.error("Database error:", error);
    } finally {
        await client.end();
    }
}

module.exports = { Client, connectDB}