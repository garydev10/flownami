import { assertStringIncludes } from "@std/assert";
import app from "./main.ts";

app.listen(8081);

Deno.test("Homepage renders successfully", async () => {
  const response = await fetch("http://localhost:8081/");
  const html = await response.text();
  assertStringIncludes(html, "Flownami");
});

Deno.test("Board shows three columns", async () => {
  const response = await fetch("http://localhost:8081/board");
  const html = await response.text();
  assertStringIncludes(html, "To Do");
  assertStringIncludes(html, "Doing");
  assertStringIncludes(html, "Done");
});
