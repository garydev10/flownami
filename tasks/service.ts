import { readTasks, TaskRepo, writeTasks } from "../data.ts";
import { Task } from "./Task.ts";

export async function addNewTask(taskRepo: TaskRepo, taskName: string) {
  const newTask = { id: crypto.randomUUID(), name: taskName, column: "To Do" };

  const tasks = await taskRepo.readTasks();

  tasks.push(newTask);

  await taskRepo.writeTasks(tasks);
}

export async function findTaskById(taskRepo: TaskRepo, id: string) {
  const tasks = await taskRepo.readTasks();
  const task = tasks.find((task: Task) => task.id === id);
  return task;
}

export async function updateTask(taskRepo: TaskRepo, updatedTask: Task) {
  const tasks = await taskRepo.readTasks();

  const currentTaskIndex = tasks.findIndex((t: Task) =>
    t.id === updatedTask.id
  );

  tasks[currentTaskIndex] = updatedTask;

  await taskRepo.writeTasks(tasks);
}

export async function removeTask(taskRepo: TaskRepo, id: string) {
  const tasks = await taskRepo.readTasks();

  const updatedTasks = tasks.filter((t: Task) => t.id != id);

  await taskRepo.writeTasks(updatedTasks);
}
