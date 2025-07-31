
"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Target, LogOut, TrendingUp } from 'lucide-react';
import { NewTodoDialog } from '@/components/NewTodoDialog';
import { ModeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { TodoItem } from '@/components/TodoItem';
import { useTodos } from '../lib/use-todos';
import { Todo } from '../types/todos';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { loginUserResponse } from '../types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';

export default function TodoDashboardClient({ todos: initialTodos }: { todos: Todo[] }) {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loading, setLoading] = useState(true);
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
    const fetchUserTodos = async () => {
      if (user?._id) {
        try {
          const response = await fetch(`/api/todos?userId=${user._id}`);
          if (response.ok) {
            const userTodos = await response.json();
            setTodos(userTodos);
          } else {
            console.error('Failed to fetch todos');
            setTodos([]);
          }
        } catch (error) {
          console.error('Error fetching todos:', error);
          setTodos([]);
        }
      }
      setLoading(false);
    };

    if (user) {
      fetchUserTodos();
    } else {
      setLoading(false);
    }
  }, [user?._id]);

  // Function to refresh todos
  const refreshTodos = async () => {
    if (user?._id) {
      try {
        const response = await fetch(`/api/todos?userId=${user._id}`);
        if (response.ok) {
          const userTodos = await response.json();
          setTodos(userTodos);
        }
      } catch (error) {
        console.error('Error refreshing todos:', error);
      }
    }
  };

  // Refresh todos every 5 seconds to keep them in sync
  useEffect(() => {
    const interval = setInterval(refreshTodos, 5000);
    return () => clearInterval(interval);
  }, [user?._id]);

  const {
    todos: filteredTodos,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  } = useTodos(todos);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    router.replace("/login");
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to TodoFlow
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Please sign in to access your dashboard and manage your tasks
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/login">
                <Button className="w-full">
                  Login
                </Button>
              </Link>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">Organize Tasks</p>
                </div>
                <div>
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">Track Progress</p>
                </div>
                <div>
                  <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-300">Boost Productivity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div>
                <Link href={"/"}>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">TodoFlow</h1>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome back, {user?.username}!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-1">
                <ModeToggle />
              </div>
              <Button variant="destructive" size="sm" className='cursor-pointer' onClick={handleLogout}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 text-blue-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.total}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.completed}
                    </div>
                  </div>
                  {stats.total > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {Math.round((stats.completed / stats.total) * 100)}% complete
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Remaining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-orange-600 mr-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.active}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Todo List */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      Your Tasks
                    </CardTitle>
                    <CardDescription>
                      Manage and organize your daily tasks
                    </CardDescription>
                  </div>
                  <NewTodoDialog onAction={refreshTodos} />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <SearchAndFilter
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filter={filter}
                  onFilterChange={setFilter}
                  stats={stats}
                />

                <div className="space-y-3">
                  {filteredTodos.length === 0 ? (
                    <div className="text-center py-12">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {searchQuery || filter !== 'all'
                          ? 'No todos found'
                          : 'No todos yet'
                        }
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {searchQuery || filter !== 'all'
                          ? 'Try adjusting your search or filters'
                          : 'Create your first todo to get started!'
                        }
                      </p>
                    </div>
                  ) : (
                    filteredTodos.map((todo) => (
                      <TodoItem
                        key={todo._id}
                        todo={todo}
                        onAction={refreshTodos}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}