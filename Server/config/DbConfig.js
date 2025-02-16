import { createConnection } from "mysql2";

export function createConnectionObject(){
    return createConnection({
        host: "localhost",
        user: "root",
        password: "cdac",
        database: "webistan"
    });
}

export function establishConnection(){
    createConnectionObject().connect((error)=>{
        if (error) {
            console.log(error);
        }
        else{
            console.log("Connected to MySQL Database!");
        }
    });
}