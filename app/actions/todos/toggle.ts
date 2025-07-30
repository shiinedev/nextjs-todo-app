"use server"

import { redirect } from "next/navigation";
import { fetchTodoById, updateTodo } from "../../lib/todos";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id:string)=>{


    const todo = await fetchTodoById(id);
    

    if(!todo) return 

    const succuss = updateTodo(todo._id,{isCompleted: !todo.isCompleted,updatedAt:new Date()});

    console.log("after update:",todo);
    

    if(!succuss) return 

    revalidatePath("/todos");

}

export const bulkToggleTodo = async (ids:string[])=>{


    const success = ids.map(async (id) => await toggleTodo(id)) 
    
    if(!success) return 

    revalidatePath("/todos");
    redirect("/todos")

}

