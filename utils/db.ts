import mysql, { type ExecuteValues } from 'mysql2/promise';

export async function query(sql: string, params: ExecuteValues = []) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'toolshop',
    });
    const [rows] = await connection.execute(sql, params);
    await connection.end();
    return rows as any[];
}