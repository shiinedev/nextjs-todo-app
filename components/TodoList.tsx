"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { bulkDeleteTodoAction, deleteTodoAction } from '../app/actions/todos/delete'
import { bulkToggleTodo, toggleTodo } from '../app/actions/todos/toggle'
import formatTimeAgo from './FormatTimeAgo'
import { CalendarRange, Edit, Trash } from 'lucide-react'
import { Todo } from '../app/types/todos'
import { loginUserResponse } from '../app/types/user'

const TodoList = ({ todos }: { todos: Todo[] }) => {
    const [search, setSearch] = useState("")
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [user, setUser] = useState<loginUserResponse | null>(null);

    useEffect(() => {
        // Check if we're on the client side
        if (typeof window !== 'undefined') {
            const authUser = localStorage.getItem("todo-auth")
                ? JSON.parse(localStorage.getItem("todo-auth")!)
                : null;
            setUser(authUser);
        }
    }, []);

    useEffect(() => {
        setSearch(search)
    }, [search]);

    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
    //console.log(filteredTodos);
    

    const handleBulkDelete = async (ids: string[]) => {
        if (ids.length == 0 || !user?._id) return

        await bulkDeleteTodoAction(ids, user._id);
        setSelectedIds([]);
    }
    
    const handleBulkToggle = async (ids: string[]) => {
        if (ids.length == 0 || !user?._id) return

        await bulkToggleTodo(ids, user._id);
        setSelectedIds([]);
    }

    const handleToggle = async (todoId: string) => {
        if (!user?._id) return
        await toggleTodo(todoId, user._id);
    }

    const handleDelete = async (todoId: string) => {
        if (!user?._id) return
        await deleteTodoAction(todoId, user._id);
    }

    return (
        <main className='flex flex-col space-y-2'>
            <div className='flex items-center gap-2 mt-4'>
                <input type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="search todos"
                    className="flex-1 flex items-center w-full border-2 rounded p-2"
                />
                <div className='flex items-center space-x-2'>
                    {selectedIds.length > 0 && (

                        <button
                            onClick={() => handleBulkToggle(selectedIds)}
                            className='bg-green-300 text-black p-2 flex items-center gap-2'>
                            ✅
                            complete({selectedIds.length})
                        </button>

                    )}
                    {selectedIds.length > 0 && (

                        <button onClick={() => handleBulkDelete(selectedIds)} className='bg-red-500 p-2 flex items-center gap-2'>
                            <Trash />
                            Delete({selectedIds.length})
                        </button>

                    )}

                </div>

            </div>


            <div className="flex flex-col space-y-4 mt-6" >
                {filteredTodos.length > 0 ?
                    filteredTodos.map(todo => (
                        <div key={todo._id} className="flex justify-between items-center bg-zinc-700 p-2 rounded">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(todo._id)}
                                    onChange={e => {
                                        setSelectedIds(prev =>
                                            e.target.checked
                                                ? [...prev, todo._id]
                                                : prev.filter((id: string) => id !== todo._id)
                                        );
                                    }}
                                    className='w-6 border-2'
                                />

                                <button 
                                    onClick={() => handleToggle(todo._id)}
                                    className="text-2xl hover:scale-110 transition-transform"
                                    title={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}>
                                    {todo.isCompleted ? '✅' : '⬜'}
                                </button>
                                <p className={`flex-1 text-lg ${todo.isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>{todo.title}</p>

                                <p className={`px-2 py-1 rounded-full text-xs font-medium ${todo.priority === 'high'
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        : todo.priority === 'medium'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}>{todo.priority}</p>
                            </div>
                            <div className="flex space-x-2 items-center">
                                {todo?.createdAt && <span className="flex items-center space-x-2 text-sm"><CalendarRange size={15} />  created : {formatTimeAgo(todo.createdAt)}</span>}
                                {todo?.updatedAt && <span className="flex items-center space-x-2 text-sm"><CalendarRange size={15} />  updated : {formatTimeAgo(todo.updatedAt)}</span>}
                                <Link href={`/todos/edit/${todo._id}`} className="bg-green-600 p-1 text-white  rounded hover:bg-green-700 cursor-pointer "> <Edit size={20} /></Link>

                                <button 
                                    onClick={() => handleDelete(todo._id)}
                                    className="bg-red-600 p-1 text-white  rounded hover:bg-red-700 cursor-pointer ">
                                    <Trash size={20} />
                                </button>

                            </div>
                        </div>

                    ))
                    :
                    (
                        <div className='flex flex-col items-center space-y-4'>
                            <p className='text-gray-500'>No Found Todos yet </p>
                            <Link href="/todos/new" className='bg-violet-500 p-2 flex items-center gap-2 rounded'>Create New Todo</Link>
                        </div>

                    )

                }
            </div>
        </main>
    )
}

export default TodoList
