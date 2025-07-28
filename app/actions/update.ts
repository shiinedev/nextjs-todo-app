"use serer"

import { revalidatePath } from "next/cache";
import { fetchTodoById, updateTodo } from "../lib/todos";
import { redirect } from "next/navigation";

export const updateTodoAction = async (formdata:FormData) =>{

    try {
        const id =  formdata.get("id") as string;
    const title =  formdata.get("title") as string

    if(!title || title.trim().length === 0)
        return "title is required"

    const todo = await fetchTodoById(id);

    if(!todo) return "todo not found"

    const success = await updateTodo(id, {title});

    if(!success) return "field to update todo"

    revalidatePath("/");
    redirect("/")
    } catch (error) {
        console.log(error);
        return "field to update todo"
        
    }
    

}