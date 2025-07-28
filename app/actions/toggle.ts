"use server"

import { fetchTodoById, updateTodo } from "../lib/todos";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id:string) =>{

    if(!id) return "todo Id is required";

    const todo = await fetchTodoById(id);

    if(!todo) return "todo not found";

    const succuss = updateTodo(id,{isCompleted:!todo.isCompleted});

    if(!succuss) return "field to toggle todo "

    revalidatePath("/")

}