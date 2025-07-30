"use server"

import { revalidatePath } from "next/cache";
import { bulkDeleteTodos, deleteTodo, fetchTodoById } from "../../lib/todos"
import { redirect } from "next/navigation";






export const deleteTodoAction = async (id:string) =>{

    if(!id) return 

    const todo = await fetchTodoById(id);

    if(!todo) return 
    const success = await deleteTodo(id);

    if(!success) return 

    revalidatePath("/todos")    
}

export const bulkDeleteTodoAction = async (ids:string[]) =>{

    if(!ids) return 

    
   
    const success = bulkDeleteTodos(ids)

    if(!success) return 
    
    revalidatePath("/todos")    
    redirect("/todos")
  
}