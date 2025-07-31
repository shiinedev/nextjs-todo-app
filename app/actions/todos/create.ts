"use server"

import { revalidatePath } from "next/cache";
import { createTodo } from "../../lib/todos";
import { ActionResponse } from "@/app/types/todos";



export const createTodoAction = async (previousState:ActionResponse,formdata:FormData):Promise<ActionResponse> =>{

    const title =  formdata.get("title") as string;
    const priority =  formdata.get("priority") as 'low' | 'medium' | 'high';
    const description =  formdata.get("description") as string;
    const userId =  formdata.get("userId") as string;

    if(!title || title.trim().length === 0)
        return {error:"title is required" , message:""}
    if(!priority || priority.trim().length === 0)
        return {error:"priority is required" , message:""}
    if(!userId || userId.trim().length === 0)
        return {error:"user ID is required" , message:""}

    const todoId = await createTodo({title,priority,description, userId, createdAt:new Date(),updatedAt:new Date()})

    if(!todoId) return {error:"field to create todo",message:""}

    revalidatePath("/dashboard")
    return {message:"todo created success fully",error:""}

}