
export type Todo = {
    _id:string,
    title:string,
    isCompleted:boolean,
    createdAt:string,
    updatedAt?:string
}

export type newTodo = {
    title:string,
    isCompleted?:boolean
    createdAt:string,
    updatedAt?:string
}

export type updateTodoInput = {
    title?:string,
    isCompleted?:boolean
}

