import { useState } from 'react';
import { FilterType, Todo } from '@/app/types/todos';


export function useTodos(todos:Todo[]) {
  
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

 // Filter and sort todos
  const filteredTodos = todos
    .filter(todo => {
      const matchesFilter = 
        filter === 'all' ||
        (filter === 'active' && !todo.isCompleted) ||
        (filter === 'completed' && todo.isCompleted);
      
      const matchesSearch = 
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    })
    
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.isCompleted).length,
    active: todos.filter(t => !t.isCompleted).length,
  };

  return {
    todos: filteredTodos,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  };
}