"use server";

import { revalidatePath } from "next/cache";
import { fetchTodoById, updateTodo } from "../../lib/todos";
import { ActionResponse } from "@/app/types/todos";

export const updateTodoAction = async (
  previousState: ActionResponse,
  formdata: FormData
): Promise<ActionResponse> => {
  const id = formdata.get("id") as string;
  const title = formdata.get("title") as string;
  const priority = formdata.get("priority") as "low" | "medium" | "high";
  const description = formdata.get("description") as string;
  const userId = formdata.get("userId") as string;

  if (!title || title.trim().length === 0)
    return { error: "title is required", message: "" };
  if (!priority || priority.trim().length === 0)
    return { error: "priority is required", message: "" };
  if (!userId || userId.trim().length === 0)
    return { error: "user ID is required", message: "" };

  const todo = await fetchTodoById(id);

  if (!todo) return { error: "todo not found", message: "" };

  // Verify that the todo belongs to the user
  if (todo.userId !== userId) {
    return { error: "You can only update your own todos", message: "" };
  }

  const success = await updateTodo(id, {
    title,
    priority,
    description,
    updatedAt: new Date(),
  });

  if (!success) return { error: "field to update todo", message: "" };

  revalidatePath("/dashboard");
  return { message: "Todo updated successfully!", error: "" };
};
