import { assertStringIncludes } from "@std/assert";
import app from "./main.ts";

app.listen(8081);

Deno.test("Homepage renders successfully", async () => {
  const response = await fetch("http://localhost:8081/");
  const html = await response.text();
  assertStringIncludes(html, "Flownami");
});

Deno.test("Board shows three columns and edit", async () => {
  const response = await fetch("http://localhost:8081/board");
  const html = await response.text();
  assertStringIncludes(html, "To Do");
  assertStringIncludes(html, "Doing");
  assertStringIncludes(html, "Done");
  assertStringIncludes(html, "Edit");
});

Deno.test("Header includes script.js", async () => {
  const response = await fetch("http://localhost:8081/board");
  const html = await response.text();
  assertStringIncludes(html, '<script src="/script.js" defer></script>');
});

Deno.test("Edit page includes task id and name", async () => {
  const data = await Deno.readTextFile("./data.json");
  const columns = JSON.parse(data);
  const testTask = columns[0].tasks[0];
  const response = await fetch(
    `http://localhost:8081/tasks/edit/${testTask.id}`,
  );
  const html = await response.text();
  assertStringIncludes(html, testTask.id);
  assertStringIncludes(html, testTask.name);
});
