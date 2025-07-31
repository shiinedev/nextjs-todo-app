"use server"

import { Todo } from '../types/todos';
import TodoDashboardClient from './TodoDashboardClient';

export default async function TodoDashboard() {
    // We'll handle user authentication in the client component
    // For now, pass an empty array and let the client handle fetching
    const todos:Todo[] = [];

    return (
        <TodoDashboardClient todos={todos} />
    );
}