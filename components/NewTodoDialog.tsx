"use client"

import { useActionState, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';
import { createTodoAction } from '@/app/actions/todos/create';
import { loginUserResponse } from '@/app/types/user';

const initialState = {
  message: "",
  error: ""
}

interface NewTodoDialogProps {
  onAction?: () => void;
}

export function NewTodoDialog({ onAction }: NewTodoDialogProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<loginUserResponse | null>(null);


  const [state, formAction,isPending] = useActionState(createTodoAction, initialState)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const authUser = localStorage.getItem("todo-auth")
        ? JSON.parse(localStorage.getItem("todo-auth")!)
        : null;
      setUser(authUser);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    
    // Add the user ID to the form data
    if (user?._id) {
      formData.append('userId', user._id);
    }
    
    formAction(formData);
    
    setOpen(false);

    // Refresh the todo list after successful creation
    setTimeout(() => {
      onAction?.();
    }, 100);

   
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" disabled={isPending}>
          <Plus className="h-4 w-4" />
          New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Add a new task to your todo list with details and priority.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {state.error && <p className='text-sm bg-red-100 rounded text-red-600 p-2'>{state.error}</p>}
          {state.message && <p className='text-sm bg-green-100 rounded text-green-600 p-2'>{state.message}</p>}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter todo title..."
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name='description'
              placeholder="Enter todo description..."
              rows={3}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select name="priority" defaultValue="medium" disabled={isPending}>
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
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Todo'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}