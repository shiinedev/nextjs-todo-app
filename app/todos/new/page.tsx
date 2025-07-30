"use client"

import { createTodoAction } from "@/app/actions/todos/create";
import Link from "next/link";
import { useActionState } from "react";


const initialState ={
  message:"",
  error:""
}

const NewTodo = () => {
    const [state,formAction] = useActionState(createTodoAction,initialState)
  return (
    <div className="bg-zinc-800 max-w-2xl rounded p-4 mx-auto mt-12">
      <form action={formAction} className="space-y-4 p-6 max-w-md mx-auto">
      <input
        name="title"
        placeholder="Add new Todo"
        className="border p-2 w-full"
      />
      <select name="priority" id="" className="border p-2 w-full">
        <option value="low" className="bg-black" selected >Low</option>
        <option value="medium" className="bg-black" >Medium</option>
        <option value="high" className="bg-black" >High</option>
      </select>
      <div className="flex space-x-2">
      <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded">
        Add Todo
      </button>
      <Link href={"/todos"} type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">
       Cancel
      </Link>
      </div>
      {state.error && (
        <p className="text-red-600 mt-4 font-medium">{state.error}</p>
      )}
      </form>
    </div>
  )
}

export default NewTodo
