import { assertStringIncludes } from "@std/assert";
import app from "./main.ts";

app.listen(8081);

Deno.test("Homepage renders successfully", async () => {
  const response = await fetch("http://localhost:8081/");
  const html = await response.text();
  assertStringIncludes(html, "Flownami");
});

Deno.test("Board shows three columns and edit ok cancel", async () => {
  const response = await fetch("http://localhost:8081/board");
  const html = await response.text();
  assertStringIncludes(html, "To Do");
  assertStringIncludes(html, "Doing");
  assertStringIncludes(html, "Done");
  assertStringIncludes(html, "Edit");
  assertStringIncludes(html, "OK");
  assertStringIncludes(html, "Cancel");
});

Deno.test("Header includes script.js", async () => {
  const response = await fetch("http://localhost:8081/board");
  const html = await response.text();
  assertStringIncludes(html, '<script src="/script.js" defer></script>');
});
