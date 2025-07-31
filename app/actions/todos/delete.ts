"use server"

import { revalidatePath } from "next/cache";
import { bulkDeleteTodos, deleteTodo, fetchTodoById } from "../../lib/todos"
import { redirect } from "next/navigation";

export const deleteTodoAction = async (id:string, userId:string) =>{

    if(!id) return 
    if(!userId) return

    const todo = await fetchTodoById(id);

    if(!todo) return 
    
    // Verify that the todo belongs to the user
    if (todo.userId !== userId) {
        return;
    }
    
    const success = await deleteTodo(id);

    if(!success) return 

    revalidatePath("/dashboard")    
}

export const bulkDeleteTodoAction = async (ids:string[], userId:string) =>{

    if(!ids) return 
    if(!userId) return

    // Verify that all todos belong to the user
    for (const id of ids) {
        const todo = await fetchTodoById(id);
        if (!todo || todo.userId !== userId) {
            return;
        }
    }
   
    const success = await bulkDeleteTodos(ids)

    if(!success) return 
    
    revalidatePath("/dashboard")    
    redirect("/dashboard")
  
}