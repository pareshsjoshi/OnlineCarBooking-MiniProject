// const mysql = require('mysql2');
import mysql from 'mysql2';
import dotenv from 'dotenv';
// const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // else {
        console.log('db ' + connection.state);
    // }
});

// export class DbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService();
//     }
//     async getAllData() {
//         try {
//             const response = await new Promise((resolve, reject) => {
//                 const query = "select * from bookings;";
//                 connection.query(query, (err, results) => {
//                     if (err) {
//                         reject(new Error(err.message));
//                     }
//                     // else {
//                         resolve(results);
//                     // }
//                 });
//             });
//             // console.log(response);
//             return response; 
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }