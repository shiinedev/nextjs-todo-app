"use server"

import { revalidatePath } from "next/cache";
import { createTodo } from "../lib/todos";
import { redirect } from "next/navigation";


export const createTodoAction = async (formdata:FormData) =>{

    const title =  formdata.get("title") as string;

    if(!title || title.trim().length === 0)
        return "title is required"

    const todoId = await createTodo({title,isCompleted:false,createdAt:Date.now().toString()})

    if(!todoId) return "field to create todo"

    revalidatePath("/")
    redirect("/")

}