
export type Todo = {
    _id:string,
    title:string,
    isCompleted:boolean,
    description?: string,
    priority: 'low' | 'medium' | 'high',
    userId: string,
    createdAt:Date,
    updatedAt?:Date
}

export type newTodo = {
    title:string,
    priority: 'low' | 'medium' | 'high',
    isCompleted?:boolean
    description?: string,
    userId: string,
    createdAt:Date,
    updatedAt?:Date
}

export type updateTodoInput = {
    title?:string
    isCompleted?:boolean
    description?: string
    priority?: 'low' | 'medium' | 'high'
    updatedAt?:Date
}

export type ActionResponse ={
    message:string,
    error:string
}


  export type FilterType = 'all' | 'active' | 'completed';
