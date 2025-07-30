
export type Todo = {
    _id:string,
    title:string,
    isCompleted:boolean,
    priority: 'low' | 'medium' | 'high',
    createdAt:Date,
    updatedAt?:Date
}

export type newTodo = {
    title:string,
    priority: 'low' | 'medium' | 'high',
    isCompleted?:boolean
    createdAt:Date,
    updatedAt?:Date
}

export type updateTodoInput = {
    title?:string,
    isCompleted?:boolean
    priority?: 'low' | 'medium' | 'high'
    updatedAt?:Date
}

export type ActionResponse ={
    message:string,
    error:string
}


