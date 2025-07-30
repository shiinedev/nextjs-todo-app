
"use client"

import Link from "next/link"
import { useActionState } from "react"
import { updateTodoAction } from "../actions/todos/update"
import { notFound } from "next/navigation"
import type { Todo } from "@/app/types/todos";


const initialState ={
    message:"",
    error:""
  }

const UpdateTodo = ({ todo }: { todo: Todo }) => {


    const [state,formAction] = useActionState(updateTodoAction,initialState)

    if(!todo) return notFound();

    
  return (
    <div>
       <form action={formAction} className="space-y-4 p-6 max-w-md mx-auto">
      <input
        name="id"
        placeholder="Enter your name"
        className="hidden"
        value={todo._id}
        readOnly
      />
      <input
        name="title"
        placeholder="Update your todo title"
        className="border p-2 w-full"
        defaultValue={todo.title}
      />
        <select name="priority" defaultValue={todo.priority} className="border p-2 w-full">
        <option value="low" className="bg-black">Low</option>
        <option value="medium" className="bg-black" >Medium</option>
        <option value="high" className="bg-black" >High</option>
      </select>
      <div className="flex items-center space-x-2">
      <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded">
        update Todo
      </button>
      <Link href={"/todos"} type="submit" className="bg-gray-600 text-white px-4 py-2 rounded">
       cancel
      </Link>
      </div>
      
      {state.error && (
        <p className="text-red-600 mt-4 font-medium">{state.error}</p>
      )}
      </form>
    </div>
  )
}

export default UpdateTodo
