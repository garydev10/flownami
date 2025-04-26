// @ts-types="npm:@types/express"
import express from "npm:express";
import { randomUUID, UUID } from "node:crypto";
import { Task } from "./types/task.ts";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (_req, res) {
  res.render("pages/index");
});

type Column = {
  name: string;
  tasks: Array<Task>;
};

async function updateTask(id: UUID, name: string) {
  let columns = await readTasks();
  columns = columns.map((col: Column) => {
    return {
      ...col,
      tasks: col.tasks.map((t: Task) =>
        (t.id === id) ? { ...t, name: name } : t
      ),
    };
  });
  await writeTasks(columns);
}

app.get("/board", async function (_req, res) {
  const columns = await readTasks();
  res.render("pages/board", { columns });
});

app.get("/tasks/new", (_req, res) => {
  res.render("pages/create");
});

async function writeTasks(tasks: Task[]) {
  await Deno.writeTextFile("./data.json", JSON.stringify(tasks));
}

async function readTasks() {
  const data = await Deno.readTextFile("./data.json");
  return JSON.parse(data);
}

app.post("/tasks", async (req, res) => {
  const taskName = req.body.taskName;

  const newTask = { name: taskName, id: randomUUID() };

  const columns = await readTasks();

  columns[0].tasks.push(newTask);

  await writeTasks(columns);

  res.redirect("/board");
});

app.put("/tasks", async (req, res) => {
  const { id, name } = req.body;
  await updateTask(id, name);
  res.status(200).json({ message: "success" });
});

if (import.meta.main) {
  const port = Deno.env.get("PORT") || 8080;
  app.listen(port);
  console.log(`Server is listening on port ${port}`);
}

export default app;
