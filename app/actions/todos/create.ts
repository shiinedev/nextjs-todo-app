"use server"

import { revalidatePath } from "next/cache";
import { createTodo } from "../../lib/todos";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/app/types/todos";



export const createTodoAction = async (previousState:ActionResponse,formdata:FormData):Promise<ActionResponse> =>{

    const title =  formdata.get("title") as string;
    const priority =  formdata.get("priority") as 'low' | 'medium' | 'high';

    if(!title || title.trim().length === 0)
        return {error:"title is required" , message:""}
    if(!priority || priority.trim().length === 0)
        return {error:"priority is required" , message:""}

    const todoId = await createTodo({title,priority,createdAt:new Date(),updatedAt:new Date()})

    if(!todoId) return {message:"field to create todo",error:""}

    revalidatePath("/todos")
    redirect("/todos")

}