"use client"

import { useActionState, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '@/app/types/todos';
import { toggleTodo } from '@/app/actions/todos/toggle';
import { deleteTodoAction } from '@/app/actions/todos/delete';
import { DialogClose } from '@radix-ui/react-dialog';
import { updateTodoAction } from '@/app/actions/todos/update';
import { loginUserResponse } from '@/app/types/user';
import { TodoItemSkeleton } from './TodoItemSkeleton';

interface TodoItemProps {
  todo: Todo;
  onAction?: () => void;
}
const initialState = {
  message: "",
  error: ""
}

export function TodoItem({ todo, onAction }: TodoItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState<loginUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const [state, formAction] = useActionState(updateTodoAction, initialState)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const authUser = localStorage.getItem("todo-auth")
        ? JSON.parse(localStorage.getItem("todo-auth")!)
        : null;
      setUser(authUser);
    }
  }, []);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Add the user ID to the form data
    if (user?._id) {
      formData.append('userId', user._id);
    }
    
    formAction(formData);
    setEditOpen(false);
    
    // Refresh the todo list after successful edit
    setTimeout(() => {
      onAction?.();
      setIsLoading(false);
    }, 100);
  };

  const handleToggle = async () => {
    if (user?._id) {
      setIsToggling(true);
      await toggleTodo(todo._id, user._id);
      // Refresh the todo list after successful toggle
      setTimeout(() => {
        onAction?.();
        setIsToggling(false);
      }, 100);
    }
  };

  const handleDelete = async () => {
    if (user?._id) {
      setIsDeleting(true);
      await deleteTodoAction(todo._id, user._id);
      // Refresh the todo list after successful delete
      setTimeout(() => {
        onAction?.();
        setIsDeleting(false);
      }, 100);
    }
  };

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  // Show skeleton while loading
  if (isLoading || isDeleting || isToggling) {
    return <TodoItemSkeleton />;
  }

  return (
    <>
      <Card className={`transition-all duration-200 hover:shadow-lg ${todo.isCompleted ? 'opacity-75' : ''
        }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <button 
              onClick={handleToggle}
              disabled={isToggling}
              className="text-2xl hover:scale-110 transition-transform mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              title={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}>
              {todo.isCompleted ? '✅' : '⬜'}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-gray-900 dark:text-white ${todo.isCompleted ? 'line-through text-gray-500' : ''
                    }`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className={`text-sm text-gray-600 dark:text-gray-300 mt-1 ${todo.isCompleted ? 'line-through' : ''
                      }`}>
                      {todo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getPriorityColor(todo.priority)}>
                    {todo.priority}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditOpen(true)}
                    disabled={isLoading}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>
              </div>

              <div className="flex items-center gap-1 mt-3  text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(todo.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
          {state.error && <p className='text-sm bg-red-100 rounded text-red-600 p-2'>{state.error}</p>}
          {state.message && <p className='text-sm bg-green-100 rounded text-green-600 p-2'>{state.message}</p>}
            <div className="space-y-2">
              <Input
                className="hidden"
                name="id"
                defaultValue={todo._id}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                defaultValue={todo.title}
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name='description'
                defaultValue={todo.description}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-priority">Priority</Label>
              <Select name='priority' defaultValue={todo.priority} >
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

           
              <DialogFooter className='flex flex-col sm:flex-row sm:justify-end gap-3'>
                <DialogClose asChild>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </DialogClose>

                <Button type='submit' disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}