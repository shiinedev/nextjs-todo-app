"use server"

import { revalidatePath } from "next/cache";
import { deleteTodo, fetchTodoById } from "../lib/todos"


export const deleteTodoAction = async (id:string) =>{

    if(!id) return "todo ID is required"

    const todo = await fetchTodoById(id);

    if(!todo) return "todo not found"

    const success = await deleteTodo(id);

    if(!success) return "field to delete todo"

    revalidatePath("/")
    
}