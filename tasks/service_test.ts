import { Task } from "../tasks/Task.ts";
import { TaskRepo } from "../data.ts";
import { addNewTask, findTaskById, removeTask, updateTask } from "./service.ts";
import { assertSpyCall, spy } from "@std/testing/mock";
import { assertEquals } from "jsr:@std/assert";

Deno.test("addNewTask", async () => {
  const fakeTask: Task = {
    id: "some-id",
    name: "Some Name",
    column: "To Do",
  };

  const fakeTasks: Task[] = [fakeTask];

  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy((fakeTask) => {});

  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;

  await addNewTask(taskRepo, "Some new task name");
  assertSpyCall(writeTasksSpy, 0);
});

Deno.test("findTaskById", async () => {
  const fakeTask: Task = {
    id: "some-id",
    name: "Some Name",
    column: "To Do",
  };

  const fakeTasks: Task[] = [fakeTask];

  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy((fakeTask) => {});

  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;

  const expectedTask: Task = { ...fakeTask };

  const task: Task | undefined = await findTaskById(
    taskRepo,
    "some-id",
  );
  assertEquals(task, expectedTask);
});

Deno.test("updateTask", async () => {
  const fakeTask: Task = {
    id: "some-id",
    name: "Some Name",
    column: "To Do",
  };

  const fakeTasks: Task[] = [fakeTask];

  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy((fakeTask) => {});

  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;

  let expectedTask: Task = { ...fakeTask };
  expectedTask.name = "Some Name 2";

  await updateTask(
    taskRepo,
    expectedTask,
  );
  assertSpyCall(writeTasksSpy, 0);
});

Deno.test("removeTask", async () => {
  const fakeTask: Task = {
    id: "some-id",
    name: "Some Name",
    column: "To Do",
  };

  const fakeTasks: Task[] = [fakeTask];

  const readTasksSpy = spy(() => fakeTasks);
  const writeTasksSpy = spy((fakeTask) => {});

  const taskRepo = {
    readTasks: readTasksSpy,
    writeTasks: writeTasksSpy,
  } as unknown as TaskRepo;

  await removeTask(
    taskRepo,
    "some-id",
  );
  assertSpyCall(writeTasksSpy, 0);
});
