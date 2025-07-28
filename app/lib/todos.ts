import { ObjectId } from "mongodb";
import { Todo ,newTodo, updateTodoInput} from "../types/todos";
import { getTodoCollection } from "./db";

export const fetchTodo = async():Promise<Todo[]> =>{

    try {
        const collection = await getTodoCollection();
        const todos = await collection.find().toArray();

       return todos.map((todo) =>({
             _id:todo._id.toString(),
            title:todo.title,
            isCompleted:todo.isCompleted,
            createdAt:todo.createdAt.toIoString(),
            updateAt:todo.updateAt.toIoString()
       }));

    } catch (error) {
        console.log(error);
        return []
    }
}


export const fetchTodoById = async(id:string):Promise<Todo | null> => {
    try {
        const collection = await getTodoCollection();
        const todo = await collection.findOne({_id:new ObjectId(id)});

        if(!todo) return null;

        return {
            _id:todo._id.toString(),
            title:todo.title,
            isCompleted:todo.isCompleted,
            createdAt:todo.createdAt.toString(),
            updatedAt:todo.updatedAt.toString(),
        }

    } catch (error) {
        console.log(error);
        return null
        
    }
}

export const createTodo = async(data:newTodo):Promise<string | null> => {

    try {
        const collection = await getTodoCollection();

        const todo = await collection.insertOne(data);

        if(!todo){
            return null
        }

        return todo.insertedId.toString()
        
    } catch (error) {
        console.log(error);
        return null
    }
}


export const updateTodo = async(id:string, data:updateTodoInput):Promise<boolean> =>{
    
    try {
        
        const collection = await getTodoCollection();

        const todo = await collection.updateOne({_id:new ObjectId(id)},{$set:data})

        return todo.modifiedCount > 0

    } catch (error) {
        console.log(error);
        return false
    }
}


export const deleteTodo = async (id:string):Promise<boolean> =>{

    try {
        const collection = await getTodoCollection();
        const todo = await collection.deleteOne({_id:new ObjectId(id)});
        
        return todo.deletedCount > 0
      
    } catch (error) {
        console.log(error);
        return false
        
    }
}