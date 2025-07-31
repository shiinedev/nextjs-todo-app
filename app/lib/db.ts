"use server"
import { MongoClient,Db } from "mongodb";

const url = process.env.MONGODB_URI;

if(!url){
    throw new Error("MONGODB_URI environment variable is not defined");
}

let client : MongoClient;
let db:Db;

export async function connectToDatabase(){
    if(!client){
        client = new MongoClient(url as string);
        client.connect();
        db = client.db("todo_app");
    
    }
    return { client, db };
}

export async function getUserCollection(){
    if(!db) {
        const { db: database } = await connectToDatabase();
        return database.collection('users');
    }

    return db.collection('users');
}

export async function getTodoCollection(){
    if(!db) {
        const { db: database } = await connectToDatabase();
        return database.collection('todos');
    }

    return db.collection('todos');
}