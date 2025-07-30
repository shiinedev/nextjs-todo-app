"use server"

import Link from "next/link";
import { fetchTodos } from "../lib/todos"
import TodoList from "../components/TodoList";



const Todos = async () => {

  const todos = await fetchTodos();
  console.log("todos",todos);
  
  const time = new Date().toDateString();

  return (

    <main className="bg-zinc-800 max-w-4xl rounded p-4 mx-auto mt-12">

      <div className="flex justify-between items center ">
        <h1>Todo App</h1>
        <Link href="/todos/new" className="bg-purple-600 p-2 text-white  rounded hover:bg-purple-700 cursor-pointer">Add Todo</Link>
      </div>
      <p>Last updated: {time} </p>

    

      <TodoList todos={todos} />
    </main>

  )
}

export default Todos
