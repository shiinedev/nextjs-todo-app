"use server";

import { revalidatePath } from "next/cache";
import { fetchTodoById, updateTodo } from "../../lib/todos";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/app/types/todos";

export const updateTodoAction = async (
  previousState: ActionResponse,
  formdata: FormData
): Promise<ActionResponse> => {
  const id = formdata.get("id") as string;
  const title = formdata.get("title") as string;
  const priority = formdata.get("priority") as "low" | "medium" | "high";

  if (!title || title.trim().length === 0)
    return { error: "title is required", message: "" };
  if (!priority || priority.trim().length === 0)
    return { error: "priority is required", message: "" };

  const todo = await fetchTodoById(id);

  if (!todo) return { error: "todo not found", message: "" };

  const success = await updateTodo(id, {
    title,
    priority,
    updatedAt: new Date(),
  });

  if (!success) return { error: "field to update todo", message: "" };

  revalidatePath("/todos");
  redirect("/todos");
};
