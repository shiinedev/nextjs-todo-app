"use server"

import { redirect } from "next/navigation";
import { fetchTodoById, updateTodo } from "../../lib/todos";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id:string, userId:string) =>{

    if(!id || !userId) return

    const todo = await fetchTodoById(id);
    

    if(!todo) return 

    // Verify that the todo belongs to the user
    if (todo.userId !== userId) {
        return;
    }

    const succuss = await updateTodo(todo._id,{isCompleted: !todo.isCompleted,updatedAt:new Date()});

    console.log("after update:",todo);
    

    if(!succuss) return 

    revalidatePath("/dashboard");

}

export const bulkToggleTodo = async (ids:string[], userId:string) =>{

    if(!ids || !userId) return

    // Verify that all todos belong to the user
    for (const id of ids) {
        const todo = await fetchTodoById(id);
        if (!todo || todo.userId !== userId) {
            return;
        }
    }

    const success = ids.map(async (id) => await toggleTodo(id, userId)) 
    
    if(!success) return 

    revalidatePath("/dashboard");
    redirect("/dashboard")

}

