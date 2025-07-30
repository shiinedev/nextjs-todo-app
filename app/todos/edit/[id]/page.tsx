"use server"
import UpdateTodo from "@/app/components/UpdateTodo";
import { fetchTodoById } from "@/app/lib/todos";



interface updateProps{
    params:{
        id:string
    }
} 



const EditTodo = async({params}:updateProps) => {

 const todo = await fetchTodoById(params?.id)
 if (!todo) return null;

  return (
    <div className="bg-zinc-800 max-w-2xl rounded p-4 mx-auto mt-12">
     <UpdateTodo todo={todo} />
    </div>
  )
}

export default EditTodo
